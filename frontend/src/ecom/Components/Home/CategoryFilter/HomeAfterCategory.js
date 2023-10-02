import React, { useState, useEffect } from "react";
import {
  useGetProductQuery,
  useGetCartQuery,
  useCartMutation,
} from "../../../../services/UserAuthApi";
import { Link } from "react-router-dom";
import { getToken } from "../../../../services/LocalStorageService";

function HomeAfterCategory() {
  const { access_token } = getToken();

  // GET CART
  const [cartData, setCartData] = useState([]);
  const { data, isSuccess } = useGetCartQuery(access_token);

  // Store Cart Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setCartData(data.data);
    }
  }, [data, isSuccess]);

  // POST CART
  const [Cart, { isLoading }] = useCartMutation();
  const handleSubmit = async (id) => {
    const actualData = {
      id,
      hint: "firstcart",
    };
    const res = await Cart({ actualData, access_token });
    if (res.error) {
      console.log(res.error);
    }
    if (res.data) {
      alert(`${res.data.message}`);
    }
  };

  const [product, setProduct] = useState([]);
  const ProductData = useGetProductQuery();
  useEffect(() => {
    if (ProductData.data && ProductData.isSuccess) {
      setProduct(ProductData.data);
    }
  });
  return (
    <>
      <div className="products-tab mt-35">
        <div className="product-nav-tabs">
          <ul className="nav nav-tabs">
            <li>
              <a className="active" data-toggle="tab" href="#new-arrivals">
                New Arrivals
              </a>
            </li>
          </ul>
        </div>
        <div className="tab-content pb-40">
          <div id="new-arrivals" className="tab-pane fade in show active">
            <div className="row product-carousel cv-visible">
              {product.slice(0, 8).map((item) => {
                return (
                  <>
                    <div
                      className="col-lg-3"
                      style={{ display: "inline-block" }}
                    >
                      <div className="product-single">
                        <div className="product-title">
                          <small>
                            <Link to={item.category_slug}>
                              {item.category_name}
                            </Link>
                          </small>
                          <h4>
                            <Link to={"/ecom/products/" + `${item.slug}`}>
                              {item.title}
                            </Link>
                          </h4>
                        </div>
                        <div className="product-thumb">
                          <Link to={"/ecom/products/" + `${item.slug}`}>
                            <img
                              src={item.image_1}
                              width="195"
                              height="185"
                              alt={item.title}
                            />
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
                          <span>{item.price}</span>
                          <del>{item.discount_price}</del>
                        </div>
                        <div className="product-action">
                          {access_token ? (
                            <>
                              <Link
                                to=""
                                onClick={() => handleSubmit(`${item.id}`)}
                                className="add-to-cart add"
                              >
                                Add To Card
                              </Link>
                            </>
                          ) : (
                            <>
                              <Link to="/login" className="add-to-cart">
                                Add to Cart
                              </Link>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-40">
        <hr />

        <div className="product-nav-tabs">
          <ul className="nav nav-tabs">
            <li>
              <a className="active" data-toggle="tab" href="#new-arrivals">
                Best Product
              </a>
            </li>
          </ul>
        </div>

        {product.slice(0, 4).map((item) => {
          if (item.is_best === true) {
            return (
              <div className="col-xl-4 col-lg-6">
                <div className="banner-sm hover-effect">
                  <img
                    width="325"
                    height="160"
                    src={item.image_2}
                    alt={item.title}
                  />
                  <div className="banner-info">
                    <div className="product-value">
                      <span>{item.price}</span> <del>{item.discount_price}</del>
                    </div>
                    <p>
                      <strong>{item.short_title}</strong>
                    </p>
                    <Link
                      to={"/ecom/products/" + `${item.slug}`}
                      className="btn-common width-115"
                    >
                      Buy Now
                    </Link>
                  </div>
                </div>
              </div>
            );
          }
        })}
      </div>
    </>
  );
}

export default HomeAfterCategory;
