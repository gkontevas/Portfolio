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
      navbar: 800,
      hero: 2000,
      about: 1500,
      projects: 1800,
      contact: 1600,
    };

    // Add random variance to simulate real-world conditions
    const variance = Math.random() * 500;
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
