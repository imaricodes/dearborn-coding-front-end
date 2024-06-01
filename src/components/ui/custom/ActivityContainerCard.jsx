import React from 'react'
import { Card } from '@/components/ui/card'

const ActivityContainerCard = ({children}) => {
  return (
    <Card className="w-full h-[400px] flex items-center justify-center relative">


       {children}


        </Card>
  )
}

export default ActivityContainerCard