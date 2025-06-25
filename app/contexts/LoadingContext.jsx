"use client";
import React, { createContext, useContext, useState, useEffect } from 'react';

const LoadingContext = createContext();

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error('useLoading must be used within a LoadingProvider');
  }
  return context;
};

export const LoadingProvider = ({ children }) => {
  const [isGlobalLoading, setIsGlobalLoading] = useState(true);
  const [componentLoadingStates, setComponentLoadingStates] = useState({
    navbar: true,
    hero: true,
    about: true,
    projects: true,
    contact: true,
  });

  // Simulate network conditions and device performance
  const getLoadingDuration = (component) => {
    const baseDurations = {
      navbar: 300,
      hero: 800,
      about: 600,
      projects: 700,
      contact: 500,
    };

    // Minimal variance for faster loading
    const variance = Math.random() * 200;
    return baseDurations[component] + variance;
  };

  useEffect(() => {
    // Start loading timers for each component
    Object.keys(componentLoadingStates).forEach((component) => {
      const timer = setTimeout(() => {
        setComponentLoadingStates(prev => ({
          ...prev,
          [component]: false
        }));
      }, getLoadingDuration(component));

      return () => clearTimeout(timer);
    });

    // Set global loading to false when all components are loaded
    const globalTimer = setTimeout(() => {
      setIsGlobalLoading(false);
    }, Math.max(...Object.keys(componentLoadingStates).map(getLoadingDuration)) + 500);

    return () => clearTimeout(globalTimer);
  }, []);

  const setComponentLoading = (component, isLoading) => {
    setComponentLoadingStates(prev => ({
      ...prev,
      [component]: isLoading
    }));
  };

  const isComponentLoading = (component) => {
    return componentLoadingStates[component] || isGlobalLoading;
  };

  return (
    <LoadingContext.Provider value={{
      isGlobalLoading,
      setComponentLoading,
      isComponentLoading,
      componentLoadingStates,
    }}>
      {children}
    </LoadingContext.Provider>
  );
};

export default LoadingContext;
