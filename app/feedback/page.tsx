import FeedbackForm from '@/components/feedbackform'
import Footer from '@/components/footer'
import Navbar from '@/components/navbar'
import React from 'react'

const Feedback = () => {
  return (
    <div className='w-full bg-white min-h-screen flex flex-col items-center justify-between pb-2'>
      <Navbar />
      <FeedbackForm />
      <Footer />
    </div>
  )
}

export default Feedback