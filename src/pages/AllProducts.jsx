import React, { useEffect, useRef, useState } from "react";
import axios from "../axios";
import "../Styles/allproduct.css";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";
import { RiListSettingsFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";
import { HiStar } from "react-icons/hi";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setfilter] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  

  const filterRef = useRef(null);
  const itemsPerPage = 10;
  
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const categories = [
    "All",
    "Iphone",
    "Laptop",
    "Cameras",
    "Earbuds",
    "smartwatch",
    "Headphones",
    "Samsung",
  ];
  const brands = [
    "Apple",
    "Samsung",
    "Canon",
    "Sony",
    "HP",
    "Dell",
    "Realme",
    "Boat",
  ];


  useEffect(() => {
    axios
      .get("/products/all")
      .then((res) => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (selectedCategory !== "All") {
      temp = temp.filter(
        (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (search.trim()) {
      temp = temp.filter((p) =>
        p.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (selectedBrands.length) {
      temp = temp.filter((p) => selectedBrands.includes(p.brand));
    }

    temp = temp.filter(
      (p) => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    if (sortOrder === "asc") {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOrder === "desc") {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [
    search,
    selectedCategory,
    priceRange,
    selectedBrands,
    sortOrder,
    products,
  ]);

  useEffect(() => {
    if (filter) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [filter]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filter &&
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        e.target.tagName !== "INPUT"
      ) {
        setfilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filter]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filter &&
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        e.target.tagName !== "INPUT"
      ) {
        setfilter(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [filter]);

  // ✅ Scroll to top when page changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const handleBrandToggle = (brand) => {
    setSelectedBrands((prev) =>
      prev.includes(brand) ? prev.filter((b) => b !== brand) : [...prev, brand]
    );
  };

  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredProducts.length / itemsPerPage);

  return (
    <>
      <div className="product-page light-theme">
      <span className="page_heading">Explore our products</span>
        <div className="page_title"><span>All Products</span></div>
       <div className="filter_btn">
       <RiListSettingsFill
          className="filter_ic"
        />
       <span onClick={() => setfilter((prev) => !prev)}>Filters</span>
         
       </div>

        <div className="filters-container">
          <div
            ref={filterRef}
            className={filter ? "filters showfilters" : "filters"}
          >
            <IoMdClose
              className="filter_close_btn"
              onClick={() => setfilter(false)}
            />

            <span className="filter_title">Filters</span>

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <select onChange={(e) => setSortOrder(e.target.value)}>
              <option value="">Sort by</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>

            <div className="price-range">
              <label>
                Price: ₹{priceRange[0]} - ₹{priceRange[1]}
              </label>
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([0, +e.target.value])}
              />
            </div>

            <div className="category-filter">
              {categories.map((cat) => (
                <button
                  key={cat}
                  className={cat === selectedCategory ? "active" : ""}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="brand-filter">
              <h4>Brands</h4>
              {brands.map((brand) => (
                <label key={brand}>
                  <input
                    type="checkbox"
                    checked={selectedBrands.includes(brand)}
                    onChange={() => handleBrandToggle(brand)}
                  />
                  {brand}
                </label>
              ))}
            </div>
          </div>

          <div className="product-grid">
            {paginatedProducts.length > 0 ? (
              paginatedProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="product-card"
                >
                  <div className="image_part">
                    <img src={product.images[0]} alt={product.name} />
                  </div>
                  <div className="card_bottom">
                    <div className="card-body">
                      <span className="rating">
                        <HiStar className="star" />
                        4.5
                      </span>
                     {!isMobile ? <>
                       <span className="p_name">
                        {product.name.length > 20
                          ? product.name.slice(0, 25)
                          : product.name}
                      </span>
                     </>:<>
                       <span className="p_name">
                        {product.name.length > 20
                          ? product.name.slice(0, 20)
                          : product.name}
                      </span>
                     </>}

                     {!isMobile &&  <span className="p_desc">
                        {product.description.length > 80
                          ? product.description.slice(0, 60) + "..."
                          : product.description}
                      </span>}

                      <div className="price_lable">
                        <span className="p_price">₹{product.price}</span>
                        <strike className="og_price">
                          ₹{product.price + 1000}
                        </strike>
                        <span className="discount">
                          {Math.floor(
                            (product.price / (product.price + 1000)) * 100
                          )}
                          % off
                        </span>
                      </div>
                    </div>
                    <button className="view_btn">View Product</button>
                  </div>
                </Link>
              ))
            ) : (
              <p className="no-products">No products found.</p>
            )}

            {totalPages > 1 && (
              <div className="pagination">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i + 1}
                    onClick={() => setCurrentPage(i + 1)}
                    className={currentPage === i + 1 ? "active" : ""}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
        {filter && <div className="overlay" onClick={() => setfilter(false)}></div>}

      </div>

      <Footer />
    </>
  );
};

export default AllProduct;
