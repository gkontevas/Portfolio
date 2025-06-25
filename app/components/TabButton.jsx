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
        px-4 py-2
        rounded-md
        transition
        duration-150
        focus:outline-none
        bg-transparent
        mx-1
        ${active 
          ? "text-purple-700"
          : "text-[#ADB7BE] hover:text-purple-700"
        }
      `}
      style={{ display: "flex", flexDirection: "column", alignItems: "center", background: "transparent" }}
    >
      <span ref={textRef}>{children}</span>
      <motion.div
        animate={{ width: active ? underlineWidth : 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="h-1 mt-1 bg-purple-500"
        style={{ borderRadius: 2 }}
      />
    </button>
  );
};
export default TabButton;