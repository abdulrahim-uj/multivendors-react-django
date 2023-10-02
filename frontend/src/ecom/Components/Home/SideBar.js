import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "../../../services/UserAuthApi";
import { Link } from "react-router-dom";

function SideBar() {
  const [product, setProduct] = useState([]);

  const ProductData = useGetProductQuery();

  useEffect(() => {
    if (ProductData.data && ProductData.isSuccess) {
      setProduct(ProductData.data);
    }
  });



  return (
    <>
      <div className="col-xl-2 col-lg-3">
        <div className="">
          {" "}
          {/* className="sidebar"  */}
          <div className="sidebar-single">
            <div className="section-title">
              <h3>Deal off the week</h3>
            </div>
            <div className="row product-deals">
              {product.slice(0, 1).map((item) => {
                return (
                  <div className="col-lg-12">
                    <div className="product-single product-deal">
                      <div className="product-title">
                        <small>
                          <Link to={item.category_name}>
                            {item.category_name}
                          </Link>
                        </small>
                        <h4>
                          <Link to={"/ecom/products/" + `${item.slug}`} >{item.title}</Link>
                        </h4>
                      </div>
                      <div className="product-thumb">
                        <Link to={"/ecom/products/" + `${item.slug}`}>
                          <img src={item.image_1} alt={item.title} />
                        </Link>
                        <div className="downsale">
                          <span>-</span>
                          {item.discount_price}
                        </div>
                        <div className="product-quick-view">
                          <Link
                            to={"/ecom/products/" + `${item.slug}`}
                            data-toggle="modal"
                            data-target="#quick-view"
                          >
                            quick view
                          </Link>
                        </div>
                      </div>
                      <div className="product-price-rating">
                        <div className="pull-left">
                          <span>{item.price}</span>
                        </div>
                        <div className="pull-right">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                        </div>
                      </div>
                      <div className="product-availability">
                        <div className="progress">
                          <div
                            className="progress-bar"
                            role="progressbar"
                            aria-valuenow="60"
                            aria-valuemin="0"
                            aria-valuemax="100"
                            style={{ width: "60%" }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="single-sidebar products-list mt-35">
            <div className="section-title mb-30">
              <h3>Latest Items</h3>
            </div>
            <div className="one-carousel dots-none">
              <div>
                <ul className="list-none">
                  {product.slice(0, 5).map((item) => {
                    return (
                      <li>
                        <div className="product-single style-2">
                          <div className="row align-items-center m-0">
                            <div className="col-lg-4 p-0">
                              <div className="product-thumb">
                                <Link to={"/ecom/products/" + `${item.slug}`}>
                                  <img src={item.image_2} alt={item.title} />
                                </Link>
                              </div>
                            </div>
                            <div className="col-lg-8 p-0">
                              <div className="product-title">
                                <h4>
                                  <Link to={"/ecom/products/" + `${item.slug}`}>{item.short_title}</Link>
                                </h4>
                              </div>
                              <div className="product-price-rating">
                                <span>{item.price}</span>
                                <del>{item.discount_price}</del>
                              </div>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </div>
          </div>
          <div className="single-sidebar mt-30">
            <div className="store-supports">
              <ul className="list-none">
                <li>
                  <div className="support-icon">
                    <img
                      src="https://noyon.me/html/hakduck-preview/assets/images/icons/bank-loan.jpg"
                      alt=""
                    />
                  </div>
                  <div className="support-text">
                    <strong>Free Delivery</strong>
                    <p>For all order over 99$</p>
                  </div>
                </li>
                <li>
                  <div className="support-icon">
                    <img
                      src="https://noyon.me/html/hakduck-preview/assets/images/icons/bank-loan.jpg"
                      alt=""
                    />
                  </div>
                  <div className="support-text">
                    <strong>30 Days Return</strong>
                    <p>If goods have Problems</p>
                  </div>
                </li>
                <li>
                  <div className="support-icon">
                    <img
                      src="https://noyon.me/html/hakduck-preview/assets/images/icons/bank-credit-card2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="support-text">
                    <strong>Secure Payment</strong>
                    <p>100% secure payment</p>
                  </div>
                </li>
                <li>
                  <div className="support-icon">
                    <img
                      src="https://noyon.me/html/hakduck-preview/assets/images/icons/bank-support2.jpg"
                      alt=""
                    />
                  </div>
                  <div className="support-text">
                    <strong>24/7 Support</strong>
                    <p>Dedicated support</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SideBar;
