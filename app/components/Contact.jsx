"use client"

import { useState, useRef } from "react"
import Swal from "sweetalert2"
import Link from "next/link"
import { motion, useInView } from "framer-motion"
import { MapPin, Phone, Mail, Instagram, Github, Linkedin, Send } from 'lucide-react'

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
          background: "#121212",
          color: "#ffffff",
          confirmButtonColor: "#9D4EDD",
        })
        event.target.reset()
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        background: "#121212",
        color: "#ffffff",
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
    hover: { scale: 1.05, backgroundColor: "#7B2CBF", color: "#fff" },
    tap: { scale: 0.98 },
  }

  const socialVariants = {
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, color: "#9D4EDD" },
  }

  return (
    <div className="min-h-screen w-full mx-auto flex items-center justify-start bg-[#0A0A0A] py-4 px-0 sm:px-6 lg:px-8">
      <div className="w-full max-w-full xl:max-w-[1400px] 2xl:max-w-[1600px]">
      <div className="flex flex-col md:flex-row gap-4 md:gap-6 lg:gap-8 w-full justify-center items-center">
          {/* Contact Form */}
          <motion.div
            ref={formContainerRef}
            className="w-full min-w-[300px] md:w-1/2 bg-[#121212] rounded-none sm:rounded-2xl border-x-0 sm:border border-[#9D4EDD]/30 shadow-lg shadow-[#9D4EDD]/10 relative overflow-hidden"
            initial="hidden"
            animate={isFormInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-purple-900/20"></div>
            <div className="absolute -bottom-20 -left-20 w-40 h-40 rounded-full bg-purple-900/20"></div>
            
            <div className="p-6 md:p-8 lg:p-10 space-y-5 relative z-10">
              <motion.h2
                className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#9D4EDD] mb-4 text-center md:text-left"
                variants={itemVariants}
              >
                Contact Me
              </motion.h2>
              <form onSubmit={onSubmit} className="space-y-4 lg:space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <motion.div variants={formItemVariants}>
                    <input
                      type="text"
                      name="firstName"
                      placeholder="First Name"
                      className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#333333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent text-slate-300 placeholder-gray-500 transition-all duration-200"
                      required
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <input
                      type="text"
                      name="lastName"
                      placeholder="Last Name"
                      className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#333333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent text-slate-300 placeholder-gray-500 transition-all duration-200"
                      required
                    />
                  </motion.div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 lg:gap-6">
                  <motion.div variants={formItemVariants}>
                    <input
                      type="email"
                      name="email"
                      placeholder="E-mail"
                      className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#333333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent text-slate-300 placeholder-gray-500 transition-all duration-200"
                      required
                    />
                  </motion.div>
                  <motion.div variants={formItemVariants}>
                    <input
                      type="tel"
                      name="phone"
                      placeholder="Phone"
                      className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#333333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent text-slate-300 placeholder-gray-500 transition-all duration-200"
                      required
                    />
                  </motion.div>
                </div>
                <motion.div variants={formItemVariants}>
                  <textarea
                    name="message"
                    placeholder="Message"
                    rows={5}
                    className="w-full px-4 py-3 bg-[#1A1A1A] border border-[#333333] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-transparent text-slate-300 placeholder-gray-500 transition-all duration-200 resize-none"
                    required
                  ></textarea>
                </motion.div>
                <motion.div className="flex justify-center md:justify-start">
                  <motion.button
                    type="submit"
                    className="px-6 py-3 lg:px-8 lg:py-4 bg-gradient-to-r from-[#9D4EDD] to-[#7B2CBF] text-white rounded-xl font-semibold transition-all duration-200 shadow-lg disabled:opacity-70 flex items-center gap-2 text-base lg:text-lg"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                          className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-white border-t-transparent rounded-full"
                        />
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <span>Send Message</span>
                        <Send size={16} className="lg:w-5 lg:h-5" />
                      </>
                    )}
                  </motion.button>
                </motion.div>
              </form>
            </div>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            ref={infoContainerRef}
            className="w-full min-w-[300px] md:w-1/2 bg-[#121212] rounded-none sm:rounded-2xl border-x-0 sm:border border-[#9D4EDD]/30 shadow-lg shadow-[#9D4EDD]/10 relative overflow-hidden"
            initial="hidden"
            animate={isInfoInView ? "visible" : "hidden"}
            variants={containerVariants}
          >
            {/* Decorative elements */}
            <div className="absolute -top-20 -left-20 w-40 h-40 rounded-full bg-purple-900/20"></div>
            <div className="absolute -bottom-20 -right-20 w-40 h-40 rounded-full bg-purple-900/20"></div>
            
            <div className="p-6 md:p-8 lg:p-10 space-y-6 lg:space-y-10 relative z-10">
              <div className="space-y-5 lg:space-y-8">
                <motion.h2
                  className="text-2xl sm:text-3xl lg:text-4xl font-bold text-[#9D4EDD] mb-4 lg:mb-6 text-center md:text-left"
                  variants={itemVariants}
                >
                  Contact Information
                </motion.h2>
                <div className="space-y-5 lg:space-y-8 text-slate-300">
                  <motion.div
                    className="flex items-center gap-4 p-3 lg:p-4 rounded-xl hover:bg-[#1A1A1A] transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-purple-900/30">
                      <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-[#9D4EDD]" />
                    </div>
                    <span className="text-base lg:text-lg">Ancient Corinth, Greece</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-4 p-3 lg:p-4 rounded-xl hover:bg-[#1A1A1A] transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-purple-900/30">
                      <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-[#9D4EDD]" />
                    </div>
                    <span className="text-base lg:text-lg">+30 6945004617</span>
                  </motion.div>
                  <motion.div
                    className="flex items-center gap-4 p-3 lg:p-4 rounded-xl hover:bg-[#1A1A1A] transition-all duration-300"
                    variants={itemVariants}
                    whileHover={{ x: 5 }}
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 lg:w-12 lg:h-12 rounded-full bg-purple-900/30">
                      <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-[#9D4EDD]" />
                    </div>
                    <span className="break-all text-base lg:text-lg">dimosgkontevas1@gmail.com</span>
                  </motion.div>
                </div>
              </div>

              <motion.div className="space-y-4 lg:space-y-6" variants={containerVariants}>
                <motion.p
                  className="text-slate-400 font-medium text-center md:text-left text-base lg:text-lg"
                  variants={itemVariants}
                >
                  Connect with me
                </motion.p>
                <div className="flex justify-center md:justify-start gap-6 lg:gap-8">
                  <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                    <Link
                      href="https://www.instagram.com/gkontevas_/"
                      className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#1A1A1A] text-slate-300 hover:bg-purple-900/30 transition-all duration-300"
                    >
                      <motion.div variants={socialVariants}>
                        <Instagram size={24} className="lg:w-7 lg:h-7" />
                      </motion.div>
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                    <Link
                      href="https://github.com/gkontevas"
                      className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#1A1A1A] text-slate-300 hover:bg-purple-900/30 transition-all duration-300"
                    >
                      <motion.div variants={socialVariants}>
                        <Github size={24} className="lg:w-7 lg:h-7" />
                      </motion.div>
                    </Link>
                  </motion.div>

                  <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                    <Link
                      href="https://www.linkedin.com/in/dimos-gkontevas-bb87a22b3/"
                      className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#1A1A1A] text-slate-300 hover:bg-purple-900/30 transition-all duration-300"
                    >
                      <motion.div variants={socialVariants}>
                        <Linkedin size={24} className="lg:w-7 lg:h-7" />
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



























