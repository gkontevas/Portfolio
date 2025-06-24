import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

/**
 * Minimal, unique ProjectCard using only purple shades.
 */
const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className="flex flex-col h-full w-full max-w-[800px] rounded-2xl overflow-hidden shadow-lg border border-purple-900/40 bg-gradient-to-br from-purple-950 via-purple-900 to-purple-800 relative group transition-all duration-300 hover:scale-[1.03] mx-auto">
      {/* Card Image */}
      <div
        className="relative h-44 sm:h-56 md:h-64"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          filter: "brightness(0.82) grayscale(0.15)",
        }}
      >
        {/* Minimal hover overlay with icons */}
        <div className="absolute inset-0 z-20 flex items-center justify-center gap-4 transition-opacity duration-300 opacity-0 group-hover:opacity-100 bg-purple-950/60">
          <Link
            href={gitUrl}
            className="flex items-center justify-center w-10 h-10 transition border border-purple-700 rounded-full bg-purple-900/80 hover:bg-purple-800"
            target="_blank"
            rel="noopener noreferrer"
          >
            <CodeBracketIcon className="w-6 h-6 text-purple-300" />
          </Link>
          {previewUrl && (
            <Link
              href={previewUrl}
              className="flex items-center justify-center w-10 h-10 transition border border-purple-700 rounded-full bg-purple-900/80 hover:bg-purple-800"
              target="_blank"
              rel="noopener noreferrer"
            >
              <EyeIcon className="w-6 h-6 text-purple-300" />
            </Link>
          )}
        </div>
      </div>
      {/* Card Content */}
      <div className="relative z-10 flex flex-col flex-grow p-6 bg-purple-950/70">
        <h5 className="mb-1 text-xl font-bold tracking-tight text-purple-100">{title}</h5>
        <p className="flex-grow mb-2 text-sm text-purple-300">{description}</p>
      </div>
      {/* Minimal floating accent */}
      <div className="absolute w-16 h-8 rounded-full pointer-events-none bottom-4 right-8 bg-purple-800/40 blur-xl opacity-40" />
    </div>
  );
};

export default ProjectCard;