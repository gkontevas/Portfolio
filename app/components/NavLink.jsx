"use client"
import { Link as ScrollLink } from "react-scroll"
import Link from "next/link"
import { useState, useEffect } from "react"

const NavLink = ({ href, title, onClick, className = "" }) => {
  const [scrollOffset, setScrollOffset] = useState(-120)

  useEffect(() => {
    const updateOffset = () => {
      // Much larger offset values to ensure perfect centering
      setScrollOffset(window.innerWidth <= 768 ? -180 : -200)
    }
    
    updateOffset()
    window.addEventListener('resize', updateOffset)
    return () => window.removeEventListener('resize', updateOffset)
  }, [])

  if (href.startsWith("#")) {
    const targetId = href.substring(1)
   return (
      <ScrollLink
        to={targetId}
        spy={true}
        smooth={true}
        offset={scrollOffset}
        duration={500}
        className={`block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:p-0 cursor-pointer ${className}`}
        onClick={onClick}
      >
        {title}
      </ScrollLink>
    )
  }
  return (
    <Link href={href} onClick={onClick} className={`block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:p-0 ${className}`}>
      {title}
    </Link>
  )
}
export default NavLink
