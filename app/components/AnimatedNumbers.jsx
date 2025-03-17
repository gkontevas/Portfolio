"use client"

import React from "react"
import { useSpring, useTransform, motion } from "framer-motion"

export const AnimatedNumber = ({ value, className }) => {
  const springValue = useSpring(0, {
    stiffness: 100, // Reduced stiffness for smoother animation
    damping: 30, // Increased damping for less bouncy effect
    mass: 0.8, // Increased mass for more weight to the animation
    velocity: 2, // Reduced initial velocity
    restDelta: 0.0001,
  })

  const displayValue = useTransform(springValue, (current) => {
    return Math.round(current).toLocaleString("en-US")
  })

  React.useEffect(() => {
    springValue.set(value)
  }, [value, springValue])

  return <motion.span className={className}>{displayValue}</motion.span>
}







