import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout } from "../redux/userSlice";
import axios from "../axios";
import "../Styles/Header.css";
import categories from "../components/HomeComp/CatgoriesSlider/categories";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { BsCart4, BsFillPersonFill } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoCloseSharp } from "react-icons/io5";
import AuthModal from "./AuthModal";
import { IoMdClose } from "react-icons/io";
import { MdKeyboardArrowRight } from "react-icons/md";
import { GoPlus } from "react-icons/go";
import { LuMinus } from "react-icons/lu";
import { HiArrowLeft } from "react-icons/hi";


const Header = () => {
  const { token, name } = useSelector((state) => state.user);
  const cartCount = useSelector((state) => state.cart?.items?.length || 0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const [openDropdown, setOpenDropdown] = useState(false);
  const [products, setProducts] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [showSearchDropdown, setShowSearchDropdown] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const [fullCateg, setfullCateg] = useState(false);

  const dropdownRef = useRef();
  const searchDropdownRef = useRef();
  const searchInputRef = useRef(null);


  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
  if (showMobileSearch && isMobile) {
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100); // slight delay helps in some mobile browsers
  }
}, [showMobileSearch, isMobile]);


  useEffect(() => {
    if (showMobileSearch || drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [showMobileSearch, drawerOpen]);

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

  const Profilebtn = () => {
    setShowAuth(true);
    setDrawerOpen(false);
  };
  return (
    <>
      <header className="site-header">
        <div className="header-left">
        {isMobile && location.pathname === "/" ? (
    <button
      className="hamburger"
      onClick={() => setDrawerOpen((prev) => !prev)}
    >
      <GiHamburgerMenu className="drawer_btn" />
    </button>
  ) : (
    isMobile && (
      <button className="hamburger" onClick={() => navigate(-1)}>
        <HiArrowLeft  className="drawer_btn" /> {/* or use any back icon like ← */}
      </button>
    )
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

        {(!isMobile || showMobileSearch) && (
          <div className="search-bar" ref={searchDropdownRef}>
            {!isMobile && (
              <button>
                <HiMagnifyingGlass />
              </button>
            )}
            <input
              type="text"
              placeholder="Search products..."
              value={searchText}
              onChange={handleSearchChange}
               ref={searchInputRef}
            />
          {isMobile &&   <IoMdClose
              className="search_close_btn"
              onClick={() => setShowMobileSearch(false)}
            />}
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
                      setShowMobileSearch(false);
                    }}
                  >
                    <div className="d_item_img">
                      <img src={product.images[0]} alt={product.name} />
                    </div>
                    <span>{product.name}</span>
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        <div className="profile_options">
          {isMobile && (
            <button
              className="search-icon"
              onClick={() => setShowMobileSearch((prev) => !prev)}
            >
              <HiMagnifyingGlass />
            </button>
          )}

          <Link to="/cart" className="nav-link">
            <BsCart4 className="ic" />
            <span className="cart-badge">{cartCount}</span>
          </Link>

          {token ? (
            <>
              {!isMobile && (
                <Link to="/profile" className="nav-link">
                  <BsFillPersonFill className="ic" />
                  {name ? name.split(" ")[0] : "User"}
                </Link>
              )}
            </>
          ) : (
            !isMobile && (
              <button className="nav_btn" onClick={() => setShowAuth(true)}>
                <BsFillPersonFill className="ic" />
              </button>
            )
          )}
        </div>
      </header>

      {/* 🔥 Overlay Background */}
      {(openDropdown ||
        showSearchDropdown ||
        showMobileSearch ||
        drawerOpen) && (
        <div
          className="header-overlay"
          onClick={() => {
            setOpenDropdown(false);
            setShowSearchDropdown(false);
            setDrawerOpen(false)
            setShowMobileSearch(false)
          }}
        ></div>
      )}

      {/* 📱 Mobile Drawer */}
      {isMobile && (
        <div
          className={drawerOpen ? "mobile-drawer show_drawer" : "mobile-drawer"}
        >
          <div
            className={
              fullCateg ? "d_categ_container expand" : "d_categ_container"
            }
          >
            <div
              className="drawer-header"
              style={{ backgroundColor: fullCateg ? "#B2BEB5" : "white" }}
            >
              <span>All Categories</span>
              {!fullCateg ? (
                <GoPlus
                  className="r_arrow"
                  onClick={() => setfullCateg((prev) => !prev)}
                />
              ) : (
                <LuMinus
                  className="r_arrow"
                  onClick={() => setfullCateg((prev) => !prev)}
                />
              )}
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
          <div className="drawer_links">
            <div className="link_cont">
              {isMobile && !token && (
                <button className="nav_btn" onClick={Profilebtn}>
                  Account
                </button>
              )}
              {isMobile && token && (
                <Link
                  to="/profile"
                  className="nav-link"
                  onClick={() => setDrawerOpen(false)}
                >
                  <span className="uname"> Account</span>
                </Link>
              )}
              <MdKeyboardArrowRight className="r_arrow" />
            </div>
            <div className="link_cont">
              <Link
                className="nav-link"
                to="/allproduct"
                onClick={() => setDrawerOpen(false)}
              >
                Products
              </Link>
              <MdKeyboardArrowRight className="r_arrow" />
            </div>
          </div>
        </div>
      )}

      {/* 🔐 Auth Modal */}
      {showAuth && (
        <AuthModal isOpen={showAuth} onClose={() => setShowAuth(false)} />
      )}
    </>
  );
};

export default Header;
