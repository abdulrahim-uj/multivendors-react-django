import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Breabcrumb from "../Components/ProductPage/Breabcrumb";
import SideBar from "../Components/ProductPage/SideBar";
import Card from "../Components/ProductPage/Card";
import CategoryListSideBar from "../Components/ProductPage//ProductSideBar/CategoryListSideBar";
import LatestProduct from "../Components/ProductPage/LatestProduct";
import BottomProduct from "../Components/Home/CategoryFilter/BottomProduct";

import {
  useGetProductQuery,
  useProductByPriceMutation,
} from "../../services/UserAuthApi";

function ProductPage() {
  const [product, setProduct] = useState([]);

  // All Data Start

  const ProductData = useGetProductQuery();

  useEffect(() => {
    if (ProductData.data && ProductData.isSuccess) {
      setProduct(ProductData.data);
    }
  }, []);

  // All Data End

  // Price Filter
  const [price, setPrice] = useState(100);
  const [ProductByPrice, { isLoading }] = useProductByPriceMutation();

  const handlePriceFilter = async (e) => {
    setProduct([]);
    e.preventDefault();
    const pdata = new FormData(e.currentTarget);
    const actualData = {
      price,
    };
    const res = await ProductByPrice(actualData);
    if (res.error) {
      console.log(res.error);
    }
    if (res.data) {
      setProduct(res.data);
    }
  };

  // End Price Filter

  return (
    <>
      <>
        <Breabcrumb first={"Home"} second={"Shop"} />

        <div className="shop-area">
          <div className="container-fluid">
            <div className="row">
              <div className="col-xl-2 col-lg-3">
                <div className="">
                  <CategoryListSideBar />

                  {/* Price Side Bar Start Here  */}
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
                  {/* Price Sire Bar End Here  */}

                  <SideBar />
                </div>
              </div>

              <div className="col-xl-10 col-lg-9">
                <div className="row align-items-center">
                  <div className="col-lg-2 col-md-6">
                    <div className="section-title">
                      <h3>Shop</h3>
                    </div>
                  </div>
                </div>

                <Card data={product} />

                {/* Pagination */}

                {/* Latest Product */}
                <LatestProduct />
              </div>
            </div>
            {/* Home Bottom Product  */}
            <BottomProduct />
          </div>
        </div>
      </>
    </>
  );
}

export default ProductPage;
