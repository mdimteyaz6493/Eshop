import React from 'react';
import './productspecs.css';

const ProductSpecification = ({product}) => {
  const specs = {
    brand: 'Samsung',
    productName: 'Galaxy Buds Pro',
    mrp: '₹10,999',
    countryOfOrigin: 'India',
    netQuantity: '1 Unit',
    warranty: '1 Year',
    ipxRating: 'IPX7',
    workingTime: '8 Hours'
  };

  return (
    <div className="specs-container">
      <h2>Product Specifications</h2>
      <table className="specs-table">
        <tbody>
          <tr>
            <td>Brand</td>
            <td>{product.brand}</td>
          </tr>
          <tr>
            <td>Product Name</td>
            <td>{product.name}</td>
          </tr>
          <tr>
            <td>MRP</td>
            <td>₹{product.price}</td>
          </tr>
          <tr>
            <td>Country of Origin</td>
            <td>{specs.countryOfOrigin}</td>
          </tr>
          <tr>
            <td>Net Quantity</td>
            <td>{specs.netQuantity}</td>
          </tr>
          <tr>
            <td>Warranty</td>
            <td>{specs.warranty}</td>
          </tr>
          <tr>
            <td>IPX Rating</td>
            <td>{specs.ipxRating}</td>
          </tr>
          <tr>
            <td>Working Time</td>
            <td>{specs.workingTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default ProductSpecification;
