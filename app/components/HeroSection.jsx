"use client"
import React, { useState, useEffect } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion';

const HeroSection = () => {
  const [randomValues, setRandomValues] = useState(null)
  const [imageLoaded, setImageLoaded] = useState(false)

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      repeatType: "reverse",
    },
  }

  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  }

  const wordVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  }

  const imageContainerVariants = {
    hidden: { opacity: 0, scale: 0.8, rotate: -5 },
    visible: {
      opacity: 1,
      scale: 1,
      rotate: 0,
      transition: {
        duration: 0.7,
        ease: "easeOut",
        delay: 0.4
      }
    },
    hover: {
      scale: 1.03,
      boxShadow: "0 0 25px rgba(138, 0, 196, 0.4)",
      transition: { duration: 0.3 }
    }
  }

  const imageVariants = {
    hidden: { opacity: 0, scale: 1.1 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.5,
        delay: 0.7,
        ease: "easeOut"
      }
    }
  }

  const titleText = "Hello, I'm".split(" ")
  const lastWord = "Dimos"
  const subtitleText = "Developer | Student | Designer".split(" ")

  useEffect(() => {
    const particles = Array(15).fill(0).map(() => ({
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

  return (
    <section className='lg:py-14'>
      <div className='grid grid-cols-1 sm:grid-cols-12'>
        {/* Left side - Text content */}
        <motion.div 
          initial={{opacity: 0, scale: 0.5, y: 20 }}
          animate={{opacity: 1, scale: 1, y: 0 }} 
          transition={{duration: 0.6, ease: "easeOut"}}
          className='col-span-8 place-self-center text-center sm:text-left justify-self-start'
        >
          <motion.div
            className='text-[#a0a0a0] mb-4 text-4xl sm:text-5xl lg:text-8xl lg:leading-normal font-extrabold'
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {titleText.map((word, i) => (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className='inline-block mr-2'
              >
                {word}
              </motion.span>
            ))}
            <br />
            <motion.span 
              variants={wordVariants}
              className='block text-transparent bg-clip-text bg-gradient-to-r from-[#3c339a] to-[#8a00c4] text-6xl sm:text-7xl lg:text-9xl'
            >
              {lastWord}
            </motion.span>
          </motion.div>

          <motion.div
            className="text-white sm:text-lg lg:text-2xl mb-6 italic"
            variants={textVariants}
            initial="hidden"
            animate="visible"
          >
            {subtitleText.map((word, i) => (
              <motion.span 
                key={i} 
                variants={wordVariants}
                className='inline-block mr-2'
              >
                {word}
              </motion.span>
            ))}
          </motion.div>

          <motion.p 
            className='text-white sm:text-lg lg:text-xl mb-6'
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Hello! Welcome to my self-made portfolio website! Feel free to take a look around.
          </motion.p>
        </motion.div>

        {/* Right side - Animated image */}
        <motion.div
          initial="hidden"
          animate={imageLoaded ? "visible" : "hidden"}
          variants={imageContainerVariants}
          className="col-span-4 place-self-center mt-4 lg:mt-0 relative"
        >
          {/* Background pulse */}
          <motion.div
            className="absolute inset-0 rounded-full bg-gradient-to-t from-[#3c339a] via-[#8a00c4] to-[#3c339a] z-0"
            animate={{ opacity: [0.8, 1, 0.8], scale: [1, 1.02, 1] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />

          {/* Floating particles */}
          <div className="absolute inset-0 overflow-hidden z-10">
            {randomValues?.particles.map((particle, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full"
                style={{
                  width: `${particle.width}px`,
                  height: `${particle.height}px`,
                  background: particle.color,
                  filter: "blur(1px)",
                  x: particle.positions[0].x,
                  y: particle.positions[0].y,
                }}
                animate={{
                  x: [particle.positions[0].x, particle.positions[1].x, particle.positions[2].x],
                  y: [particle.positions[0].y, particle.positions[1].y, particle.positions[2].y],
                  opacity: [0.2, 0.8, 0.2],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Main image */}
          <motion.div
            className="relative w-[200px] h-[200px] sm:w-[250px] sm:h-[250px] lg:w-[400px] lg:h-[400px] rounded-full overflow-hidden z-20"
            variants={imageVariants}
          >
            <Image
              src="/images/hero-image.png"
              alt="hero image"
              fill
              className="object-cover rounded-full"
              onLoadingComplete={() => setImageLoaded(true)}
              priority
            />
          </motion.div>

          {/* Glowing border */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-purple-400/30 z-10"
            style={{
              width: "calc(100% + 20px)",
              height: "calc(100% + 20px)",
              left: "-10px",
              top: "-10px",
            }}
            animate={{
              borderColor: ["rgba(168, 85, 247, 0.3)", "rgba(168, 85, 247, 0.6)", "rgba(168, 85, 247, 0.3)"],
              scale: [1, 1.03, 1],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}

export default HeroSection
