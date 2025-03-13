"use client"

import React from "react"
import { useSpring, useTransform, motion } from "framer-motion"

export const AnimatedNumber = ({ value, className }) => {
  const springValue = useSpring(0, {
    stiffness: 170, 
    damping: 20, 
    mass: 0.5, 
    velocity: 10, 
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





