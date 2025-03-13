"use client"
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';



const HeroSection = () => {
  return (
    <section className='lg:py-14'>
    <div className='grid grid-cols-1 sm:grid-cols-12'>
    <motion.div 
     initial={{opacity: 0, scale: 0.5 }}
     animate={{opacity: 1, scale: 1}} 
     transition={{duration: 0.4}}
     className='col-span-8 place-self-center text-center sm:text-left justify-self-start'>
      <h1 className='text-[#a0a0a0] mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold'><div className='text-transparent bg-clip-text bg-gradient-to-r from-[#3c339a] to-[#8a00c4]'>
        <span>Hello, I'm</span> {""}</div>
      <TypeAnimation
      sequence={[
        'Dimos',
        1000, 
        'a Developer',
        1000,
        'a Student',
        1000,
        'a Designer',
        1000
      ]}
      wrapper="span"
      speed={50}
      repeat={Infinity}
    />
         </h1>
      <p className='text-white" sm:text-lg lg:text-2xl mb-6 text-base italic' >Hello! Welcome to my self-made portfolio website! Feel free to take a look around and contact me if you are interested.</p>
      {/* <div>
        <button className='px-6 py-3 w-full rounded-full mr-4 bg-white hover:bg-slate-200 text-white font-bold sm:w-fit bg-gradient-to-br from-red-950 via-red-700 to-red-500 '>Hire me</button>

        <button className='px-1 py-1 w-full rounded-full bg-gradient-to-br from-red-950 via-red-700 to-red-500 bg-transparent hover:bg-slate-800  mt-3 sm:w-fit'>
          <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Download CV</span></button>
      </div> */}
   </motion.div>
   <motion.div
   initial={{opacity: 0, scale: 0.5 }}
   animate={{opacity: 1, scale: 1}} 
   transition={{duration: 0.4}}
   className='col-span-4 place-self-center mt-4 lg:mt-0 '>
    <div className='rounded-full bg-gradient-to-t from-[#3c339a] via-[#8a00c4] to-[#3c339a] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] sm:h-[200] sm:w-[200] relative overflow-hidden'>
     <Image
    src="/images/hero-image.png"
    alt="hero image"
    className='absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 '
    width={500}
    height={500}
    />
    </div>
   </motion.div>
</div>
    </section>
  )
}

export default HeroSection
