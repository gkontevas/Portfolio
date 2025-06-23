// "use client"
// import { motion } from "framer-motion"
// import { AnimatedNumber } from "./AnimatedNumbers"

// const achievementsList = [
//   {
//     metric: "Projects",
//     value: 5,
//     postfix: "+",
//   },
//   {
//     metric: "Courses/Workshops",
//     value: 2,
//     prefix: "~",
//   },
//   {
//     metric: "Years",
//     value: 2,
//   },
// ]

// const AchievementsSection = () => {
//   return (
//     <section className="relative px-4 py-16 sm:py-20 xl:px-24">
//       {/* Background blur blobs */}
//       <div className="absolute z-0 rounded-full -top-32 -left-32 w-72 h-72 bg-purple-700/30 blur-3xl" />
//       <div className="absolute z-0 rounded-full -bottom-32 -right-32 w-72 h-72 bg-purple-500/30 blur-3xl" />

//       {/* Main container */}
//       <motion.div
//         className="relative z-10 px-6 py-10 border shadow-xl bg-black/10 border-purple-500/30 rounded-3xl sm:px-12 backdrop-blur-md"
//         initial={{ opacity: 0, scale: 0.95 }}
//         whileInView={{ opacity: 1, scale: 1 }}
//         viewport={{ once: true }}
//         transition={{ duration: 0.6, ease: "easeOut" }}
//       >
//         <div className="grid grid-cols-1 gap-8 sm:grid-cols-3">
//           {achievementsList.map((achievement, index) => (
//             <motion.div
//               key={`${achievement.metric}-${index}`}
//               className="flex flex-col items-center justify-center text-center group"
//               initial={{ opacity: 0, y: 20 }}
//               whileInView={{ opacity: 1, y: 0 }}
//               viewport={{ once: true }}
//               transition={{ duration: 0.6, delay: index * 0.2 }}
//             >
//               <h2 className="text-[#c084fc] text-5xl font-extrabold tracking-tight">
//                 {achievement.prefix && <span>{achievement.prefix}</span>}
//                 <AnimatedNumber value={achievement.value} className="text-[#c084fc]" />
//                 {achievement.postfix && <span>{achievement.postfix}</span>}
//               </h2>

//               <motion.div
//                 className="w-0 h-1 mt-3 rounded-full bg-gradient-to-r from-purple-500 to-purple-300 group-hover:w-16"
//                 transition={{ duration: 0.4 }}
//               />

//               <p className="mt-3 text-lg font-medium text-white/80">{achievement.metric}</p>
//             </motion.div>
//           ))}
//         </div>
//       </motion.div>
//     </section>
//   )
// }

// export default AchievementsSection
