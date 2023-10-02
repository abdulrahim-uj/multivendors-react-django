import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import B1 from "../../../../public/static/media/banners/small/1.jpg";

import { useGetHomeSliderQuery } from "../../../services/UserAuthApi";
import { useGetHomeFourQuery } from "../../../services/UserAuthApi";

function Slider() {
  const [sliderData, setSliderData] = useState({
    category_name: "",
    content: "",
    current_price: "",
    discount_price: "",
    id: "",
    image: "",
    link: "",
    tilte: "",
  });

  const [sliderFourData, setSliderFourData] = useState([]);
  const { data, isSuccess } = useGetHomeSliderQuery();
  const HomeQueryData = useGetHomeFourQuery();

  // Store User Data in Local State
  useEffect(() => {
    if (HomeQueryData.data && HomeQueryData.isSuccess) {
      setSliderFourData(HomeQueryData.data);
    }
  }, [HomeQueryData.data, HomeQueryData.isSuccess]);

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setSliderData({
        category_name: data.category_name,
        content: data.content,
        current_price: data.current_price,
        discount_price: data.discount_price,
        id: data.id,
        image: "http://code.masterprograming.com" + data.image,
        link: data.link,
        tilte: data.tilte,
      });
    }
  }, [data, isSuccess]);

  return (
    <>
      <div className="slider-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-6 offset-xl-2">
              <div className="main-slider mt-30 mt-sm-0">
                {/* slider */}
                <div
                  className="slider-single"
                  style={{
                    backgroundImage: `url(${sliderData.image})`,
                  }}
                >
                  <div className="d-table">
                    <div className="slider-caption">
                      <h4>{sliderData.category_name}</h4>
                      <h2 className="cssanimation leDoorCloseLeft sequence">
                        {sliderData.tilte}
                      </h2>
                      <p>{sliderData.content}</p>
                      <div className="slider-product-price">
                        <del>{sliderData.discount_price}</del>
                        <span>{sliderData.current_price}</span>
                      </div>
                      <Link to={sliderData.link} className="btn-common mt-43">
                        buy now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-xl-4">
              <div className="row mt-30">
                
                {sliderFourData.map((item) => {
                  return (
                    <div className="col-lg-6 col-sm-6 pl-05 mt-2">
                      <div className="banner-sm hover-effect">
                        <img width="194" height="176" src={item.image} alt={item.category_name} />
                        <div className="banner-info">
                          <h4>{item.category_name}</h4>
                          <p>
                          <strong>{item.content}</strong> 
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}

              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Slider;
