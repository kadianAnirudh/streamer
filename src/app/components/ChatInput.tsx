'use client'

import { cn } from '@/lib/utils'
import { useMutation } from '@tanstack/react-query'
import { FC, HTMLAttributes, useState } from 'react'
import TextareaAutosize  from 'react-textarea-autosize'
import { nanoid } from 'nanoid'
import { Message } from '@/lib/validators/message'

// the interface is being extended since the chatInput will have custom classNames, 
// the chatInput here is being turned into a normal div, while it being a FC
//the HTML attributes is provided as a type of element

interface ChatInput extends HTMLAttributes<HTMLDivElement> {}

const ChatInput: FC<ChatInput> = ({className, ...props}) => {

    const [input, setinput] = useState<string>('')

    // The useMutation hook is the way to play around with APIs, it runs an async function
    const {mutate: sendMessage, isLoading} = useMutation({
        mutationFn: async(message: Message) => {
        const response = await fetch('/api/message', 
        {method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({messages: [message]})
      })
        
        return response.body
        
      },

      onSuccess: () => {
        console.log('success, code is working')
      }
    })

  return (
    // cn is used to merge classNames, 
    <div {...props} className={cn('border-t border-zinc-300', className)}>
        <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
            <TextareaAutosize 
            rows={2}
            maxRows={4}
            // you can check if the key has been pressed and if it is an enter key 
            // also, should not work on enter + shift as the user is going to next line
            onKeyDown={(e)=>{
              if(e.key === 'Enter' && !e.shiftKey){
                e.preventDefault()

                // message that will be sent, should have 3 values
                const message: Message = {
                  id: nanoid(),
                  isUserMessage: true,
                  text: input
                }

                sendMessage(message)
              }
            }}
            autoFocus
            value={input}
            onChange={(e)=>setinput(e.target.value)}
            placeholder='Ask me something...'
            className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
            />
        </div>
    </div>
  )
}

export default ChatInput