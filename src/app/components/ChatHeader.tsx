import { FC } from 'react'

interface ChatHeaderProps{

}

const ChatHeader: FC<ChatHeaderProps> = ({}) => {
  return (
    <div className="w-full flex gap-3 justify-start items-center text-zinc-800">
        <div className="flex flex-col items-start text-sm">
        <p className="text-sm"> Chat with</p>
        <div className="flex gap-1.5 items-center rounded-md">
            <p className="w-2 h-2 rounded-full bg-green-500"/>
            <p className="font-medium text-lg"> Stream AI </p>
        </div>
        </div>
    </div>
  )
}

export default ChatHeader