"use client";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import NavLink from "./NavLink";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid";
import MenuOverlay from "./MenuOverlay";
import { motion } from "framer-motion";

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
];

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [scrollingDown, setScrollingDown] = useState(false);
  const [prevScrollY, setPrevScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > prevScrollY) {
        setScrollingDown(true); // Scrolling down
      } else {
        setScrollingDown(false); // Scrolling up
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [prevScrollY]);

  return (
    <motion.nav
      key={scrollingDown ? "scrollingDown" : "scrollingUp"} // Ensures that React can track the state change
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: scrollingDown ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed top-8 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] bg-gradient-to-t from-purple-950 to-[#121212] border border-[#33353F] rounded-xl shadow-lg backdrop-blur-md bg-opacity-90 z-30" // top-10 added for more space at the top
    >
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-6 py-3">
        <Link href="/" className="text-xl md:text-2xl text-white font-extrabold">
          D. Gkontevas
        </Link>
        <div className="mobile-menu block md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center p-2 border rounded border-purple-800 text-purple-400 hover:text-white hover:border-white"
          >
            {navbarOpen ? <XMarkIcon className="h-6 w-6" /> : <Bars3Icon className="h-6 w-6" />}
          </button>
        </div>
        <div className="hidden md:block md:w-auto" id="navbar">
          <ul className="flex p-4 md:p-0 md:flex-row md:space-x-8 mt-0">
            {navLinks.map((link, index) => (
              <motion.li
                key={link.title} // Ensure each link has a unique key
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <NavLink href={link.path} title={link.title} />
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen && <MenuOverlay links={navLinks} />}
    </motion.nav>
  );
};

export default Navbar;






