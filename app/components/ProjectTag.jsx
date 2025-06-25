const ProjectTag = ({ name, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(name)}
      className={`py-2 px-5 rounded-lg border transition-all duration-300 text-sm font-medium
        ${isSelected ? "bg-purple-700 border-purple-500 text-white shadow-md" : "bg-gray-800 border-gray-600 text-gray-400"}
        hover:bg-purple-600 hover:border-purple-400 hover:text-white`}
    >
      {name}
    </button>
  );
};
export default ProjectTag;
