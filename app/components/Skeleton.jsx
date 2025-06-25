import React from 'react';

const Skeleton = ({ className = "", variant = "default", ...props }) => {
  const baseClasses = "animate-pulse bg-gradient-to-r from-purple-900/20 via-purple-800/30 to-purple-900/20 rounded";
  
  const variants = {
    default: "h-4 w-full",
    text: "h-4 w-3/4",
    title: "h-8 w-1/2",
    hero: "h-12 w-full",
    image: "w-full h-64",
    avatar: "w-full aspect-square",
    button: "h-10 w-24",
    circle: "rounded-full w-2 h-2",
    card: "w-full h-80",
    nav: "h-6 w-20",
    paragraph: "h-6 w-full",
    spline: "w-full h-96",
  };

  return (
    <div 
      className={`${baseClasses} ${variants[variant]} ${className}`}
      {...props}
    />
  );
};

// Hero Section Skeleton - matches exact layout with circular 3D model on right
export const HeroSkeleton = () => (
  <section className="relative flex flex-col-reverse items-center w-full px-4 overflow-visible gap-y-0 sm:gap-y-4 min-h-auto sm:min-h-[90vh] justify-center sm:justify-between xl:flex-row xl:px-24 xl:h-[90vh] pt-32 pb-8 sm:pt-36 md:pt-40 sm:pb-12">
    {/* Text Content - Left Side */}
    <div className="z-40 flex flex-col items-center justify-center w-full text-center xl:items-start xl:text-left xl:w-1/2">
      {/* Main Title Skeleton - matches your gradient title structure */}
      <div className="mb-0 space-y-2">
        {/* "Welcome to" line */}
        <Skeleton className="h-8 w-48 sm:h-10 sm:w-56 md:h-12 md:w-64 lg:h-14 lg:w-72 mx-auto xl:mx-0" />
        {/* "The World Of Wonders" line */}
        <Skeleton className="h-12 w-80 sm:h-16 sm:w-96 md:h-20 md:w-[480px] lg:h-24 lg:w-[560px] mx-auto xl:mx-0" />
      </div>
      {/* Description Skeleton */}
      <div className="max-w-xl space-y-3 mt-4">
        <Skeleton className="h-5 w-full sm:h-6" />
        <Skeleton className="h-5 w-5/6 sm:h-6" />
        <Skeleton className="h-5 w-4/5 sm:h-6" />
      </div>
    </div>
    
    {/* 3D Circular Model - Right Side (hidden on mobile) */}
    <div className="items-center justify-center hidden w-full sm:flex xl:w-1/2 xl:h-full">
      <div className="relative w-full aspect-[4/3] sm:aspect-[16/9] md:aspect-[16/9] xl:aspect-auto xl:h-full max-h-[600px] sm:max-h-[700px] md:max-h-[800px] xl:max-h-full min-h-[300px] sm:min-h-[400px] md:min-h-[500px]">
        {/* Circular 3D Model Placeholder */}
        <div className="absolute inset-0 flex items-center justify-center">
          <Skeleton className="w-64 h-64 sm:w-80 sm:h-80 md:w-96 md:h-96 lg:w-[420px] lg:h-[420px] rounded-full" />
          {/* 3D loading indicator */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <Skeleton className="h-6 w-24 mx-auto mb-2" />
              <Skeleton className="h-4 w-20 mx-auto" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
);

// About Section Skeleton - matches exact layout  
export const AboutSkeleton = () => (
  <div className="flex flex-col items-center max-w-6xl gap-8 px-4 pt-4 pb-8 mx-auto md:items-start md:flex-row sm:pt-8 sm:pb-12 xl:gap-12">
    {/* Image Column */}
    <div className="flex justify-center w-full md:w-1/2">
      <div className="relative w-full max-w-[400px] md:max-w-[500px] lg:max-w-[600px]">
        <Skeleton className="w-full aspect-square rounded-lg" />
      </div>
    </div>
    
    {/* Text Content Column */}
    <div className="w-full text-center md:w-1/2 space-y-6">
      {/* Title */}
      <Skeleton className="h-12 w-48 mx-auto md:mx-0 sm:h-16 sm:w-56 md:h-20 md:w-64" />
      
      {/* Description */}
      <div className="space-y-3 mx-auto md:mx-0 max-w-[500px] md:max-w-none">
        <Skeleton className="h-4 w-full lg:h-5" />
        <Skeleton className="h-4 w-5/6 lg:h-5" />
        <Skeleton className="h-4 w-4/5 lg:h-5" />
        <Skeleton className="h-4 w-3/4 lg:h-5" />
      </div>
      
      {/* Divider */}
      <Skeleton className="h-1 w-full max-w-[500px] md:max-w-none mx-auto md:mx-0" />
      
      {/* Tab Buttons */}
      <div className="flex flex-col flex-wrap justify-center w-full max-w-xs gap-2 mx-auto mb-8 md:flex-row md:gap-4 md:max-w-none md:w-auto">
        <Skeleton className="h-10 w-full md:w-20 rounded-lg" />
        <Skeleton className="h-10 w-full md:w-24 rounded-lg" />
        <Skeleton className="h-10 w-full md:w-28 rounded-lg" />
      </div>
      
      {/* Tab Content */}
      <div className="space-y-3">
        {[...Array(5)].map((_, i) => (
          <div key={i} className="flex items-center gap-3">
            <Skeleton className="w-2 h-2 rounded-full flex-shrink-0" />
            <Skeleton className="h-4 w-32 flex-1" />
          </div>
        ))}
      </div>
    </div>
  </div>
);

// Projects Section Skeleton - matches exact layout
export const ProjectsSkeleton = () => (
  <section className="px-0">
    {/* Title */}
    <div className="relative mt-4 mb-16 text-center">
      <Skeleton className="h-10 w-20 mx-auto mb-2 sm:h-12 sm:w-24 md:h-16 md:w-32" />
      <Skeleton className="h-12 w-32 mx-auto sm:h-16 sm:w-40 md:h-20 md:w-48" />
    </div>
    
    {/* Desktop Marquee Skeleton */}
    <div className="hidden w-full py-4 sm:block mb-8">
      <div className="flex gap-6 overflow-hidden">
        {[...Array(4)].map((_, i) => (
          <div key={i} className="mx-6 w-[500px] md:w-[650px] flex-shrink-0">
            <div className="space-y-4">
              <Skeleton className="w-full h-64 md:h-80 rounded-xl" />
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
            </div>
          </div>
        ))}
      </div>
    </div>
    
    {/* Mobile Cards Skeleton */}
    <div className="flex flex-col items-center justify-center gap-7 sm:hidden">
      {[...Array(3)].map((_, i) => (
        <div key={i} className="w-[90vw] max-w-[430px]">
          <div className="space-y-4">
            <Skeleton className="w-full h-64 rounded-xl" />
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  </section>
);

// Contact Section Skeleton - matches exact two identical-sized boxes layout
export const ContactSkeleton = () => (
  <div className="flex items-center justify-center w-full min-h-screen px-4 py-4 mx-auto sm:px-6 lg:px-8">
    <div className="w-full max-w-full xl:max-w-[1400px] 2xl:max-w-[1600px]">
      <div className="flex flex-col items-stretch w-full gap-6 md:flex-row lg:gap-8">
        
        {/* Left Box - Contact Form */}
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex-1 bg-[#18122B] rounded-2xl border-x-0 sm:border border-[#3C096C]/40 shadow-lg shadow-[#9D4EDD]/10 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute w-40 h-40 rounded-full -top-20 -right-20 bg-purple-900/20"></div>
            <div className="absolute w-40 h-40 rounded-full -bottom-20 -left-20 bg-purple-900/20"></div>
            
            <div className="relative z-10 flex flex-col h-full p-6 space-y-5 md:p-8 lg:p-10">
              {/* Title */}
              <div className="relative mb-6">
                <Skeleton className="h-8 w-32 mx-auto md:mx-0 mb-2 sm:h-10 sm:w-40 lg:h-12 lg:w-48" />
                <Skeleton className="h-10 w-20 mx-auto md:mx-0 sm:h-12 sm:w-24 lg:h-14 lg:w-28" />
              </div>
              
              {/* Form Fields */}
              <div className="flex flex-col flex-1 space-y-4 lg:space-y-6">
                {/* First and Last Name */}
                <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:gap-6 sm:px-0">
                  <Skeleton className="h-12 w-full lg:h-16 rounded-xl" />
                  <Skeleton className="h-12 w-full lg:h-16 rounded-xl" />
                </div>
                {/* Email and Phone */}
                <div className="grid grid-cols-1 gap-4 px-2 sm:grid-cols-2 lg:gap-6 sm:px-0">
                  <Skeleton className="h-12 w-full lg:h-16 rounded-xl" />
                  <Skeleton className="h-12 w-full lg:h-16 rounded-xl" />
                </div>
                {/* Message */}
                <Skeleton className="h-32 w-full min-h-[150px] rounded-xl flex-1" />
                {/* Submit Button */}
                <Skeleton className="h-12 w-full lg:h-16 rounded-xl" />
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Box - Contact Information (identical size) */}
        <div className="flex flex-col w-full md:w-1/2">
          <div className="flex-1 bg-gradient-to-br from-[#9D4EDD]/80 via-[#7B2CBF]/80 to-[#3C096C]/90 rounded-2xl border-x-0 sm:border border-[#9D4EDD]/30 shadow-lg shadow-[#9D4EDD]/10 relative overflow-hidden">
            {/* Background decorations */}
            <div className="absolute w-40 h-40 rounded-full -top-20 -left-20 bg-purple-900/20"></div>
            <div className="absolute w-40 h-40 rounded-full -bottom-20 -right-20 bg-purple-900/20"></div>
            
            <div className="relative z-10 flex flex-col h-full p-6 space-y-6 md:p-8 lg:p-10 lg:space-y-10">
              {/* Title */}
              <Skeleton className="h-8 w-48 mb-4 sm:h-10 sm:w-56 lg:h-12 lg:w-64 lg:mb-6" />
              
              {/* Contact Info Items */}
              <div className="space-y-5 lg:space-y-8">
                {[...Array(3)].map((_, i) => (
                  <div key={i} className="flex items-center gap-4 p-3 lg:p-4 rounded-xl">
                    <Skeleton className="w-10 h-10 lg:w-12 lg:h-12 rounded-full flex-shrink-0" />
                    <Skeleton className="h-5 w-40 lg:h-6 lg:w-48" />
                  </div>
                ))}
              </div>
              
              {/* Social Media Icons */}
              <div className="flex justify-center gap-4 mt-auto">
                {[...Array(3)].map((_, i) => (
                  <Skeleton key={i} className="w-12 h-12 lg:w-14 lg:h-14 rounded-full" />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

// Navbar Skeleton - matches exact layout
export const NavbarSkeleton = () => (
  <div className="flex items-center justify-between px-6 py-3">
    {/* Logo */}
    <Skeleton className="h-6 w-32" />
    
    {/* Navigation Links - Desktop */}
    <div className="items-center hidden space-x-6 md:flex">
      <Skeleton className="h-6 w-16" />
      <Skeleton className="h-6 w-20" />
      <Skeleton className="h-6 w-18" />
    </div>
    
    {/* Mobile Menu Button */}
    <div className="md:hidden">
      <Skeleton className="h-6 w-6" />
    </div>
  </div>
);

export default Skeleton;
