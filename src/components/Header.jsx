import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import axios from "../axios";
import "../Styles/Header.css";
import categories from "../components/HomeComp/CatgoriesSlider/categories";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsCart4, BsFillPersonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";

const Header = () => {
  const { token, name } = useSelector((state) => state.user);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openDropdown, setOpenDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const dropdownRef = useRef();
  const searchDropdownRef = useRef();

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    axios
      .get("/products/all")
      .then((res) => setProducts(res.data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setOpenDropdown(false);
      }
      if (
        searchDropdownRef.current &&
        !searchDropdownRef.current.contains(e.target)
      ) {
        setShowSearchDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearchChange = (e) => {
    const text = e.target.value;
    setSearchText(text);
    if (text.trim() === "") {
      setFilteredProducts([]);
      setShowSearchDropdown(false);
      return;
    }
    const filtered = products.filter((p) =>
      p.name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredProducts(filtered);
    setShowSearchDropdown(true);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <>
      <header className="site-header">
        <div className="header-left">
          {isMobile && (
            <>
            {drawerOpen ?   <button onClick={() => setDrawerOpen(false)} className="hamburger">
              <IoCloseSharp /> 
            </button> :<button className="hamburger" onClick={() => setDrawerOpen(true)}>
              <GiHamburgerMenu className="drawer_btn"/>
            </button>}
              
            </>
          )}
          <Link to="/" className="logo">
            E‑Shop
          </Link>
        </div>

        {!isMobile && (
          <nav className="main-nav">
            <Link className="nav-link" to="/">
              Home
            </Link>

            <div className="dropdown" ref={dropdownRef}>
              <button
                className="dropbtn"
                onClick={() => setOpenDropdown((prev) => !prev)}
              >
                All Categories ▾
              </button>
              <div
                className={
                  openDropdown
                    ? "dropdown-content dropdown_show"
                    : "dropdown-content"
                }
              >
                {categories.map((cat) => (
                  <Link
                    key={cat.name}
                    to={`/category/${cat.name.toLowerCase()}`}
                    className="dropdown-item"
                    onClick={() => setOpenDropdown(false)}
                  >
                    <div className="d_item_img">
                      <img src={cat.image} alt={cat.name} />
                    </div>
                    <span>{cat.name}</span>
                  </Link>
                ))}
              </div>
            </div>

            <Link className="nav-link" to="/allproduct">
              Products
            </Link>
          </nav>
        )}
        <div className="search-bar" ref={searchDropdownRef}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchText}
            onChange={handleSearchChange}
          />
          <button>
            <HiMagnifyingGlass />
          </button>

          {showSearchDropdown && filteredProducts.length > 0 && (
            <div className="search-dropdown show_sd">
              {filteredProducts.map((product) => (
                <Link
                  to={`/product/${product._id}`}
                  className="dropdown-item"
                  key={product._id}
                  onClick={() => {
                    setShowSearchDropdown(false);
                    setSearchText("");
                  }}
                >
                  <div className="d_item_img">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <span>{product.name}</span>
                </Link>
              ))}
            </div>
          )}
        </div>
        <div className="profile_options">
          {isMobile && (
            <button className="search-icon">
              <HiMagnifyingGlass />
            </button>
          )}

          <Link to="/cart" className="nav-link">
            <BsCart4 className="ic" />
            <span className="cart-badge">{cartCount}</span>
          </Link>

          {token ? (
           <>
            {!isMobile ?  <Link to="/profile" className="nav-link">
              <BsFillPersonFill className="ic" />
              {name ? name.split(" ")[0] : "User"}
            </Link>: <Link to="/profile" className="nav-link">
              <BsFillPersonFill className="ic" />
            </Link>}
           </>
          ) : (
            !isMobile && (
              <>
                <Link to="/login" className="nav-link">
                  Login
                </Link>
                <Link to="/register" className="nav-link">
                  Register
                </Link>
              </>
            )
          )}
        </div>
      </header>

      {/* Mobile Sidebar Drawer */}
      {isMobile &&(
        <div className={drawerOpen ? "mobile-drawer show_drawer":"mobile-drawer"}>
        <div className="drawer_links">
           <Link className="nav-link" to="/" onClick={() => setDrawerOpen(false)}>
              Home
            </Link>
            <Link className="nav-link" to="/allproduct" onClick={() => setDrawerOpen(false)}>
              Products
            </Link>
        </div>
          <div className="drawer-header">
            <h3>All Categories</h3>
          </div>
          <div className="drawer-content">
            {categories.map((cat) => (
              <Link
                key={cat.name}
                to={`/category/${cat.name.toLowerCase()}`}
                className="drawer-item"
                onClick={() => setDrawerOpen(false)}
              >
                <div className="d_item_img">
                  <img src={cat.image} alt={cat.name} />
                </div>
                <span>{cat.name}</span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
