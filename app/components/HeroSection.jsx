"use client"
import React from 'react'
import Image from 'next/image'
import { TypeAnimation } from 'react-type-animation';
import { motion } from 'framer-motion';
import { useState, useEffect } from 'react';

const HeroSection = () => {
  const [randomValues, setRandomValues] = useState(null)
  const [isClient, setIsClient] = useState(false)

  // Generate random values only once on client-side
  useEffect(() => {
    setIsClient(true)

    // Generate random positions and sizes only once
    const particles = Array(15)
      .fill(0)
      .map(() => ({
        width: Math.random() * 10 + 5,
        height: Math.random() * 10 + 5,
        color: `rgba(${Math.floor(Math.random() * 100 + 155)}, ${Math.floor(Math.random() * 50 + 50)}, ${Math.floor(Math.random() * 150 + 105)}, ${Math.random() * 0.5 + 0.2})`,
        positions: [
          { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 },
          { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 },
          { x: Math.random() * 400 - 200, y: Math.random() * 400 - 200 },
        ],
        duration: Math.random() * 20 + 15,
      }))

    setRandomValues({ particles })
  }, [])

  // Don't render animations until client-side
  if (!isClient || !randomValues) {
    return (
      <div className="col-span-4 place-self-center mt-4 lg:mt-0 relative">
        <div className="rounded-full bg-gradient-to-t from-[#3c339a] via-[#8a00c4] to-[#3c339a] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] sm:h-[200px] sm:w-[200px] relative overflow-hidden z-10">
          <Image
            src="/images/hero-image.png"
            alt="hero image"
            className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
            width={500}
            height={500}
          />
        </div>
      </div>
    )
  }

  return (
    <section className='lg:py-14'>
    <div className='grid grid-cols-1 sm:grid-cols-12'>
    <motion.div 
     initial={{opacity: 0, scale: 0.5, y: 20 }}
     animate={{opacity: 1, scale: 1, y: 0 }} 
     transition={{duration: 0.6, ease: "easeOut"}}
     className='col-span-8 place-self-center text-center sm:text-left justify-self-start'>
      <motion.h1 
        className='text-[#a0a0a0] mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
      >
        <motion.div 
          className='text-transparent bg-clip-text bg-gradient-to-r from-[#3c339a] to-[#8a00c4]'
          animate={{ 
            backgroundPosition: ['0% 50%', '100% 50%', '0% 50%']
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          style={{ backgroundSize: "200% 200%" }}
        >
          <span>Hello, I'm</span> {""}
        </motion.div>
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
      </motion.h1>
      <motion.p 
        className='text-white sm:text-lg lg:text-2xl mb-6 text-base italic'
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
      >
        Hello! Welcome to my self-made portfolio website! Feel free to take a look around and contact me if you are interested.
      </motion.p>
      {/* <div>
        <button className='px-6 py-3 w-full rounded-full mr-4 bg-white hover:bg-slate-200 text-white font-bold sm:w-fit bg-gradient-to-br from-red-950 via-red-700 to-red-500 '>Hire me</button>

        <button className='px-1 py-1 w-full rounded-full bg-gradient-to-br from-red-950 via-red-700 to-red-500 bg-transparent hover:bg-slate-800  mt-3 sm:w-fit'>
          <span className='block bg-[#121212] hover:bg-slate-800 rounded-full px-5 py-2'>Download CV</span></button>
      </div> */}
   </motion.div>
   <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="col-span-4 place-self-center mt-4 lg:mt-0 relative"
    >
      {/* Morphing blob background */}
      <motion.div
        className="absolute inset-0 z-0 flex items-center justify-center"
        style={{
          width: "calc(100% + 80px)",
          height: "calc(100% + 80px)",
          left: "-40px",
          top: "-40px",
        }}
      >
        <svg viewBox="0 0 500 500" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
          <motion.path
            fill="url(#gradient)"
            initial={{
              d: "M416.5,207.5Q406,165,385,130.5Q364,96,325,77.5Q286,59,245,59.5Q204,60,163,77.5Q122,95,95.5,134Q69,173,60,221.5Q51,270,77,312Q103,354,142.5,382Q182,410,229,416.5Q276,423,318.5,404Q361,385,399,347.5Q437,310,427,258.5Q417,207,416.5,207.5Z",
            }}
            animate={{
              d: [
                "M416.5,207.5Q406,165,385,130.5Q364,96,325,77.5Q286,59,245,59.5Q204,60,163,77.5Q122,95,95.5,134Q69,173,60,221.5Q51,270,77,312Q103,354,142.5,382Q182,410,229,416.5Q276,423,318.5,404Q361,385,399,347.5Q437,310,427,258.5Q417,207,416.5,207.5Z",
                "M409,211Q412,172,390.5,140Q369,108,334,83.5Q299,59,250,59.5Q201,60,158.5,84Q116,108,89,147.5Q62,187,55.5,230.5Q49,274,77,312Q105,350,143.5,377Q182,404,232.5,410.5Q283,417,324,396Q365,375,386,337.5Q407,300,409,211Z",
                "M423.5,211.5Q412,173,390,142Q368,111,332.5,87Q297,63,250,62.5Q203,62,162,87Q121,112,93,150Q65,188,57,231Q49,274,77,312Q105,350,143.5,377Q182,404,232.5,410.5Q283,417,324,396Q365,375,394.5,343Q424,311,423.5,211.5Z",
                "M416.5,207.5Q406,165,385,130.5Q364,96,325,77.5Q286,59,245,59.5Q204,60,163,77.5Q122,95,95.5,134Q69,173,60,221.5Q51,270,77,312Q103,354,142.5,382Q182,410,229,416.5Q276,423,318.5,404Q361,385,399,347.5Q437,310,427,258.5Q417,207,416.5,207.5Z",
              ],
            }}
            transition={{
              duration: 20,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "mirror",
              ease: "easeInOut",
            }}
          />
          <defs>
            <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#3c339a">
                <motion.animate
                  attributeName="stop-color"
                  values="#3c339a; #8a00c4; #3c339a"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
              <stop offset="100%" stopColor="#8a00c4">
                <motion.animate
                  attributeName="stop-color"
                  values="#8a00c4; #3c339a; #8a00c4"
                  dur="8s"
                  repeatCount="indefinite"
                />
              </stop>
            </linearGradient>
          </defs>
        </svg>
      </motion.div>

      {/* Floating particles - using pre-generated random values */}
      <div className="absolute inset-0 overflow-hidden">
        {randomValues.particles.map((particle, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full"
            style={{
              width: particle.width + "px",
              height: particle.height + "px",
              background: particle.color,
              filter: "blur(1px)",
              x: particle.positions[0].x,
              y: particle.positions[0].y,
            }}
            animate={{
              x: [particle.positions[0].x, particle.positions[1].x, particle.positions[2].x],
              y: [particle.positions[0].y, particle.positions[1].y, particle.positions[2].y],
              opacity: [0.2, 0.8, 0.2],
              scale: [1, 1.2, 1],
            }}
            transition={{
              duration: particle.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Improved Glowing effect */}
      <motion.div
        className="absolute inset-0 rounded-full bg-purple-500/10 blur-2xl z-0"
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 5,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut",
        }}
      />

      {/* Main image container with subtle hover effect */}
      <motion.div 
        className="rounded-full bg-gradient-to-t from-[#3c339a] via-[#8a00c4] to-[#3c339a] w-[250px] h-[250px] lg:w-[400px] lg:h-[400px] sm:h-[200px] sm:w-[200px] relative overflow-hidden z-10"
        whileHover={{ 
          boxShadow: "0 0 25px rgba(138, 0, 196, 0.6)",
          transition: { duration: 0.3 }
        }}
      >
        <motion.div
          className="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent"
          animate={{
            opacity: [0, 0.5, 0],
          }}
          transition={{
            duration: 3,
            repeat: Number.POSITIVE_INFINITY,
            ease: "easeInOut",
          }}
        />
        <Image
          src="/images/hero-image.png"
          alt="hero image"
          className="absolute transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          width={500}
          height={500}
        />
      </motion.div>

      {/* Animated dashed border with pulse effect */}
      <motion.div
        className="absolute inset-0 rounded-full border-2 border-dashed border-purple-400/50 z-5"
        style={{
          width: "calc(100% + 20px)",
          height: "calc(100% + 20px)",
          left: "-10px",
          top: "-10px",
        }}
        animate={{ 
          rotate: 360,
          scale: [1, 1.03, 1],
          borderColor: ["rgba(168, 85, 247, 0.3)", "rgba(168, 85, 247, 0.6)", "rgba(168, 85, 247, 0.3)"]
        }}
        transition={{ 
          rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
          scale: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
          borderColor: { duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }
        }}
      />
      
      {/* Add a new pulsing ring effect */}
      <motion.div
        className="absolute rounded-full border border-purple-300/30 z-5"
        style={{
          width: "calc(100% + 40px)",
          height: "calc(100% + 40px)",
          left: "-20px",
          top: "-20px",
        }}
        animate={{ 
          scale: [1, 1.1, 1],
          opacity: [0.1, 0.3, 0.1],
        }}
        transition={{ 
          duration: 4,
          repeat: Number.POSITIVE_INFINITY,
          ease: "easeInOut", 
          repeatType: "mirror"
        }}
      />
    </motion.div>
</div>
    </section>
  )
}

export default HeroSection
