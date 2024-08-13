'use client'
import Footer from "@/components/footer";
import SignInNavbar from "@/components/signinnavbar";
import SignUpForm from "@/components/signupform";
import SignUpNavbar from "@/components/signupnavbar";
import Image from "next/image";

export default function Home() {
  return (
    <main className="min-h-screen w-full bg-white flex flex-col items-center">
      <SignUpNavbar />
      <SignUpForm />
      <Footer />
    </main>
  );
}
