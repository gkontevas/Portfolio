"use client"
import React, { useState, useEffect, useMemo } from "react";
import { useIsMobileOrSlow } from "../hooks/useIsMobileOrSlow";
import { motion } from "framer-motion";
import Swal from "sweetalert2";
import Link from "next/link";
import { MapPin, Phone, Mail, Instagram, Github, Linkedin, Send } from 'lucide-react';
import emailjs from "@emailjs/browser";
import { ContactSkeleton } from "./Skeleton";
import { useLoading } from "../contexts/LoadingContext";

const ContactForm = React.memo(() => {
  const ANIMATION_CONFIG = useMemo(() => ({
    section: (isMobile) => ({
      initial: { opacity: 0, y: isMobile ? 0 : 20 },
      animate: { opacity: 1, y: 0 },
      transition: { duration: isMobile ? 0.3 : 0.7, ease: "easeOut" },
    }),
  }), []);

  const inputActiveClass = "bg-[#240046]/40 border-[#9D4EDD] ring-2 ring-[#9D4EDD]";
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { isComponentLoading } = useLoading();
  const isLoading = isComponentLoading('contact');
  const [isMobileOrSlow, hasCheckedDevice] = useIsMobileOrSlow();

  const containerVariants = useMemo(() => ({
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.1,
      },
    },
  }), []);
  const itemVariants = useMemo(() => ({
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }), []);
  const formItemVariants = useMemo(() => ({
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 },
    },
  }), []);
  const buttonVariants = useMemo(() => ({
    initial: { scale: 1 },
    hover: { scale: 1.05, backgroundColor: "#7B2CBF", color: "#fff" },
    tap: { scale: 0.98 },
  }), []);
  const socialVariants = useMemo(() => ({
    initial: { scale: 1, rotate: 0 },
    hover: { scale: 1.2, rotate: 5, color: "#9D4EDD" },
  }), []);

  if (isLoading || !hasCheckedDevice) {
    return <ContactSkeleton />;
  }
  function handleInput(e) {
    e.target.classList.add(...inputActiveClass.split(" "))
  }
  function handleBlur(e) {
    e.target.classList.remove(...inputActiveClass.split(" "))
  }
  async function onSubmit(event) {
    event.preventDefault();
    setIsSubmitting(true);    try {
      const result = await emailjs.sendForm(
        "service_mk22466",
        "template_kzhrp2r",
        event.target,
        "ZZaukPWHcZirnSjgv"
      );
      if (result.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Message sent successfully!",
          icon: "success",
          background: "#121212",
          color: "#ffffff",
          confirmButtonColor: "#9D4EDD",
        });
        event.target.reset();
      } else {
        throw new Error("Failed to send message");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "Something went wrong. Please try again.",
        icon: "error",
        background: "#121212",
        color: "#ffffff",
        confirmButtonColor: "#9D4EDD",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <div className="flex items-center justify-center w-full min-h-screen px-4 py-4 mx-auto sm:px-6 lg:px-8" aria-label="Contact">
      <div className="w-full max-w-full xl:max-w-[1400px] 2xl:max-w-[1600px]">
        <div className="flex flex-col items-stretch w-full gap-6 md:flex-row lg:gap-8">
          <motion.div
            className="flex flex-col w-full md:w-1/2"
            {...ANIMATION_CONFIG.section(isMobileOrSlow)}
          >
            <div className="flex-1 bg-[#18122B] rounded-2xl border-x-0 sm:border border-[#3C096C]/40 shadow-lg shadow-[#9D4EDD]/10 relative overflow-hidden">
              <div className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-purple-900/20"></div>
              <div className="absolute w-40 h-40 rounded-full -bottom-20 -left-20 bg-purple-900/20"></div>
              <div className="relative z-10 flex flex-col h-full p-6 space-y-5 md:p-8 lg:p-10">
                <motion.div
                  className="relative mb-6"
                  variants={itemVariants}
                >
                  <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-center md:text-left tracking-tight">
                    <span className="block text-transparent bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text drop-shadow-[0_4px_24px_rgba(168,85,247,0.4)]">
                      Contact
                    </span>
                    <span className="block text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-500 to-indigo-500 bg-clip-text text-3xl sm:text-4xl lg:text-5xl font-black tracking-wider drop-shadow-xl -mt-1">
                      Me
                    </span>
                    <span className="absolute font-black -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none left-1/2 top-1/2 opacity-15 blur-2xl text-4xl sm:text-5xl lg:text-6xl text-fuchsia-400">
                      📧
                    </span>
                  </h2>
                </motion.div>
                <form onSubmit={onSubmit} className="flex flex-col flex-1 space-y-4 lg:space-y-6">
                  <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:gap-6 sm:px-0">
                    <motion.div variants={formItemVariants}>
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#3C096C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-[#9D4EDD] text-slate-300 placeholder-gray-500 transition-all duration-200"
                        required
                        onInput={handleInput}
                        onBlur={handleBlur}
                      />
                    </motion.div>
                    <motion.div variants={formItemVariants}>
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#3C096C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-[#9D4EDD] text-slate-300 placeholder-gray-500 transition-all duration-200"
                        required
                        onInput={handleInput}
                        onBlur={handleBlur}
                      />
                    </motion.div>
                  </div>
                  <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:gap-6 sm:px-0">
                    <motion.div variants={formItemVariants}>
                      <input
                        type="email"
                        name="email"
                        placeholder="E-mail"
                        className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#3C096C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-[#9D4EDD] text-slate-300 placeholder-gray-500 transition-all duration-200"
                        required
                        onInput={handleInput}
                        onBlur={handleBlur}
                      />
                    </motion.div>
                    <motion.div variants={formItemVariants}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Phone"
                        className="w-full px-4 py-3 lg:py-4 bg-[#1A1A1A] border border-[#3C096C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-[#9D4EDD] text-slate-300 placeholder-gray-500 transition-all duration-200"
                        required
                        onInput={handleInput}
                        onBlur={handleBlur}
                      />
                    </motion.div>
                  </div>
                  <motion.div variants={formItemVariants} className="flex-1">
                    <textarea
                      name="message"
                      placeholder="Message"
                      rows={5}
                      className="w-full h-full min-h-[150px] px-4 py-3 bg-[#1A1A1A] border border-[#3C096C] rounded-xl focus:outline-none focus:ring-2 focus:ring-[#9D4EDD] focus:border-[#9D4EDD] text-slate-300 placeholder-gray-500 transition-all duration-200 resize-none"
                      required
                      onInput={handleInput}
                      onBlur={handleBlur}
                    ></textarea>
                  </motion.div>
                  <motion.div className="flex justify-center mt-auto md:justify-start">
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
                            className="w-5 h-5 border-2 border-white rounded-full lg:w-6 lg:h-6 border-t-transparent"
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
            </div>
          </motion.div>
          <motion.div
            className="flex flex-col w-full md:w-1/2"
            {...ANIMATION_CONFIG.section(isMobileOrSlow)}
          >
            <div className="flex-1 bg-gradient-to-br from-[#9D4EDD]/80 via-[#7B2CBF]/80 to-[#3C096C]/90 rounded-2xl border-x-0 sm:border border-[#9D4EDD]/30 shadow-lg shadow-[#9D4EDD]/10 relative overflow-hidden">
              <div className="absolute w-40 h-40 rounded-full -top-20 -left-20 bg-purple-900/20"></div>
              <div className="absolute w-40 h-40 rounded-full -bottom-20 -right-20 bg-purple-900/20"></div>
              <div className="relative z-10 flex flex-col h-full p-6 space-y-6 md:p-8 lg:p-10 lg:space-y-10">
                <div className="space-y-5 lg:space-y-8">
                  <motion.h2
                    className="mb-4 text-2xl font-bold text-center text-white sm:text-3xl lg:text-4xl lg:mb-6 md:text-left"
                    variants={itemVariants}
                  >
                    Contact Information
                  </motion.h2>
                  <div className="space-y-5 lg:space-y-8 text-slate-200">
                    <motion.div
                      className="flex items-center gap-4 p-3 lg:p-4 rounded-xl hover:bg-[#1A1A1A]/40 transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full lg:w-12 lg:h-12 bg-purple-900/30">
                        <MapPin className="h-5 w-5 lg:h-6 lg:w-6 text-[#E0AAFF]" />
                      </div>
                      <span className="text-base lg:text-lg">Ancient Corinth, Greece</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4 p-3 lg:p-4 rounded-xl hover:bg-[#1A1A1A]/40 transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full lg:w-12 lg:h-12 bg-purple-900/30">
                        <Phone className="h-5 w-5 lg:h-6 lg:w-6 text-[#E0AAFF]" />
                      </div>
                      <span className="text-base lg:text-lg">+30 6945004617</span>
                    </motion.div>
                    <motion.div
                      className="flex items-center gap-4 p-3 lg:p-4 rounded-xl hover:bg-[#1A1A1A]/40 transition-all duration-300"
                      variants={itemVariants}
                      whileHover={{ x: 5 }}
                    >
                      <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full lg:w-12 lg:h-12 bg-purple-900/30">
                        <Mail className="h-5 w-5 lg:h-6 lg:w-6 text-[#E0AAFF]" />
                      </div>
                      <span className="flex-1 min-w-0 text-base sm:text-lg lg:text-xl">
                        dimosgkontevas1<wbr /> @gmail.com
                      </span>
                    </motion.div>
                  </div>
                </div>
                <motion.div className="mt-auto space-y-4 lg:space-y-6" variants={containerVariants}>
                  <motion.p
                    className="text-base font-medium text-center text-slate-200 md:text-left lg:text-lg"
                    variants={itemVariants}
                  >
                    Connect with me
                  </motion.p>
                  <div className="flex justify-center gap-6 md:justify-start lg:gap-8">
                    <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                      <Link
                        href="https://www.instagram.com/gkontevas_/"
                        className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#1A1A1A]/60 text-slate-200 hover:bg-purple-900/40 transition-all duration-300"
                      >
                        <motion.div variants={socialVariants}>
                          <Instagram size={24} className="lg:w-7 lg:h-7" />
                        </motion.div>
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                      <Link
                        href="https://github.com/gkontevas"
                        className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#1A1A1A]/60 text-slate-200 hover:bg-purple-900/40 transition-all duration-300"
                      >
                        <motion.div variants={socialVariants}>
                          <Github size={24} className="lg:w-7 lg:h-7" />
                        </motion.div>
                      </Link>
                    </motion.div>
                    <motion.div variants={itemVariants} whileHover="hover" initial="initial">
                      <Link
                        href="https://www.linkedin.com/in/dimos-gkontevas-bb87a22b3/"
                        className="flex items-center justify-center w-12 h-12 lg:w-14 lg:h-14 rounded-full bg-[#1A1A1A]/60 text-slate-200 hover:bg-purple-900/40 transition-all duration-300"
                      >
                        <motion.div variants={socialVariants}>
                          <Linkedin size={24} className="lg:w-7 lg:h-7" />
                        </motion.div>
                      </Link>
                    </motion.div>
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
});
export default ContactForm