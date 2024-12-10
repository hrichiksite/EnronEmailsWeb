"use client"

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import PostalMime, { Email } from 'postal-mime';


export default function Home() {
  const [currentEmail, setCurrentEmail] = useState<Email | undefined>(undefined)
  const [isLoading, setIsLoading] = useState(false)

  const loadRandomEmail = async () => {
    setIsLoading(true)
      const randomEmail = await fetch(process.env.NEXT_PUBLIC_API_HOST+'/random')
      const emailText = await randomEmail.json()
      //parse the email
      const parsedEmail = await PostalMime.parse(emailText.email)
      console.log(parsedEmail)
      setCurrentEmail(parsedEmail)
      setIsLoading(false)
  }

  useEffect(() => {
    loadRandomEmail()
  }, [])

  return (
    <div className="min-h-screen bg-[#FFFFCC] p-4">
      <div className="max-w-3xl mx-auto bg-white border-4 border-[#000080] rounded p-4 shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <Image src="/image.png?height=50&width=50" alt="Enron Logo" width={50} height={50} className="animate-spin" />
          <h1 className="text-4xl font-bold text-[#FF00FF] mb-4 text-center blink">Enron Email Viewer</h1>
          <div className="w-[50px]"></div>
        </div>
        <div className="text-[#FF0000] mb-4 marquee">Welcome to the Enron Email Viewer! Read from over 500,000 emails that were shared by the FERC. Click the button below to load a random email.</div>
        <div className="bg-[#E6E6FA] border-2 border-dashed border-[#000080] p-4 mb-4">
          {currentEmail && (
            <>
              <p><strong>From:</strong> {currentEmail.from.address || undefined}</p>
              <p className=''><strong>To:</strong> {currentEmail.to?.map((a )=> {return a.address}) || undefined}</p>
              <p className="whitespace-pre-wrap"><strong>Subject:</strong> {currentEmail.subject || undefined}</p>
              <hr className="my-2 border-[#000080]" />
              <p className="whitespace-pre-wrap">{currentEmail.text || undefined}</p>
            </>
          )}
        </div>
        <div className="text-center">
          <Button 
            onClick={loadRandomEmail}
            className="bg-[#00BFFF] hover:bg-[#1E90FF] text-white font-bold py-2 px-4 rounded animate-pulse"
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load Another Email'}
          </Button>
        </div>
        <div className="mt-4 text-center">
          <p className="text-[#008000]">You are visitor number:</p>
          <span className="inline-block bg-[#000000] text-[#00FF00] px-2 py-1 font-mono text-lg">
            {Math.floor(Math.random() * 1000000).toString().padStart(6, '0')}
          </span>
        </div>
      </div>
    </div>
  )
}

