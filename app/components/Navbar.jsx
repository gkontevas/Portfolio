"use client"
import Link from "next/link"
import { useState, useEffect } from "react"
import NavLink from "./NavLink"
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/solid"
import { motion, AnimatePresence } from "framer-motion"
import { NavbarSkeleton } from "./Skeleton"
import { useLoading } from "../contexts/LoadingContext"
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
  const { isComponentLoading } = useLoading();
  const isLoading = isComponentLoading('navbar');

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

  if (isLoading) {
    return (
      <div className="fixed top-4 left-1/2 -translate-x-1/2 w-[95%] max-w-6xl z-50">
        <div className="bg-black/80 backdrop-blur-md border border-purple-500/20 rounded-2xl px-6 py-4">
          <NavbarSkeleton />
        </div>
      </div>
    );
  }

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
      >        <div className="flex items-center justify-between px-6 py-3">
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Link href="/" className="text-white group">
              <span className="text-xl font-bold text-transparent bg-gradient-to-r from-purple-300 to-purple-500 bg-clip-text">
                D. Gkontevas
              </span>
              <div className="h-[2px] bg-gradient-to-r from-purple-500 to-purple-300 w-0 group-hover:w-full transition-all duration-300" />
            </Link>          </motion.div>
          <motion.div
            className="items-center hidden space-x-6 md:flex"
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
                  className="px-3 py-2 text-purple-200 transition-colors duration-200 hover:text-white"
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
          {}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            className="p-2 text-purple-300 rounded-lg md:hidden hover:text-white focus:outline-none"
            onClick={() => setNavbarOpen(!navbarOpen)}
            aria-label="Toggle menu"
          >
            {navbarOpen ? (
              <XMarkIcon className="w-6 h-6" />
            ) : (
              <Bars3Icon className="w-6 h-6" />
            )}
          </motion.button>
        </div>
        {}
        <AnimatePresence>
          {navbarOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden md:hidden"
            >
              <div className="flex flex-col items-center px-6 pb-4 space-y-4"> {}
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
                      className="block w-full px-3 py-2 text-center text-purple-200 transition-colors rounded-lg hover:text-white hover:bg-purple-900/50" // Added w-full and text-center
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