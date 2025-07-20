import React, { useEffect, useRef, useState } from 'react';
import axios from '../axios';
import '../Styles/allproduct.css';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer/Footer';
import { RiListSettingsFill } from "react-icons/ri";
import { IoMdClose } from "react-icons/io";

const AllProduct = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [priceRange, setPriceRange] = useState([0, 100000]);
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [sortOrder, setSortOrder] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [filter, setfilter] = useState(false);

  const filterRef = useRef(null);
  const itemsPerPage = 8;

  const categories = ['All', 'Iphone', 'Laptop', 'Cameras', 'Earbuds', 'smartwatch', 'Headphones', 'Samsung'];
  const brands = ['Apple', 'Samsung', 'Canon', 'Sony', 'HP', 'Dell', 'Realme', 'Boat'];

  useEffect(() => {
    axios.get('/products/all')
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(console.error);
  }, []);

  useEffect(() => {
    let temp = [...products];

    if (selectedCategory !== 'All') {
      temp = temp.filter(p => p.category.toLowerCase() === selectedCategory.toLowerCase());
    }

    if (search.trim()) {
      temp = temp.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));
    }

    if (selectedBrands.length) {
      temp = temp.filter(p => selectedBrands.includes(p.brand));
    }

    temp = temp.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);

    if (sortOrder === 'asc') {
      temp.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'desc') {
      temp.sort((a, b) => b.price - a.price);
    }

    setFilteredProducts(temp);
    setCurrentPage(1);
  }, [search, selectedCategory, priceRange, selectedBrands, sortOrder, products]);

  useEffect(() => {
    if (filter) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [filter]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        filter &&
        filterRef.current &&
        !filterRef.current.contains(e.target) &&
        e.target.tagName !== 'INPUT'
      ) {
        setfilter(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [filter]);

  useEffect(() => {
  const handleClickOutside = (e) => {
    if (
      filter &&
      filterRef.current &&
      !filterRef.current.contains(e.target) &&
      e.target.tagName !== 'INPUT'
    ) {
      setfilter(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => document.removeEventListener('mousedown', handleClickOutside);
}, [filter]);

// ✅ Scroll to top when page changes
useEffect(() => {
  window.scrollTo(0, 0);
}, [currentPage]);


  const handleBrandToggle = brand => {
    setSelectedBrands(prev =>
      prev.includes(brand) ? prev.filter(b => b !== brand) : [...prev, brand]
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
        <h2>All Products</h2>
        <RiListSettingsFill className='filter_ic' onClick={() => setfilter(prev => !prev)} />

        <div className="filters-container">
          <div ref={filterRef} className={filter ? "filters showfilters" : "filters"}>
            <IoMdClose className='filter_close_btn' onClick={() => setfilter(false)} />

            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
            />

            <select onChange={e => setSortOrder(e.target.value)}>
              <option value="">Sort by</option>
              <option value="asc">Price: Low to High</option>
              <option value="desc">Price: High to Low</option>
            </select>

            <div className="price-range">
              <label>Price: ₹{priceRange[0]} - ₹{priceRange[1]}</label>
              <input
                type="range"
                min="0"
                max="100000"
                value={priceRange[1]}
                onChange={e => setPriceRange([0, +e.target.value])}
              />
            </div>

            <div className="category-filter">
              {categories.map(cat => (
                <button
                  key={cat}
                  className={cat === selectedCategory ? 'active' : ''}
                  onClick={() => setSelectedCategory(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="brand-filter">
              <h4>Brands</h4>
              {brands.map(brand => (
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
              paginatedProducts.map(product => (
                <Link
                  to={`/product/${product._id}`}
                  key={product._id}
                  className="product-card"
                >
                  <img src={product.image} alt={product.name} />
                  <div className="card-body">
                    <h4>{product.name}</h4>
                    <p>₹{product.price}</p>
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
                    className={currentPage === i + 1 ? 'active' : ''}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default AllProduct;
