import { useEffect, useState, useCallback } from "react";
import FilterSidebar from "../components/FilterSidebar";
import SortBar from "../components/SortBar";
import ProductGrid from "../components/ProductGrid";
import Pagination from "../components/Pagination";
import { FilterSortProvider } from "../context/FilterSortContext";
import MobileSortFilterBar from "../components/MobileSortFilterBar";
import { useSearchParams } from "react-router-dom";

const PRODUCTS_PER_PAGE = 10;
const MAX_PRICE = 89999;
const TOTAL_PAGES=10;

const parseParams = (params) => {
  let categoryParam = params.get("category") || "All";
  let category;
  if (categoryParam.includes(",")) {
    category = categoryParam.split(",");
  } else {
    category = categoryParam === "All" ? "All" : [categoryParam];
  }
  return {
    category,
    price: [
      Number(params.get("minPrice") || 0),
      Number(params.get("maxPrice") || MAX_PRICE),
    ],
    sort: params.get("sort") || "popularity",
    page: Number(params.get("page") || 1),
  };
};

const Home = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [totalPages, setTotalPages] = useState(TOTAL_PAGES);
  const [categories, setCategories] = useState([]);

  // Parse filter/sort/page from URL
  const { category, price, sort, page } = parseParams(searchParams);

  // Update URL when filter/sort/page changes
  const updateParams = useCallback(
    (updates) => {
      const newParams = new URLSearchParams(searchParams);
      Object.entries(updates).forEach(([key, value]) => {
        if (value === undefined || value === null) return;
        if (Array.isArray(value)) {
          if (key === "price") {
            newParams.set("minPrice", value[0]);
            newParams.set("maxPrice", value[1]);
          } else if (key === "category") {
            newParams.set("category", value.length ? value.join(",") : "All");
          }
        } else {
          newParams.set(key, value);
        }
      });
      setSearchParams(newParams, { replace: true });
    },
    [searchParams, setSearchParams]
  );

  // Handlers for context
  const setFilters = (filters) => {
    updateParams({
      category: filters.category,
      price: filters.price,
      page: 1, // reset page on filter change
    });
  };
  const setSort = (sortValue) => {
    updateParams({ sort: sortValue, page: 1 });
  };
  const setPage = (pageValue) => {
    updateParams({ page: pageValue });
  };

  // Provide filter/sort state and setters to context
  const filterSortContextValue = {
    filters: { category, price },
    setFilters,
    sort,
    setSort,
    categories,
    setCategories,
  };

  // Reset to page 1 if totalPages changes and current page is out of range
  useEffect(() => {
    if (page > totalPages) setPage(1);
    // eslint-disable-next-line
  }, [totalPages]);

  return (
    <FilterSortProvider value={filterSortContextValue}>
      <div className="min-h-screen bg-gray-50">
        <div className="flex mx-auto pt-2">
          {/* Only show sidebar on md+ */}
          <div className="hidden md:flex">
            <FilterSidebar maxPrice={MAX_PRICE} />
          </div>
          <main className="flex-1 px-2 md:px-6">
            {/* Only show MobileSortFilterBar (and thus MobileFilterPopup) on mobile */}
            <div className="mb-2 md:hidden">
              <MobileSortFilterBar maxPrice={MAX_PRICE} />
            </div>
            <SortBar />
            <ProductGrid
              currentPage={page}
              productsPerPage={PRODUCTS_PER_PAGE}
              onTotalPages={setTotalPages}
              setCategories={setCategories}
              defaultTotalPages={totalPages}
            />
            <Pagination
              currentPage={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </main>
        </div>
      </div>
    </FilterSortProvider>
  );
};

export default Home;
