import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";
import { memo } from "react";

const ProjectCard = memo(({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className="group relative w-full max-w-[800px] mx-auto overflow-hidden rounded-xl bg-gradient-to-br from-purple-950/30 via-purple-900/20 to-purple-800/30 backdrop-blur-sm border border-purple-500/10 transition-all duration-500 hover:border-purple-400/30 hover:shadow-2xl hover:shadow-purple-500/20">
      {/* Image Container */}
      <div className="relative overflow-hidden rounded-t-xl">
        <div
          className="relative h-48 transition-transform duration-700 sm:h-56 md:h-64 group-hover:scale-105"
          style={{
            backgroundImage: `url(${imgUrl})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-purple-950/20 via-purple-900/5 to-transparent" />
          
          {/* Action Buttons */}
          <div className="absolute inset-0 flex items-center justify-center gap-3 transition-all duration-300 opacity-0 group-hover:opacity-100">
            <Link
              href={gitUrl}
              className="flex items-center justify-center w-12 h-12 transition-all duration-300 border rounded-full bg-purple-900/90 backdrop-blur-md border-purple-400/30 hover:bg-purple-800/90 hover:scale-110 hover:border-purple-300/50"
              target="_blank"
              rel="noopener noreferrer"
            >
              <CodeBracketIcon className="w-5 h-5 text-purple-200" />
            </Link>
            {previewUrl && (
              <Link
                href={previewUrl}
                className="flex items-center justify-center w-12 h-12 transition-all duration-300 border rounded-full bg-purple-900/90 backdrop-blur-md border-purple-400/30 hover:bg-purple-800/90 hover:scale-110 hover:border-purple-300/50"
                target="_blank"
                rel="noopener noreferrer"
              >
                <EyeIcon className="w-5 h-5 text-purple-200" />
              </Link>
            )}
          </div>
        </div>
      </div>
      
      {/* Content Container */}
      <div className="p-6 space-y-3">
        <h3 className="text-lg font-semibold text-purple-100 transition-colors duration-300 group-hover:text-white">
          {title}
        </h3>
        <p className="text-sm leading-relaxed transition-colors duration-300 text-purple-300/90 group-hover:text-purple-200/90">
          {description}
        </p>
      </div>
      
      {/* Subtle glow effect */}
      <div className="absolute w-24 h-24 transition-opacity duration-500 rounded-full opacity-0 -bottom-2 -right-2 bg-purple-500/10 blur-2xl group-hover:opacity-100" />
    </div>
  );
});

ProjectCard.displayName = 'ProjectCard';

export default ProjectCard;