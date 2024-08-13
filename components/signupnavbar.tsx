import Link from 'next/link'
import React from 'react'

const SignUpNavbar = () => {
  return (
    <div className='w-full h-20 flex justify-between items-center px-10'>
        <div className="logo">
            <h2 className='text-[#ff385c] font-extrabold text-2xl'>nexio</h2>
        </div>
        <div className="buttons">
            <Link href={"/signin"}>
              <button className='bg-[#ff385c] text-white px-4 py-1 rounded-lg font-semibold'>sign in</button>
            </Link>
        </div>
    </div>
  )
}

export default SignUpNavbar