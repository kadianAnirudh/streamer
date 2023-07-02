import {z} from 'zod'

// this is the exact schema for the message that the user will be sending on hitting enter with their query
export const MessageSchema = z.object({
    id: z.string(),
    isUserMessage: z.boolean(),
    text: z.string()
})

// array validator
// these will be a collection of the previous messages sent

export const messageArraySchema = z.array(MessageSchema)

export type Message = z.infer<typeof MessageSchema>