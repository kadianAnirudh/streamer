// open AI's own type convention
export type ChatGPTAgent = "user" | "system"

// OPEN ai specifies that the request should be in the given format
export interface ChatGPTMessage {
    role: ChatGPTAgent
    content: string
}