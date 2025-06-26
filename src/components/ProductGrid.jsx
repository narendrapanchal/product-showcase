import { useEffect, useState, useContext } from "react";
import { FilterSortContext } from "../context/FilterSortContext";
import { Link } from "react-router-dom";
import Loader from './Loader';

const getRating = (product) => product.rating?.rate || 0;

const ProductCard = ({ product }) => (
  <div className="bg-white rounded-lg shadow hover:shadow-lg p-4 flex flex-col">
    <img src={product.image} alt={product.title} className="h-40 object-contain mb-2 mx-auto" />
    <h3 className="font-semibold text-gray-800 text-sm mb-1 line-clamp-2">{product.title}</h3>
    <div className="flex items-center mb-1">
      <span className="text-blue-600 font-bold text-lg mr-2">₹{Math.round(product.price * 80)}</span>
      <span className="text-xs text-gray-500">({getRating(product)}★)</span>
    </div>
    <Link to={`/product/${product.id}`} className="mt-auto">
      <button className="w-full bg-blue-600 text-white py-1 rounded hover:bg-blue-700 transition">View Details</button>
    </Link>
  </div>
);

const ProductGrid = ({ currentPage = 1, productsPerPage = 10  , onTotalPages, setCategories, setMaxProductPrice, defaultTotalPages }) => {
  const { filters, sort } = useContext(FilterSortContext);
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch("https://fakestoreapi.com/products")
      .then((res) => res.json())
      .then((data) => {
        setProducts(data);
        setLoading(false);
        // Extract unique categories and update context
        if (setCategories) {
          const unique = Array.from(new Set(data.map((p) => p.category)));
          setCategories(unique);
        }
        // Find max price in INR
        if (setMaxProductPrice) {
          const maxPrice = Math.max(...data.map((p) => Math.round(p.price * 80)));
          setMaxProductPrice(maxPrice);
        }
      })
      .catch(() => {
        setError("Failed to load products");
        setLoading(false);
      });
  }, [setCategories, setMaxProductPrice]);

  // Filtering
  let filtered = products.filter((p) => {
    let inCategory = true;
    if (Array.isArray(filters.category)) {
      inCategory = filters.category.length === 0 || filters.category.includes(p.category);
    } else {
      inCategory =
        filters.category === "All" ||
        p.category.toLowerCase().includes(filters.category.toLowerCase());
    }
    const inPrice =
      p.price * 80 >= filters.price[0] && p.price * 80 <= filters.price[1];
    return inCategory && inPrice;
  });

  // Sorting
  if (sort === "price_low") {
    filtered = filtered.sort((a, b) => a.price - b.price);
  } else if (sort === "price_high") {
    filtered = filtered.sort((a, b) => b.price - a.price);
  } else if (sort === "popularity") {
    filtered = filtered.sort((a, b) => getRating(b) - getRating(a));
  } else if (sort === "name") {
    filtered = filtered.sort((a, b) => a.title.localeCompare(b.title));
  }

  // Pagination
  const totalPages = Math.ceil(filtered.length / productsPerPage) || defaultTotalPages;
  const start = (currentPage - 1) * productsPerPage;
  const paginated = filtered.slice(start, start + productsPerPage);

  // Inform parent of totalPages if callback provided
  useEffect(() => {
    if (onTotalPages) onTotalPages(totalPages);
    // eslint-disable-next-line
  }, [totalPages]);

  if (loading) return <Loader text="Loading products..." />;
  if (error) return <div className="text-center text-red-500 py-10">{error}</div>;
  if (!paginated.length) return <div className="text-center py-10">No products found.</div>;

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
      {paginated.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default ProductGrid; 