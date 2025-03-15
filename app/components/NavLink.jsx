"use client"

import { Link as ScrollLink } from "react-scroll"
import Link from "next/link"

const NavLink = ({ href, title }) => {
  // Check if the link is an anchor link (starts with #)
  if (href.startsWith("#")) {
    const targetId = href.substring(1)

    return (
      <ScrollLink
        to={targetId}
        spy={true}
        smooth={true}
        offset={-100} // Adjust this value based on your navbar height
        duration={500}
        className="block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:p-0  cursor-pointer"
      >
        {title}
      </ScrollLink>
    )
  }

  // For non-anchor links, use Next.js Link as usual
  return (
    <Link href={href} className="block py-2 pl-3 pr-4 text-white sm:text-xl rounded md:p-0">
      {title}
    </Link>
  )
}

export default NavLink









