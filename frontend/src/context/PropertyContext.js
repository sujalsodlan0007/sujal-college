"use client";

import { createContext, useContext, useState } from "react";

const PropertyContext = createContext();

export const PropertyProvider = ({ children }) => {
  const [filters, setFilters] = useState({
    location: "",
    minBudget: "",
    maxBudget: "",
    bedrooms: "",
    propertyType: "all",
  });

  const [viewMode, setViewMode] = useState("grid"); // grid or list or map

  const updateFilters = (newFilters) => {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  };

  const clearFilters = () => {
    setFilters({
      location: "",
      minBudget: "",
      maxBudget: "",
      bedrooms: "",
      propertyType: "all",
    });
  };

  return (
    <PropertyContext.Provider 
      value={{ 
        filters, 
        updateFilters, 
        clearFilters, 
        viewMode, 
        setViewMode 
      }}
    >
      {children}
    </PropertyContext.Provider>
  );
};

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error("useProperty must be used within a PropertyProvider");
  }
  return context;
};
