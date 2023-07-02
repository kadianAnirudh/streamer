import { chatbotPrompt } from "@/app/helpers/constants/chatbot-prompts"
import { ChatGPTMessage, OpenAIStreamPayload } from "@/lib/openAI-stream"
import { messageArraySchema } from "@/lib/validators/message"
import {OpenAIStream} from '../../../lib/openAI-stream'

export async function POST(req: Request){
    // we make a json  request because in chatINPUt it has already been defined, that the POST request's header and body would be JSON
const {messages} = await req.json()

// the zod validator will parse the client message to see if it matches our schema
const parsedMessages = messageArraySchema.parse(messages)

// these are the messages that will be sent to openAI 
const outboundMessages: ChatGPTMessage[] = parsedMessages.map((message) =>({
// checks against the type of message sent by user
// the code knows about the user message because of the {message} which is equal to req.json, the type for the request being pre-defined
role: message.isUserMessage ? "user" : "system",
content: message.text
}))

// The unshift method adds things to the start of an array
outboundMessages.unshift({
    role: 'system',
    content: chatbotPrompt
})

// the payload requirement is mentioned in the open AI documentation for making requests
const payload: OpenAIStreamPayload = {
    // have to send the payload object with the GPT model defined
    model: 'gpt-3.5-turbo',
    // array of messages
    message: outboundMessages,
    // pass intensity of answer
    temperature: 0.4, 
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    // number of words burnt
    max_tokens: 150,
    // whether answer in real time or wait and generate
    stream: true,
    n: 1
}

// the function to ensure real time answer generation
const stream = await OpenAIStream(payload)

return new Response(stream)
}
