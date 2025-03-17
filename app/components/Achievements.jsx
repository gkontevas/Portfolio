"use client"
import { motion } from "framer-motion"
import { AnimatedNumber } from "./AnimatedNumbers"

const achievementsList = [
  {
    metric: "Projects",
    value: 5,
    postfix: "+",
    icon: "📊",
  },
  {
    metric: "Courses/Workshops",
    value: 2,
    prefix: "~",
    icon: "🎓",
  },
  {
    metric: "Years",
    value: 2,
    icon: "⏳",
  },
]

const AchievementsSection = () => {

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  }


  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  }

  return (
    <div className="py-12 px-4 xl:gap-16 sm:py-20 xl:px-16 relative overflow-hidden">
      <div className="absolute -top-24 -left-24 w-64 h-64rounded-full blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-64 h-64  rounded-full blur-3xl" />

      <motion.div
        className="sm:border-purple-900/30 bg-black/40 sm:border rounded-xl py-10 px-8 md:px-16 relative z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.div
          className="flex flex-col sm:flex-row items-center justify-between gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {achievementsList.map((achievement, index) => (
            <motion.div
              key={`${achievement.metric}-${index}`}
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0 group"
              variants={itemVariants}
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <div className="mb-2 text-2xl opacity-80">{achievement.icon}</div>
              <h2 className="text-[#a64de6] text-4xl md:text-5xl font-bold flex flex-row items-center">
                {achievement.prefix && <span>{achievement.prefix}</span>}
                <AnimatedNumber value={achievement.value} className="text-[#a64de6] text-4xl md:text-5xl font-bold" />
                {achievement.postfix && <span>{achievement.postfix}</span>}
              </h2>
              <motion.div
                className="h-1 w-0 bg-gradient-to-r from-purple-600 to-purple-400 mt-2 rounded-full group-hover:w-full"
                transition={{ duration: 0.3 }}
              />
              <p className="text-white/80 text-base mt-2 font-medium">{achievement.metric}</p>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default AchievementsSection






