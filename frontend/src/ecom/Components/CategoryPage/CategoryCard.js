import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import SideBar from "../ProductPage/SideBar";
import LatestProduct from "../ProductPage/LatestProduct";
import { getToken } from "../../../services/LocalStorageService";
import {
  useCartMutation,
  useGetCartQuery,
} from "../../../services/UserAuthApi";

function CategoryCard(props) {
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

  return (
    <>
      <div className="shop-area">
        <div className="container-fluid">
          <div className="row">
            <div className="col-xl-2 col-lg-3">
              <div className="">
                {/* Category Side  */}
                <SideBar />
              </div>
            </div>
            <div className="col-xl-10 col-lg-9">
              <div className="row align-items-center">
                <div className="col-lg-2 col-md-6">
                  <div className="section-title">
                    <h3>Category Filter</h3>
                  </div>
                </div>
              </div>
              <div className="tab-content">
                <div id="grid-products" className="tab-pane active">
                  <div className="row">
                    {props.data.length != 0 ?
                    <>
                    {props.data.map((item) => {
                      return (
                        <div
                          className="col-xl-3 col-md-4 col-sm-6"
                          key={item.id}
                        >
                          <div className="product-single">
                            <div className="product-title">
                              <small>
                                <Link to={item.category_slug}>
                                  {item.category_name}
                                </Link>
                              </small>
                              <h4>
                                <Link to={item.slug}>{item.title}</Link>
                              </h4>
                            </div>
                            <div className="product-thumb">
                              <Link to={item.slug}>
                                <img
                                  width="195"
                                  height="195"
                                  src={item.image_1}
                                  alt={item.title}
                                />
                              </Link>
                              <div className="product-quick-view">
                                <Link
                                  to={item.slug}
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
                      );
                    })}
                    </>
                    :
                    
                    <>
                    <div className="pull-left">
                      <span>No Product On This Category/Keyword</span>
                    </div>
                    </>}

                  </div>
                </div>
              </div>

              <LatestProduct />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoryCard;
