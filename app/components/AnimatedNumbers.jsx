"use client"

import React from "react"
import { useSpring, useMotionValue, useTransform, motion, animate } from "framer-motion"

export const AnimatedNumber = ({ value, className }) => {
  const motionValue = useMotionValue(0)

  const springValue = useSpring(motionValue, {
    stiffness: 60,  // lower stiffness for smoother motion
    damping: 20,    // soft damping for smooth stop
    mass: 1.2,      // makes the motion feel heavier
  })

  const displayValue = useTransform(springValue, (latest) =>
    Math.floor(latest).toLocaleString("en-US")
  )

  React.useEffect(() => {
    animate(motionValue, value, { duration: 0.8, ease: [0.22, 1, 0.36, 1] }) // easeOutCubic
  }, [value, motionValue])

  return <motion.span className={className}>{displayValue}</motion.span>
}
