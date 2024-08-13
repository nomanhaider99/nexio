'use client'
import React, { useEffect, useState } from 'react'

const Feedback = () => {  
  const [feedbacks, setFeedbacks] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
      const fetchFeedbacks = async () => {
          try {
              const response = await fetch('http://localhost:3000/api/showfeedback', {
                method: "GET"
              });
              if (!response.ok) {
                  throw new Error(`HTTP error! Status: ${response.status}`);
              }
              const data = await response.json();
              setFeedbacks(data.feedbacks);
          } catch (error) {
              console.error("Error fetching feedbacks:", error);
              setError("Failed to fetch feedbacks. Please try again later.");
          }
      };

      fetchFeedbacks();
  }, []);
    return (
    <div className='p-10 w-full flex flex-wrap justify-center'>
        {
          feedbacks.map((item: any, index: any) => {
            return (
              <div
              key={index} // Ensure each item has a unique key for better performance
              className='px-6 py-4 mx-4 my-4 max-w-md bg-white rounded-lg text-black shadow-sm shadow-[#ff385c]'
          > 
          <p className='leading-relaxed text-gray-600 text-sm'>{item.message}</p>
          <h2 className='text-right font-semibold text-gray-800 py-2'>{item.username}</h2>
          </div>
            )
          })
        }
    </div>
  )
}

export default Feedback