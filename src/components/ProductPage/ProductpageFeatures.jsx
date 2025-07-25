import React from 'react'
import "./productfeatures.css"

const ProductpageFeatures = () => {
  return (
    <div className='ppf_container'>
      <div className="ppf">
        <div className="ppf_icon">
            <img src="/guarantee.png" alt="" />
        </div>
        <div className="ppf_lable"><span>12 Months</span> Warranty</div>
      </div>
      <div className="ppf">
        <div className="ppf_icon">
            <img src="/replacement.png" alt="" />
        </div>
        <div className="ppf_lable"><span>7-day</span> Replacement</div>
      </div>
      <div className="ppf">
        <div className="ppf_icon">
            <img src="/free-shipping.png" alt="" />
        </div>
        <div className="ppf_lable"><span>Free</span> Delivery*</div>
      </div>
      <div className="ppf">
        <div className="ppf_icon">
            <img src="/bill.png" alt="" />
        </div>
        <div className="ppf_lable"><span>GST</span> Billing</div>
      </div>
    </div>
  )
}

export default ProductpageFeatures 
