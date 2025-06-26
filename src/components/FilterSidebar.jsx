import React, { useContext, useState, useEffect } from "react";
import { FilterSortContext } from "../context/FilterSortContext";
import PriceRangeSlider from "./PriceRangeSlider";

const MIN_PRICE = 0;

const FilterSidebar = ({ maxPrice }) => {
  const { filters, setFilters, categories } = useContext(FilterSortContext);
  const [openSection, setOpenSection] = useState("Price");
  const [categorySearch, setCategorySearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState(
    Array.isArray(filters.category)
      ? filters.category
      : filters.category === "All" ? [] : [filters.category]
  );
  const [price, setPrice] = useState([MIN_PRICE, maxPrice || 10000]);

  useEffect(() => {
    setSelectedCategories(
      Array.isArray(filters.category)
        ? filters.category
        : filters.category === "All" ? [] : [filters.category]
    );
    // Always default to [MIN_PRICE, maxPrice] if not set or out of bounds
    if (
      !filters.price ||
      filters.price[0] < MIN_PRICE ||
      !maxPrice ||
      filters.price[1] > maxPrice ||
      filters.price[0] > filters.price[1]
    ) {
      setPrice([MIN_PRICE, maxPrice || 10000]);
    } else {
      setPrice(filters.price);
    }
  }, [filters, maxPrice]);

  const handleCategoryCheck = (cat) => {
    setSelectedCategories((prev) =>
      prev.includes(cat) ? prev.filter((c) => c !== cat) : [...prev, cat]
    );
  };

  const handlePriceChange = (newPrice) => {
    setPrice(newPrice);
  };

  const handleApply = () => {
    setFilters({
      category: selectedCategories.length ? selectedCategories : "All",
      price,
    });
  };

  const filteredCategories = (categories || []).filter((cat) =>
    cat.toLowerCase().includes(categorySearch.toLowerCase())
  );

  return (
    <aside className="hidden md:flex w-72 h-full bg-[#f1f3f6] border-r border-gray-200">
      <div className="w-full flex flex-col h-full">
        <div className="bg-white px-6 py-4 border-b border-gray-200">
          <h2 className="font-bold text-[#2874f0] text-lg tracking-wide">Filters</h2>
        </div>
        <div className="flex-1 bg-white p-0 overflow-y-auto">
          {/* Accordion Section: Price */}
          <div className="border-b border-gray-200">
            <button
              className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-[#212121] focus:outline-none ${openSection === "Price" ? "bg-[#f1f3f6]" : "bg-white"}`}
              onClick={() => setOpenSection(openSection === "Price" ? null : "Price")}
            >
              Price
              <span className={`ml-2 transition-transform ${openSection === "Price" ? "rotate-90" : "rotate-0"}`}>▶</span>
            </button>
            {openSection === "Price" && (
              <div className="px-6 pb-4">
                <h3 className="font-semibold text-[#212121] mb-4">Price Range</h3>
                {maxPrice && maxPrice > 0 ? (
                  <PriceRangeSlider
                    minPrice={MIN_PRICE}
                    maxPrice={maxPrice}
                    value={price}
                    onChange={handlePriceChange}
                  />
                ) : (
                  <div className="text-gray-400 text-center py-4">Loading price range...</div>
                )}
              </div>
            )}
          </div>
          {/* Accordion Section: Category */}
          <div className="border-b border-gray-200">
            <button
              className={`w-full flex justify-between items-center px-6 py-4 font-semibold text-[#212121] focus:outline-none ${openSection === "Category" ? "bg-[#f1f3f6]" : "bg-white"}`}
              onClick={() => setOpenSection(openSection === "Category" ? null : "Category")}
            >
              Category
              <span className={`ml-2 transition-transform ${openSection === "Category" ? "rotate-90" : "rotate-0"}`}>▶</span>
            </button>
            {openSection === "Category" && (
              <div className="px-6 pb-4">
                <h3 className="font-semibold text-[#212121] mb-2">Category</h3>
                <input
                  type="text"
                  placeholder="Search Category"
                  value={categorySearch}
                  onChange={(e) => setCategorySearch(e.target.value)}
                  className="w-full mb-3 border border-gray-300 rounded px-2 py-1 text-[#212121] focus:border-[#2874f0] focus:ring-[#2874f0] bg-white"
                />
                <div className="flex flex-col gap-2">
                  {categories && categories.length === 0 && (
                    <span className="text-[#878787]">Loading categories...</span>
                  )}
                  {filteredCategories.map((cat) => (
                    <label key={cat} className="flex items-center gap-2 cursor-pointer text-[#212121]">
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(cat)}
                        onChange={() => handleCategoryCheck(cat)}
                        className="accent-[#2874f0]"
                      />
                      {cat}
                    </label>
                  ))}
                </div>
              </div>
            )}
          </div>
          <div className="px-6 py-4">
            <button
              className="w-full bg-[#ff5722] text-white py-2 rounded font-semibold text-lg hover:bg-[#e64a19] transition"
              onClick={handleApply}
            >
              Apply
            </button>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar; 