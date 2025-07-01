import React from "react";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="relative border-t border-purple-500/20 bg-gradient-to-t from-purple-950/30 to-transparent backdrop-blur-sm">
      <div className="relative p-8 sm:p-12">
        {/* Subtle background elements */}
        <div className="absolute top-0 left-1/4 w-32 h-32 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-40 h-40 bg-fuchsia-500/5 rounded-full blur-3xl" />
        
        <div className="relative z-10 flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="text-purple-300/80 font-medium"
          >
            <span className="text-transparent bg-gradient-to-r from-purple-400 to-fuchsia-400 bg-clip-text font-semibold">
              &copy; Dimos Gkontevas 2025
            </span>
            <span className="text-purple-400/70">. All rights reserved.</span>
          </motion.p>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
            className="text-sm text-purple-400/60 italic max-w-md"
          >
            Important note: This portfolio was created with the help of tutorials as well as sources around the internet.
          </motion.p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
