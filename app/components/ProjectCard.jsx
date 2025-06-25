import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { memo, useState, useEffect, useRef } from "react";

const ProjectCard = memo(({ imgUrl, title, description, gitUrl, previewUrl, index = 0 }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setIsVisible(true);
          }, index * 200);
        }
      },
      { threshold: 0.1 } // Lower threshold for mobile
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => {
      if (cardRef.current) {
        observer.unobserve(cardRef.current);
      }
    };
  }, [index]);

  return (
    <div 
      ref={cardRef}
      className={`group relative w-full max-w-[350px] sm:max-w-[400px] md:max-w-[600px] mx-auto h-[520px] perspective-1000 transition-all duration-700 ${
        isVisible 
          ? 'opacity-100 translate-y-0' 
          : 'opacity-0 translate-y-8'
      }`}
    >
      {/* Card Container with 3D Flip */}
      <div 
        className={`relative w-full h-full transition-transform duration-700 transform-style-preserve-3d cursor-pointer ${
          isFlipped ? 'rotate-y-180' : ''
        }`}
        onClick={() => setIsFlipped(!isFlipped)}
      >
        {/* Front Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rounded-2xl">
          {/* Holographic Border Effect */}
          <div className="absolute inset-0 p-[2px] bg-gradient-to-r from-purple-500 via-pink-500 to-purple-400 bg-[length:200%_200%] animate-gradient-shift rounded-2xl">
            <div className="w-full h-full overflow-hidden bg-gradient-to-br from-slate-900/95 via-purple-950/95 to-slate-900/95 rounded-2xl">
              
              {/* Animated Grid Pattern */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute inset-0 bg-[linear-gradient(rgba(139,69,193,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(139,69,193,0.3)_1px,transparent_1px)] bg-[size:20px_20px] animate-pulse" />
              </div>

              {/* Simplified floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-2 h-2 bg-purple-400 rounded-full top-10 left-10 opacity-40" />
                <div className="absolute top-32 right-16 w-1.5 h-1.5 bg-pink-400 rounded-full opacity-40" />
                <div className="absolute w-1 h-1 bg-purple-300 rounded-full bottom-20 left-20 opacity-40" />
              </div>

              {/* Orbital Image Container - Static */}
              <div className="relative w-48 h-48 mx-auto mt-8">
                {/* Static Orbital Rings */}
                <div className="absolute inset-0 border-2 rounded-full border-purple-500/30" />
                <div className="absolute border rounded-full inset-2 border-pink-500/20" />
                
                {/* Central Image - Static */}
                <div className="absolute p-1 overflow-hidden rounded-full inset-8 bg-gradient-to-br from-purple-600 via-pink-600 to-purple-500">
                  <div 
                    className="relative w-full h-full overflow-hidden bg-center bg-cover rounded-full"
                    style={{
                      backgroundImage: `url(${imgUrl})`
                    }}
                  >
                    {/* Simple image overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-purple-500/20 via-transparent to-pink-500/20" />
                  </div>
                </div>
                
                {/* Static data points */}
                <div className="absolute w-3 h-3 bg-pink-400 rounded-full top-4 right-8 opacity-40" />
                <div className="absolute w-2 h-2 bg-purple-400 rounded-full bottom-8 left-4 opacity-40" />
                <div className="absolute top-1/2 right-2 w-1.5 h-1.5 bg-pink-300 rounded-full opacity-40" />
              </div>

              {/* Glitch Text Effect - Simplified */}
              <div className="relative px-6 mt-8">
                <h3 className="relative text-xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-r from-purple-300 via-pink-300 to-purple-200">
                  {title}
                </h3>
              </div>

              {/* Scan Line Effect - Removed */}

              {/* Click Indicator - Simplified */}
              <div className="absolute transform -translate-x-1/2 bottom-4 left-1/2">
                <div className="flex items-center gap-2 text-xs text-purple-400">
                  <div className="flex items-center justify-center w-6 h-6 border-2 border-purple-400 rounded-full">
                    <div className="w-2 h-2 bg-purple-400 rounded-full" />
                  </div>
                  <span>FLIP TO EXPLORE</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Back Face */}
        <div className="absolute inset-0 w-full h-full backface-hidden rotate-y-180 rounded-2xl">
          <div className="absolute inset-0 p-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-pink-400 bg-[length:200%_200%] animate-gradient-shift-reverse rounded-2xl">
            <div className="flex flex-col w-full h-full p-6 bg-gradient-to-br from-slate-900/95 via-purple-950/95 to-slate-900/95 rounded-2xl relative overflow-hidden card-glow">
              
              {/* Simplified background effects */}
              <div className="absolute inset-0 opacity-20">
                <div className="absolute w-32 h-32 bg-gradient-to-r from-pink-500/30 to-purple-500/30 rounded-full top-8 -right-8" />
                <div className="absolute w-24 h-24 bg-gradient-to-r from-purple-500/20 to-fuchsia-500/20 rounded-full bottom-12 -left-6" />
              </div>

              {/* Simplified floating particles */}
              <div className="absolute inset-0 overflow-hidden">
                <div className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-40 left-20 top-32" />
                <div className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-40 left-32 top-40" />
                <div className="absolute w-1 h-1 bg-gradient-to-r from-pink-400 to-purple-400 rounded-full opacity-40 left-44 top-48" />
              </div>

              {/* Back Content */}
              <div className="relative z-10 flex flex-col flex-1">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 via-purple-300 to-pink-200 mb-2">
                    PROJECT DETAILS
                  </h3>
                  <div className="w-16 h-0.5 bg-gradient-to-r from-pink-400 to-purple-400 mx-auto rounded-full" />
                </div>
                
                <div className="flex-1 mb-8">
                  <div className="bg-gradient-to-r from-purple-900/30 to-pink-900/30 rounded-xl p-4 backdrop-blur-sm border border-purple-500/20">
                    <p className="text-sm leading-relaxed text-center text-purple-200/90 font-medium">
                      {description}
                    </p>
                  </div>
                </div>

                {/* Enhanced Action Buttons */}
                <div className="flex justify-center gap-4">
                  <Link
                    href={gitUrl}
                    className="group relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-500 rounded-xl bg-gradient-to-r from-purple-600 via-blue-600 to-purple-700 hover:shadow-2xl hover:shadow-purple-500/40 transform hover:scale-105"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-purple-600 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                    <div className="relative flex items-center gap-3">
                      <CodeBracketIcon className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
                      <span className="text-sm font-bold tracking-wide">VIEW CODE</span>
                      <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </Link>
                  
                  {previewUrl && (
                    <Link
                      href={previewUrl}
                      className="group relative px-8 py-4 overflow-hidden font-semibold text-white transition-all duration-500 rounded-xl bg-gradient-to-r from-pink-600 via-fuchsia-600 to-purple-600 hover:shadow-2xl hover:shadow-pink-500/40 transform hover:scale-105"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-fuchsia-600 via-pink-600 to-fuchsia-700 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl" />
                      <div className="relative flex items-center gap-3">
                        <EyeIcon className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                        <span className="text-sm font-bold tracking-wide">LIVE DEMO</span>
                        <div className="w-2 h-2 bg-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                      </div>
                    </Link>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;