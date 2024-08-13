'use client'
import { useSession } from 'next-auth/react';
import React, { useState } from 'react'

const FeedbackForm = () => {
  const session = useSession();
  const email = session.data?.user?.email
    const [dialogue, setDialogue] = useState<any>("");
    const [message, setMessage] = useState("");
    const handleSubmit = async (e: any) => {
      e.preventDefault();
      const res = await fetch('http://localhost:3000/api/feedback', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message, email
        })
      })
      if (res.ok) {
        const form = e.target;
        form.reset();
        setDialogue("Your feedback has been submitted.")
      }
    }
  return (
    <div className='w-[40vw] p-5 border-[0.2px] border-zinc-300 rounded-lg '>
        <h2 className='text-black font-bold text-sm'>Anything that can be improved?</h2>
        <form onSubmit={handleSubmit} className='py-2'>
            <input type="text" value={message} name='message' onChange={(e)=>setMessage(e.target.value)} placeholder='add feedback' className='w-full text-xs text-black font-light border-2 border-zinc-700 h-20 pt-4 px-4 pb-20' />
            {dialogue && (<div className="dialogue absolute mt-4 bg-green-300 px-4 text-white text-xs">{dialogue}</div>)}
            <button className='bg-zinc-700 text-white px-6 py-1 mt-2 ml-[29vw]'>submit</button>
        </form>
    </div>
  )
}

export default FeedbackForm