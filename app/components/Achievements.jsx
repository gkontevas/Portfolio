"use client"
import { motion } from "framer-motion"
import { AnimatedNumber } from "./AnimatedNumbers"

const achievementsList = [
  {
    metric: "Projects",
    value: 5,
    postfix: "+",
  },
  {
    metric: "Courses/Workshops",
    value: 2,
    prefix: "~",
  },
  {
    metric: "Years",
    value: 2,
  },
]

const AchievementsSection = () => {
  return (
    <section className="relative px-4 py-16 sm:py-20 xl:px-24">
      {/* Background blur blobs */}
      <div className="absolute -top-32 -left-32 w-72 h-72 bg-purple-700/30 rounded-full blur-3xl z-0" />
      <div className="absolute -bottom-32 -right-32 w-72 h-72 bg-purple-500/30 rounded-full blur-3xl z-0" />

      {/* Main container */}
      <motion.div
        className="relative z-10 bg-black/10 border border-purple-500/30 rounded-3xl shadow-xl px-6 sm:px-12 py-10 backdrop-blur-md"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
          {achievementsList.map((achievement, index) => (
            <motion.div
              key={`${achievement.metric}-${index}`}
              className="flex flex-col items-center justify-center text-center group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
            >
              <h2 className="text-[#c084fc] text-5xl font-extrabold tracking-tight">
                {achievement.prefix && <span>{achievement.prefix}</span>}
                <AnimatedNumber value={achievement.value} className="text-[#c084fc]" />
                {achievement.postfix && <span>{achievement.postfix}</span>}
              </h2>

              <motion.div
                className="h-1 w-0 bg-gradient-to-r from-purple-500 to-purple-300 mt-3 rounded-full group-hover:w-16"
                transition={{ duration: 0.4 }}
              />

              <p className="text-white/80 text-lg mt-3 font-medium">{achievement.metric}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default AchievementsSection
