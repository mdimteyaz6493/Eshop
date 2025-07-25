import React from 'react'
import "./productoffer.css"

const ProductOffer = () => {
  return (
    <div className='offers_cont'>
      <div className="offer_box">
        <span className='offer_title'>
            Cashback
        </span>
        <span className='offer_detail'>Get 5% back with Amazon Pay ICICI Bank credit card for Prime members. </span>
      </div>
        <div className="offer_box">
        <span className='offer_title'>
            No Cost EMI
        </span>
        <span className='offer_detail'>Upto ₹3,098.47 EMI interest savings on Amazon Pay ICICI Bank credit card.</span>
      </div>
        <div className="offer_box">
        <span className='offer_title'>
            Cashback
        </span>
        <span className='offer_detail'>Get 3% back* with Amazon Pay ICICI Bank credit card . Apply now!</span>
      </div>
    </div>
  )
}

export default ProductOffer
