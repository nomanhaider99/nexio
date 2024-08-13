'use client'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import SignInNavbar from '@/components/signinnavbar'
import { signIn } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

const SignInForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<any>("");
  const [dialogue, setDialogue] = useState<any>("");
  const router = useRouter();
  const handelSubmit = async (e: any) => {
    e.preventDefault();
    const res = await signIn("credentials", { email, password, redirect: false})
    if (res?.error) {
      setError("Invalid credentials")
    } else {
      setDialogue("Authenticated")
      router.push("/dashboard")
    }
  }
  return (
    <main className='min-h-screen w-full bg-white flex flex-col items-center'>
        <SignInNavbar />
        <div className='w-[30vw] py-4 bg-white shadow-sm shadow-[#ff385c] rounded-lg flex flex-col px-4 mt-16'>
        <h2 className='text-center text-black font-extrabold text-4xl'>Sign in</h2>
        <form action="" className='pt-8' onSubmit={handelSubmit}>
            <div className="email py-1">
                <label htmlFor="email" className='font-semibold text-sm'>Email</label>
                <br />
                <input value={email} name='email' onChange={(e)=>setEmail(e.target.value)} type="text" placeholder='example@email.com' className='w-full text-sm bg-transparent border-[0.2px] py-1 px-4 rounded-lg border-zinc-400 outline-none' />
            </div>
            <div className="password py-1">
                <label htmlFor="password" className='font-semibold text-sm'>Password</label>
                <br />
                <input value={password} name='password' onChange={(e)=>setPassword(e.target.value)} type="password"  placeholder='.......' className='w-full text-sm bg-transparent border-[0.2px] py-1 px-4 rounded-lg border-zinc-400 outline-none' />
            </div>
            {error && (<div className="bg-red-600 text-white text-xs py-1 px-4 w-full">{error}</div>)}
            {dialogue && (<div className="dialogue mt-4 bg-green-300 px-4 text-white text-xs w-full">{dialogue}</div>)}
            <button className='w-full py-1 bg-[#ff385c] hover:bg-black text-white font-bold rounded-lg mt-6'>sign in</button>
        </form>
        <Link href={"/"}><p className='text-sm text-center hover:underline mt-4'>Don't have an account Sign up </p></Link>
        </div>
        <div className='pt-9'>
        <Footer />
        </div>
    </main>
  )
}

export default SignInForm