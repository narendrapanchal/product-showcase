import { useContext } from "react";
import { FilterSortContext } from "../context/FilterSortContext";

const sortOptions = [
  { value: "popularity", label: "Popularity" },
  { value: "price_low", label: "Price -- Low to High" },
  { value: "price_high", label: "Price -- High to Low" },
  { value: "name", label: "Name" },
];

const SortBar = () => {
  const { sort, setSort } = useContext(FilterSortContext);

  return (
    <div className="items-center justify-between px-4 py-2 bg-white shadow mb-4 hidden md:flex">
      <span className="font-medium text-gray-700">Sort by:</span>
      <div className="space-x-2">
        { sortOptions.map((opt) => (
          <button
            key={opt.value}
            className={`px-3 py-1 rounded-full border ${sort === opt.value ? "bg-blue-600 text-white border-blue-600" : "bg-white text-gray-700 border-gray-300"}`}
            onClick={() => setSort(opt.value)}
          >
            {opt.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SortBar; 