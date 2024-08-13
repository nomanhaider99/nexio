'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'

const SignUpForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [dialogue, setDialogue] = useState("");
    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();
    const handleAction = async (e: any) => {
        e.preventDefault();
        setIsLoading(true);
        if (!username || !email || !password) {
            setError("All field are required")
        }
        const res = await fetch('http://localhost:3000/api/signup', {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ username, email, password })
        });
        setIsLoading(false);
        if (res.ok) {
            router.push("/signin");
        } else {
            setError("Sign up failed");
        }
    }
    
  return (
    <div className='w-[30vw] py-4 bg-white shadow-sm shadow-[#ff385c] rounded-lg flex flex-col px-4 mt-10'>
        <h2 className='text-center text-black font-extrabold text-4xl'>Sign up</h2>
        <form onSubmit={handleAction} className='pt-8'>
            <div className="username py-1">
                <label htmlFor="username"  className='font-semibold text-sm'>Username</label>
                <br /> 
                <input name='username' value={username} onChange={(e)=>setUsername(e.target.value)} type="text" placeholder='example' className='w-full text-sm bg-transparent border-[0.2px] py-1 px-4 rounded-lg border-zinc-400 outline-none' />
            </div>
            <div className="email py-1">
                <label htmlFor="email" className='font-semibold text-sm'>Email</label>
                <br />
                <input name='email' value={email} onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='example@email.com' className='w-full text-sm bg-transparent border-[0.2px] py-1 px-4 rounded-lg border-zinc-400 outline-none' />
            </div>
            <div className="password py-1">
                <label htmlFor="password" className='font-semibold text-sm'>Password</label>
                <br />
                <input name='password' value={password} onChange={(e)=>setPassword(e.target.value)} type="password" placeholder='.......' className='w-full text-sm bg-transparent border-[0.2px] py-1 px-4 rounded-lg border-zinc-400 outline-none' />
            </div>
            {error && (<div className="bg-red-600 text-white text-xs py-1 px-4 w-full">{error}</div>)}
            {dialogue && (<div className="dialogue mt-4 bg-green-300 px-4 text-white text-xs w-full">{dialogue}</div>)}
            <button className='w-full py-1 bg-[#ff385c] hover:bg-black text-white font-bold rounded-lg mt-6'>sign up</button>
        </form>
        <Link href={"/signin"}><p className='text-sm text-center hover:underline mt-4'>Already have an account Sign in </p></Link>
    </div>
  )
}

export default SignUpForm