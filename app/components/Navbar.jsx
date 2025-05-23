"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import NavLink from "./NavLink"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"

const navLinks = [
  { title: "About", path: "#about" },
  { title: "Projects", path: "#projects" },
  { title: "Contact", path: "#contact" },
]

const Navbar = () => {
  const [navbarOpen, setNavbarOpen] = useState(false)
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isAtTop, setIsAtTop] = useState(true)

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY
      setIsAtTop(currentScrollY < 10)

      if (currentScrollY < 50) {
        setVisible(true)
        setLastScrollY(currentScrollY)
        return
      }

      if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setVisible(false)
      } else if (currentScrollY < lastScrollY) {
        setVisible(true)
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [lastScrollY])

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ 
        y: visible ? 0 : -100,
        opacity: visible ? 1 : 0
      }}
      transition={{ 
        type: "spring",
        damping: 20,
        stiffness: 300
      }}
      className={`fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50`}
    >
      <motion.div
        animate={{
          backgroundColor: isAtTop ? 'rgba(15, 0, 30, 0.5)' : 'rgba(15, 0, 30, 0.95)',
          borderColor: isAtTop ? 'rgba(109, 40, 217, 0.3)' : 'rgba(109, 40, 217, 0.5)',
          boxShadow: isAtTop ? '0 4px 30px rgba(76, 29, 149, 0.1)' : '0 8px 32px rgba(76, 29, 149, 0.3)'
        }}
        transition={{ duration: 0.3 }}
        className={`rounded-2xl border backdrop-blur-lg`}
      >
        <div className="flex justify-between items-center px-6 py-3">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-white group">
              <span className="text-xl font-bold bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text text-transparent">
                D. Gkontevas
              </span>
              <div className="h-[2px] bg-gradient-to-r from-purple-500 to-purple-300 w-0 group-hover:w-full transition-all duration-300" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}
          <motion.div 
            className="hidden md:flex items-center space-x-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {navLinks.map((link, index) => (
              <motion.div
                key={link.path}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.95 }}
                className="relative"
              >
                <NavLink 
                  href={link.path} 
                  title={link.title}
                  className="text-purple-200 hover:text-white px-3 py-2 transition-colors duration-200"
                />
                <motion.div
                  className="absolute bottom-1 left-1/2 h-0.5 bg-purple-400"
                  initial={{ width: 0, x: '-50%' }}
                  whileHover={{ width: '80%', x: '-50%' }}
                  transition={{ type: 'spring', stiffness: 300 }}
                />
              </motion.div>
            ))}
          </motion.div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="md:hidden p-2 rounded-lg text-purple-300 hover:text-white focus:outline-none"
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Toggle menu"
          >
            {navbarOpen ? (
              <XMarkIcon className="h-6 w-6" />
            ) : (
              <Bars3Icon className="h-6 w-6" />
            )}
          </motion.button>
        </div>

        {/* Mobile Menu Overlay - Updated for centered text */}
        <AnimatePresence>
          {navbarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
            >
              <div className="px-6 pb-4 flex flex-col items-center space-y-4"> {/* Changed to flex-col and items-center */}
                {navLinks.map((link) => (
                  <motion.div
                    key={link.path}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    transition={{ type: 'spring' }}
                    className="w-full text-center" // Added w-full and text-center
                  >
                    <NavLink 
                      href={link.path} 
                      title={link.title}
                      className="block px-3 py-2 text-purple-200 hover:text-white rounded-lg hover:bg-purple-900/50 transition-colors w-full text-center" // Added w-full and text-center
                      onClick={() => setNavbarOpen(false)}
                    />
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </motion.nav>
  )
}

export default Navbar