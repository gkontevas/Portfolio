"use client"

import { useState, useRef } from "react"
import Swal from "sweetalert2"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Github, Linkedin } from "lucide-react"

const ContactForm = () => {
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Refs for scroll animations
  const formContainerRef = useRef(null)
  const infoContainerRef = useRef(null)
  const isFormInView = useInView(formContainerRef, { once: true, amount: 0.2 })
  const isInfoInView = useInView(infoContainerRef, { once: true, amount: 0.2 })

  async function onSubmit(event) {
    event.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(event.target)
    formData.append("access_key", "8d1ff0ad-cf2f-4116-bc77-b15041b5839b")

    const object = Object.fromEntries(formData)
    const json = JSON.stringify(object)

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: json,
      })
      const result = await response.json()
      if (result.success) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
          background: "#FFFFFF",
          color: "#333333",
          confirmButtonColor: "#9D4EDD",
        })
        event.target.reset()
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        background: "#FFFFFF",
        color: "#333333",
        confirmButtonColor: "#9D4EDD",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const formItemVariants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }

  const buttonVariants = {
    initial: { scale: 1 },
    hover: { scale: 1.05, backgroundColor: "#9D4EDD", color: "#fff" },
    tap: { scale: 0.98 },
  }

  const socialVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, color: "#9D4EDD" },
  }

  return (
    <div className="min-h-screen flex items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="w-full max-w-7xl mx-auto">
        <div className="flex flex-col-reverse md:flex-row gap-8 sm:gap-12 md:gap-24 lg:gap-32">
          
          {/* Right Section - Contact Form */}
          <motion.div
            ref={formContainerRef}
            className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 bg-purple-950 rounded-3xl border border-[#9D4EDD]/30 shadow-xl shadow-[#9D4EDD]/10"
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="space-y-6 sm:space-y-8">
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#9D4EDD] mb-4 sm:mb-6 text-center md:text-center"
                variants={itemVariants}
              >
                Contact Me
              </motion.h2>
              <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div variants={formItemVariants}>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full px-4 py-3 bg-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] text-slate-400 placeholder-gray-400 transition-all duration-200"
                      required
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 bg-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] text-slate-400 placeholder-gray-400 transition-all duration-200"
                      required
                    />
                  </motion.div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                  <motion.div variants={formItemVariants}>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className="w-full px-4 py-3 bg-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] text-slate-400 placeholder-gray-400 transition-all duration-200"
                      required
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className="w-full px-4 py-3 bg-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] text-slate-400 placeholder-gray-400 transition-all duration-200"
                      required
                    />
                  </motion.div>
                </div>
                <motion.div variants={formItemVariants}>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={6}
                    className="w-full px-4 py-3 bg-[#121212] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] text-slate-400 placeholder-gray-400 transition-all duration-200 resize-none"
                    required
                  ></textarea>
                </motion.div>
                <motion.button
                  type="submit"
                  className="w-fit px-6 py-3 bg-[#9D4EDD] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg disabled:opacity-70"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1, ease: "linear" }}
                        className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                      />
                      <span>Sending...</span>
                    </div>
                  ) : (
                    "Send Message"
                  )}
                </motion.button>
              </form>
            </div>
          </motion.div>
          <motion.div
            ref={infoContainerRef}
            className="w-full md:w-1/2 p-6 sm:p-8 md:p-10 rounded-3xl"
            initial="hidden"
            animate={isInfoInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            <div className="space-y-12 sm:space-y-16">
              <div className="space-y-6">
                <motion.h2
                  className="text-xl sm:text-2xl lg:text-3xl font-bold text-[#9D4EDD] mb-6 sm:mb-8"
                  variants={itemVariants}
                >
                  Contact Information
                </motion.h2>
                <div className="space-y-12 text-gray-800">
                  <motion.div
                    className="flex items-center gap-3 text-base sm:text-lg"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <MapPin className="h-5 w-5 text-[#9D4EDD]" />
                    <span className="text-gray-400">Ancient Corinth, Greece.</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 text-base sm:text-lg"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <Phone className="h-5 w-5 text-[#9D4EDD]" />
                    <span className="text-gray-400">+30 6945004617</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-3 text-base sm:text-lg"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <Mail className="h-5 w-5 text-[#9D4EDD]" />
                    <span className="text-gray-400">dimosgkontevas1@gmail.com</span>
                  </motion.div>
                </div>
              </div>

              <motion.div className="space-y-8" variants={containerVariants}>
                <div className="flex gap-8">
                  <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                    <Link
                      href="https://www.instagram.com/gkontevas_/"
                      className="text-gray-400 transition-all duration-200"
                    >
                      <motion.div variants={socialVariants}>
                        <Instagram size={32} />
                      </motion.div>
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                    <Link href="https://github.com/gkontevas" className="text-gray-400 transition-all duration-200">
                      <motion.div variants={socialVariants}>
                        <Github size={32} />
                      </motion.div>
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                    <Link
                      href="https://www.linkedin.com/in/dimos-gkontevas-bb87a22b3/"
                      className="text-gray-400 transition-all duration-200"
                    >
                      <motion.div variants={socialVariants}>
                        <Linkedin size={32} />
                      </motion.div>
                    </Link>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default ContactForm


















