import React, { useState, useEffect } from "react";
import { useProductByPriceMutation } from "../../../../services/UserAuthApi";

function PriceSideBar() {
  const [price, setPrice] = useState(100);

  const [ProductByPrice, { isLoading }] = useProductByPriceMutation();

  const handlePriceFilter = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      price,
    };

    const res = await ProductByPrice(actualData);
    if (res.error) {
      console.log(res.error);
    }
    if (res.data) {
      console.log(res.data);
    }
  };

  return (
    <>
      <div className="price_filter mt-40">
        <div className="section-title">
          <h3>Filter by price</h3>
        </div>
        <form onSubmit={handlePriceFilter}>
          <div className="price_slider_amount">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <input
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  type="text"
                  // id="amount"
                  name="price"
                  placeholder="Add Your Price"
                />
              </div>
              <div className="col-lg-6">
                <button type="submit">Filter</button>
              </div>
            </div>
          </div>
        </form>

        <div id="slider-range"></div>
      </div>
    </>
  );
}

export default PriceSideBar;
