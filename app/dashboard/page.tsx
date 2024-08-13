'use client'
import { auth } from '@/auth'
import Navbar from '@/components/navbar'
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';
import { useRouter } from 'next/navigation';
import React from 'react'
import {useGSAP} from "@gsap/react"
import gsap from 'gsap';
import Footer from '@/components/footer';
import Feedback from '@/components/feedback';

const Dashboard = () => {
  
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (!session) {
    const router = useRouter();
    router.push('/signin');   

    return null;
  }
  return (
    <div className='min-h-screen w-full bg-white flex flex-col items-center'>
        <Navbar />
        <Feedback />
        <div className='pt-48'>
        <Footer />
        </div>
    </div>
  )
}

export default Dashboard