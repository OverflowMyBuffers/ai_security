'use client'

import { SetStateAction, useEffect, useState } from 'react'
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Button, ButtonGroup} from "@heroui/button";
import {Input, Textarea} from "@heroui/input";
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { ScrollArea } from "@/components/ui/scroll-area"

type Message = {
    id: number;
    role: 'System' | 'User';
    content: string;
}

export const ChatApp = () => {
    const [input, setInput] = useState<string>('')
    const [messages, setMessages] = useState<Message[]>([])
//   const { messages, input, handleInputChange, handleSubmit } = useChat()
    const [isTyping, setIsTyping] = useState(false)

    useEffect(() => {
        console.log('Updating messages => ', messages)
    }, [messages])
    

    const sendRequest = (req: string) => {
        const raw = JSON.stringify({
            "message": req
        });
        
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: raw
        };
        
        fetch("http://127.0.0.1:5005/chat", requestOptions)
        .then(async(response) => {
            let res = await response.json()
            let newMessage: Message = {
                id: (messages.length + 1),
                role: 'System',
                content: res.message

            }
            setMessages(oldArray => [...oldArray, newMessage])
            setIsTyping(false)
        })
        .then((result) => {
            console.log(result)
        })
        .catch((error) => {
            console.error(error)
            return error
        });
    }

    const handleChatMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        let newMessage: Message = {
            id: messages.length,
            role: 'User',
            content: input.toString()
        }
        setMessages(oldArray => [...oldArray, newMessage])
        sendRequest(input)
        setInput('')
        setIsTyping(true)
    }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <Card className="w-full h-full">
        <CardHeader>
          <h1>Chat with the AI overlords</h1>
        </CardHeader>
        <CardBody>
          <div className="h-[60vh] pr-4">
            {messages.map(m => (
              <div key={m.id} className={`mb-4 ${m.role === 'User' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${m.role === 'User' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-black'}`}>
                  {m.content}
                </span>
              </div>
            ))}
            {isTyping && (
              <div className="text-left">
                <span className="inline-block p-2 rounded-lg bg-gray-200 text-black">
                  AI is typing...
                </span>
              </div>
            )}
          </div>
        </CardBody>
        <CardFooter>
          <form onSubmit={handleChatMessage} className="flex w-full space-x-2">
            <Input
              value={input}
              onChange={(e: { target: { value: SetStateAction<string> } }) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-grow"
            />
            <Button type="submit" disabled={isTyping}>Send</Button>
          </form>
        </CardFooter>
      </Card>
    </div>
  )
}

export default ChatApp

