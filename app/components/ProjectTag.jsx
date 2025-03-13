const ProjectTag = ({ name, isSelected, onClick }) => {
  return (
    <button
      onClick={() => onClick(name)}
      className={`py-2 px-4 rounded-lg border border-gray-400 ${
        isSelected ? "bg-purple-900 text-white" : "bg-gray-800 text-gray-400"
      } hover:bg-purple-800 hover:text-white transition-colors duration-300`}
    >
      {name}
    </button>
  )
}

export default ProjectTag


