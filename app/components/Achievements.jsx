"use client"
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
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-purple-900 shadow-sm shadow-black sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => (
          <div
            key={`${achievement.metric}-${index}`}
            className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
          >
            <h2 className="text-[#8a00c4] text-4xl font-bold flex flex-row">
              {achievement.prefix && <span>{achievement.prefix}</span>}
              <AnimatedNumber value={achievement.value} className="text-[#8a00c4] text-4xl font-bold" />
              {achievement.postfix && <span>{achievement.postfix}</span>}
            </h2>
            <p className="text-white text-base">{achievement.metric}</p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AchievementsSection




