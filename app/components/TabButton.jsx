import React, { useRef, useLayoutEffect, useState } from "react";
import { motion } from "framer-motion";
const TabButton = ({ active, selectTab, children }) => {
  const textRef = useRef(null);
  const [underlineWidth, setUnderlineWidth] = useState(0);
  
  useLayoutEffect(() => {
    if (textRef.current) {
      setUnderlineWidth(textRef.current.offsetWidth);
    }
  }, [children]);
  
  return (
    <button
      onClick={selectTab}
      className={`
        relative px-6 py-3 rounded-xl font-medium transition-all duration-300
        ${active 
          ? "text-white bg-gradient-to-r from-purple-600/30 via-fuchsia-600/30 to-indigo-600/30 border border-purple-400/40 shadow-lg shadow-purple-500/20" 
          : "text-purple-300 hover:text-purple-100 bg-purple-950/20 border border-purple-500/10 hover:border-purple-400/30 hover:bg-purple-900/30"
        }
        backdrop-blur-sm
      `}
    >
      <span ref={textRef} className={`relative z-10 ${active ? 'font-semibold' : ''}`}>
        {children}
      </span>
      {active && (
        <motion.div
          layoutId="activeTab"
          className="absolute inset-0 bg-gradient-to-r from-purple-500/20 via-fuchsia-500/20 to-indigo-500/20 rounded-xl"
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      )}
    </button>
  );
};
export default TabButton;