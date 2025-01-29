'use client'

import Link from 'next/link'
import {Card, CardHeader, CardBody, CardFooter} from "@heroui/card";
import {Button, ButtonGroup} from "@heroui/button";
import {Input, Textarea} from "@heroui/input";

const Home = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 to-white flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-lg">
        <CardHeader>
          <h1 className="text-4xl font-bold text-center text-blue-600">
            SUPERP AI<br />
            <span className="text-xl text-center">Super Sales Chatbot</span>
          </h1>
        </CardHeader>
        <CardBody className="text-center">
          <p className="mb-4">
            Welcome to SUPERP AI, your AI-powered sales assistant. I'm here to help you boost your sales and streamline your customer interactions.
          </p>
        </CardBody>
        <CardFooter className="flex justify-center">
          <Link href="/chatbot">
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white">
              Start Chatting
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  )
}

export default Home