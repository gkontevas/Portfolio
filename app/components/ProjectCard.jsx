import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

/**
 * Visually striking ProjectCard component with clean image,
 * pronounced pop-out effect on hover, and a purple-glow theme.
 */
const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-[500px] md:max-w-[650px] rounded-3xl overflow-hidden shadow-2xl border border-purple-700 bg-gradient-to-br from-[#371b6e]/90 via-[#7f3eed]/80 to-[#2e0a3d]/90 relative group transition-all duration-300
      hover:shadow-[0_4px_64px_8px_rgba(160,88,255,0.40)] hover:scale-105 hover:border-fuchsia-400/80 hover:z-30 mx-auto">
      {/* Glass, glowing, and animated border layers */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute z-10 w-full h-full rounded-3xl"
          style={{
            background: "radial-gradient(ellipse at 70% 0%, rgba(191,94,230,0.16) 0%, transparent 70%), radial-gradient(ellipse at 0% 100%, rgba(132,84,255,0.14) 0%, transparent 60%)"
          }}
        />
        <div className="w-full h-full absolute rounded-3xl border-4 border-purple-400/30 blur-[2.5px] opacity-60 animate-pulse" />
      </div>
      {/* Card Image - no overlay/gradient */}
      <div
        className="relative z-20 h-44 sm:h-56 md:h-64"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.92) saturate(1.18)",
        }}
      >
        {/* Hover overlay with animated icons */}
        <div className="absolute inset-0 z-30 flex items-center justify-center gap-5 transition-all duration-500 opacity-0 bg-purple-950/0 group-hover:bg-purple-950/80 group-hover:opacity-100">
          <Link
            href={gitUrl}
            className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 rounded-full shadow-lg border-purple-400/70 bg-gradient-to-br from-purple-700/50 to-purple-900/80 hover:bg-purple-800/80 hover:border-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CodeBracketIcon className="text-purple-200 h-7 w-7 hover:text-white" />
          </Link>
          {/* Uncomment below to show the preview button */}
          {/* 
          <Link
            href={previewUrl}
            className="flex items-center justify-center w-12 h-12 transition-all duration-300 border-2 rounded-full shadow-lg border-purple-400/70 bg-gradient-to-br from-purple-700/50 to-purple-900/80 hover:bg-purple-800/80 hover:border-white"
            target="_blank"
            rel="noopener noreferrer"
          >
            <EyeIcon className="text-purple-200 h-7 w-7 hover:text-white" />
          </Link>
          */}
        </div>
      </div>
      {/* Card Content */}
      <div className="relative z-20 p-7 flex flex-col flex-grow bg-gradient-to-br from-purple-900/50 via-[#372050]/60 to-purple-950/70 backdrop-blur-[2.5px]">
        <h5 className="text-2xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-purple-200 via-fuchsia-300 to-indigo-300 drop-shadow-[0_2px_8px_rgba(120,50,255,0.12)]">
          {title}
        </h5>
        <p className="text-purple-100/90 text-base flex-grow mb-4 drop-shadow-[0_1px_4px_rgba(130,70,255,0.10)]">{description}</p>
      </div>
      {/* Floating purple glow */}
      <div className="absolute -bottom-8 right-24 w-40 h-32 bg-purple-400/40 rounded-full blur-3xl opacity-70 animate-[pulse_3.2s_ease-in-out_infinite]" />
      <div className="absolute -top-7 left-10 w-32 h-16 bg-fuchsia-500/30 rounded-full blur-2xl opacity-60 animate-[pulse_2.5s_ease-in-out_infinite]" />
    </div>
  );
};

export default ProjectCard;