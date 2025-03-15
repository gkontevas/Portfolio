"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import NavLink from "./NavLink"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import MenuOverlay from "./MenuOverlay"
import { motion } from "framer-motion"

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
]

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [scrollingDown, setScrollingDown] = useState(false)
  const [prevScrollY, setPrevScrollY] = useState(0)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Detect scroll direction
      if (currentScrollY > prevScrollY) {
        setScrollingDown(true) // Scrolling down
      } else {
        setScrollingDown(false) // Scrolling up
      }

      // Detect if page is scrolled
      if (currentScrollY > 20) {
        setScrolled(true)
      } else {
        setScrolled(false)
      }

      setPrevScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [prevScrollY])

  return (
    <motion.nav
      key={scrollingDown ? "scrollingDown" : "scrollingUp"} // Ensures that React can track the state change
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: scrollingDown ? -100 : 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-6 sm:top-2.5 left-1/2 transform -translate-x-1/2 w-[90%] md:w-[80%] ${
        scrolled
          ? "bg-purple-950/95 backdrop-blur-md shadow-xl"
          : "bg-gradient-to-b from-purple-950 to-purple-900 backdrop-blur-sm"
      } border border-purple-800 rounded-xl z-30 transition-all duration-300`}
    >
      <div className="flex container lg:py-4 flex-wrap items-center justify-between mx-auto px-6 py-3">
        <Link href="/" className="text-xl md:text-2xl text-white font-extrabold">
          D. Gkontevas
        </Link>
        <div className="mobile-menu block md:hidden">
          <button
            onClick={() => setNavbarOpen(!navbarOpen)}
            className="flex items-center p-2 border rounded border-purple-700 text-purple-300 hover:text-white hover:border-white transition-colors duration-300"
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
                className="group"
              >
                <NavLink href={link.path} title={link.title} />
                <div className="h-0.5 w-0 bg-purple-300 group-hover:w-full transition-all duration-300"></div>
              </motion.li>
            ))}
          </ul>
        </div>
      </div>
      {navbarOpen && <MenuOverlay links={navLinks} />}
    </motion.nav>
  )
}

export default Navbar














