import React, { useEffect, useState } from 'react';
import axios from '../axios';
import Products from '../components/HomeComp/Products';
import HomeBanner from '../components/HomeComp/HomeBanner/HomeBanner';
import ProductCategSlider from '../components/HomeComp/ProductCategSlider/ProductCategSlider';
import CategoriesSlider from '../components/HomeComp/CatgoriesSlider/CategoriesSlider';
import Footer from '../components/Footer/Footer';

const Home = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get('/products/all')
      .then(res => setProducts(res.data))
      .catch(console.error);
  }, []);

  // Filter for only Smartwatch category
  const smartwatches = products.filter(
    (product) => product.category.toLowerCase() === 'smartwatch'
  );

  return (
    <div style={styles.container}>
      <HomeBanner />
      <ProductCategSlider products={smartwatches} />
      <CategoriesSlider/>
      {/* <Products products={products} /> */}
      <Footer/>

    </div>
  );
};

const styles = {
  container: { padding: '0px',backgroundColor:"#f5f0f0ff"},

};

export default Home;
