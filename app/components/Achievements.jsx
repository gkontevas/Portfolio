"use client";
import React from "react";
import dynamic from "next/dynamic";

const AnimatedNumbers = dynamic(
  () => {
    return import("react-animated-numbers");
  },
  { ssr: false }
);

const achievementsList = [
  {
    metric: "Projects",
    value: "5",
    postfix: "+",
  },
  {
    metric: "Courses/Workshops",
    value: "2",
    prefix: "~",
  },
  {
    metric: "Years",
    value: "2",
  },
];

const AchievementsSection = () => {
  return (
    <div className="py-8 px-4 xl:gap-16 sm:py-16 xl:px-16">
      <div className="sm:border-purple-900 shadow-sm shadow-black sm:border rounded-md py-8 px-16 flex flex-col sm:flex-row items-center justify-between">
        {achievementsList.map((achievement, index) => {
          return (
            <div
              key={`${achievement.metric}-${index}`} // Use a more unique key
              className="flex flex-col items-center justify-center mx-4 my-4 sm:my-0"
            >
              <h2 className="text-[#8a00c4] text-4xl font-bold flex flex-row">
                {achievement.prefix}
                <AnimatedNumbers
                  key={`${achievement.metric}-${index}`} // Add key here for AnimatedNumbers component
                  includeComma
                  animateToNumber={parseInt(achievement.value)}
                  locale="en-US"
                  className="text-[#8a00c4] text-4xl font-bold"
                  configs={(_, idx) => {
                    return {
                      mass: 1,
                      friction: 100,
                      tensions: 140 * (idx + 1),
                    };
                  }}
                />
                {achievement.postfix}
              </h2>
              <p className="text-white text-base">{achievement.metric}</p>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AchievementsSection

