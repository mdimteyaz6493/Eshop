import React from 'react'
import "./smallhomebanner.css"

const SmallHomeBanner = () => {
  return (
    <div className='sb_container'>
     <div className="long">
        <img src="./sb1.jpg" alt="" />
     </div>
     <div className="short">
      <div className="short_cont">
          <img src="./sb3.jpg" alt="" />
      </div>
      <div className="short_cont">
          <img src="./sb4.jpg" alt="" />
      </div>
     </div>
     <div className="large">
        <img src="./b6.jpg" alt="" />
     </div>
    </div>
  )
}

export default SmallHomeBanner
