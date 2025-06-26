import React, { createContext, useState } from "react";

export const FilterSortContext = createContext();

export const FilterSortProvider = ({ children, value }) => {
  // If value is provided (from Home), use it; else fallback to internal state (for backward compatibility)
  const [filters, setFilters] = useState({ category: "All", price: [0, 89999] });
  const [sort, setSort] = useState("");
  const [categories, setCategories] = useState([]);

  const contextValue = value || { filters, setFilters, sort, setSort, categories, setCategories };

  return (
    <FilterSortContext.Provider value={contextValue}>
      {children}
    </FilterSortContext.Provider>
  );
};