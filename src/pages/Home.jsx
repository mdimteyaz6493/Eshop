import React, { useEffect, useState } from 'react';
import axios from '../axios';
import Products from '../components/HomeComp/Products';
import HomeBanner from '../components/HomeComp/HomeBanner/HomeBanner';
import ProductCategSlider from '../components/HomeComp/ProductCategSlider/ProductCategSlider';
import CategoriesSlider from '../components/HomeComp/CatgoriesSlider/CategoriesSlider';
import Footer from '../components/Footer/Footer';
import SmallHomeBanner from '../components/HomeComp/SmallHomeBanner/SmallHomeBanner';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products/all')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  // ✅ Filter for Smartwatches
  const smartwatches = products.filter(
    (product) => product.category?.toLowerCase() === 'smartwatch'
  );

  // ✅ Filter for Bestsellers
  const bestsellers = products.filter(
    (product) => product.bestseller === true
  );

  return (
    <div style={styles.container}>
      <HomeBanner />
      <CategoriesSlider />

      {/* ✅ Show Bestsellers first */}
      <ProductCategSlider products={bestsellers} slidername={"Best Sellers"} />

      {/* ✅ Then Smartwatches */}
      <ProductCategSlider products={smartwatches} slidername={"Smart Watches"} />

      <SmallHomeBanner />
      <Footer />
    </div>
  );
};

const styles = {
  container: { padding: '0px', backgroundColor: 'white' },
};

export default Home;
