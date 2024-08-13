'use client';

import { Menu } from 'lucide-react';
import React from 'react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import Image from 'next/image';
import { Button } from './ui/button';
import { SessionProvider, signOut, useSession } from 'next-auth/react';
import { auth } from '@/auth';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import Link from 'next/link';

const Navbar = () => {
  useGSAP(() => {
    const tl = gsap.timeline();
    tl.from(".logo h2", {
      y: 40,
      opacity: 0,
      duration: 1,
    });
    tl.from(".links h2", {
      x: -50,
      opacity: 0,
      duration: 0.4,
      stagger: 0.3,
    });
    tl.from(".account", {
      y: -50,
      opacity: 0,
      duration: 0.4,
      stagger: 0.3,
    });
  }, []);
  
  const session = useSession();
  const user = session.data?.user;
  console.log(user);

  const handleSignOut = async () => {
    try {
      await signOut({
        callbackUrl: "/signin",
      });
    } catch (error) {
      console.error('Failed to sign out:', error);
    }
  };

  return (
    <div className='w-full h-20 flex flex-col md:flex-row justify-between items-center px-4 md:px-10 bg-white shadow-md'>
      <div className="logo">
        <h2 className='text-[#ff385c] font-extrabold text-2xl'>nexio</h2>
      </div>
      <div className="links flex flex-col md:flex-row items-center md:space-x-4 space-y-2 md:space-y-0">
        <Link href={"/dashboard"}>
          <h2 className='text-sm capitalize cursor-pointer'>dashboard</h2>
        </Link>
        <Link href={"/feedback"}>
          <h2 className='text-sm capitalize cursor-pointer'>add feedback</h2>
        </Link>
      </div>
      <div className="account flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="sm"
              className="bg-transparent border-none h-10 w-10 hover:bg-transparent active:bg-transparent focus:ring-0"
            >
              <Menu color="#ff385c" className='cursor-pointer h-full w-full' />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="bg-white border border-gray-200">
            <DropdownMenuLabel>{user?.email}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="hover:bg-transparent focus:bg-transparent">
              <button onClick={handleSignOut} className='w-full text-left'>Logout</button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="image rounded-full bg-[#ff385c] h-8 w-8 md:h-10 md:w-10"></div>
      </div>
    </div>
  );
};

export default Navbar;
