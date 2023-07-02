import { ParsedEvent , ReconnectInterval, createParser} from "eventsource-parser"

// open AI's own type convention
export type ChatGPTAgent = "user" | "system"

// OPEN ai specifies that the request should be in the given format
export interface ChatGPTMessage {
    role: ChatGPTAgent
    content: string
}

// This is directly copied from route.ts
export interface OpenAIStreamPayload {
    // have to send the payload object with the GPT model defined
    model: string,
    // array of messages
    message: ChatGPTMessage[],
    // pass intensity of answer
    temperature: number, 
    top_p: number,
    frequency_penalty: number,
    presence_penalty: number,
    // number of words burnt
    max_tokens: number,
    // whether answer in real time or wait and generate
    stream: boolean,
    n: number
}


// This OPEN ai STREAM function will be used in the route.ts
export async function OpenAIStream(payload: OpenAIStreamPayload){
    // the encoder takes a stream input and outputs
const encoder = new TextEncoder();
const decoder = new TextDecoder();

let counter = 0

// a fetch request to open ai will be made
const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',

    headers: { 
    'Content-Type': 'application/JSON',
    Authorization: `Bearer ${process.env.OPENAI_API_KEY}`
    },

    body:JSON.stringify(payload)
})

// Already present function to read streams
const stream = new ReadableStream({
    async start(controller){
        // both the below given properties are due to eventparser library
        function onParse(event: ParsedEvent | ReconnectInterval){

        if(event.type === 'event'){
            const data = event.data
            // happens in open ai api 
            if(data === '[DONE]'){
                controller.close()
                return;
            }

            // in case of a succesful request, data is parsed or error is caught
            try {
                const json = JSON.parse(data)
                console.log('json: ', json)
                const text = json.choices[0].delta?.content || ''
                console.log('text: ', text)
                if(counter < 2 && (text.match(/\n/) || []).length){
                     return
                }

            const queue = encoder.encode(text)
            controller.enqueue(queue)

            counter++

            } catch (error) {
                controller.error(error)
            }
        }

        }

        const parser = createParser(onParse)

        for await ( const chunk of res.body as any){
            parser.feed(decoder.decode(chunk))
        }
    }
})

return stream
}