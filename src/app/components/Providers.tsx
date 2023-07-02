'use client'
// react query can only be used in client components and thus wrapping the layout with it,
// would defeat the whole purpose of server side rendering

import { QueryClientProvider, QueryClient } from '@tanstack/react-query'
import { FC, ReactNode } from 'react'

interface providerProps{
children: ReactNode
}

const Providers: FC<providerProps> = ({children}) => {

    const queryClient = new QueryClient()

  return (
    <QueryClientProvider client={queryClient}>
        {children}
    </QueryClientProvider>
  )
}

export default Providers