import { ChatGPTMessage } from "@/lib/openAI-stream"
import { messageArraySchema } from "@/lib/validators/message"

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
    content: chatBotPrompt
})
}