import { CodeBracketIcon, EyeIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

const ProjectCard = ({ imgUrl, title, description, gitUrl, previewUrl }) => {
  return (
    <div className="flex flex-col h-full rounded-lg shadow-xl overflow-hidden bg-[#1a1a1a] transition-all duration-300 hover:shadow-2xl hover:-translate-y-2">
      <div
        className="h-48 md:h-72 relative group"
        style={{
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center opacity-0 group-hover:opacity-100 group-hover:bg-opacity-80 transition-all duration-500">
          <Link
            href={gitUrl}
            className="h-12 w-12 flex items-center justify-center border-2 border-gray-500 rounded-full bg-opacity-40 hover:border-white hover:bg-gray-800 transition-all duration-300"
          >
            <CodeBracketIcon className="h-8 w-8 text-gray-300 hover:text-white" />
          </Link>
          {/* <Link
            href={previewUrl}
            className="h-12 w-12 flex items-center justify-center border-2 border-gray-500 rounded-full bg-opacity-40 hover:border-white hover:bg-gray-800 transition-all duration-300 ml-3"
          >
            <EyeIcon className="h-8 w-8 text-gray-300 hover:text-white" />
          </Link> */}
        </div>
      </div>
      <div className="p-5 bg-gray-800 text-white flex flex-col flex-grow">
        <h5 className="text-xl font-semibold mb-2 text-gray-200">{title}</h5>
        <p className="text-gray-400 text-sm flex-grow">{description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;


