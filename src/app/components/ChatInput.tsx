'use client'

import { cn } from '@/lib/utils'
import { FC, HTMLAttributes } from 'react'
import TextareaAutosize  from 'react-textarea-autosize'

// the interface is being extended since the chatInput will have custom classNames, 
// the chatInput here is being turned into a normal div, while it being a FC
//the HTML attributes is provided as a type of element

interface ChatInput extends HTMLAttributes<HTMLDivElement> {

}

const ChatInput: FC<ChatInput> = ({className, ...props}) => {
  return (
    // cn is used to merge classNames, 
    <div {...props} className={cn('border-t border-zinc-300', className)}>
        <div className="relative mt-4 flex-1 overflow-hidden rounded-lg border-none outline-none">
            <TextareaAutosize 
            rows={2}
            maxRows={4}
            autoFocus
            placeholder='Ask me something...'
            className="peer disabled:opacity-50 pr-14 resize-none block w-full border-0 bg-zinc-100 py-1.5 text-gray-900 focus:ring-0 text-sm sm:leading-6"
            />
        </div>
    </div>
  )
}

export default ChatInput