import React, { useState, useEffect } from "react";
import {
  useGetProductQuery,
  useCartMutation,
  useGetCartQuery,
} from "../../../../services/UserAuthApi";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getToken } from "../../../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserCart } from "../../../../features/cartSlice";

function BottomProduct() {
  const dispatch = useDispatch();
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

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserCart({
          cart: data.cart_len,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

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
      
      // Store User Data in Redux Store
      dispatch(
        setUserCart({
          cart: res.data.cart_len,
        })
      );
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
      <div className="products-tab-area mt-45 mt-sm-40">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-md-3 pr-0">
              <div className="section-title">
                <h3>Best Selling Product</h3>
              </div>
            </div>
          </div>

          <div className="tab-content">
            <div id="" className="tab-pane fade active">
              <div className="row product-carousel-fullwidth cv-visible">
                {product.slice(0, 8).map((item) => {
                  if (item.is_best_selling) {
                    return (
                      <div
                        key={item.id}
                        className="col-lg-3"
                        style={{ display: "inline-block" }}
                      >
                        <div className="product-single">
                          <div className="product-title">
                            <small>
                              <Link to={item.category_name}>
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
                                width="249"
                                height="249"
                                src={item.image_3}
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
                                {/* {cartData.map((cartItem) => {
                                  if (`${cartItem.product}` != `${item.id}`) {
                                    return (
                                      <>
                                        <Link
                                          to="/shipping"
                                          className="add-to-cart added"
                                        >
                                          Already Added
                                        </Link>
                                      </>
                                    );
                                  }
                                  else {
                                    return (
                                      <Link
                                        to=""
                                        onClick={() =>
                                          handleSubmit(`${item.id}`)
                                        }
                                        className="add-to-cart"
                                      >
                                        Add To Card
                                      </Link>
                                    );
                                  }
                                })} */}
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
                    );
                  }
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default BottomProduct;
