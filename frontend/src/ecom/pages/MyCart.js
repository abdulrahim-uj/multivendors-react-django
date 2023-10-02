import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useGetCartQuery, useCartMutation } from "../../services/UserAuthApi";
import { getToken } from "../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserCart } from "../../features/cartSlice";
import axios from "axios";

function MyCart() {
  const { access_token } = getToken();
  const dispatch = useDispatch();

  // GET CART
  const [cartLen, setCartLen] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
      
    };

    const cart_data = axios
      .get("http://127.0.0.1:8000/ecom/cart", config)
      .then((response) => {
        setCartData(response.data.data);
        // Store User Data in Redux Store
        dispatch(
          setUserCart({
            cart: response.data.cart_len,
          })
        );
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

  // POST CART
  const [Cart, { isLoading }] = useCartMutation();
  const handleSubmit = async (id, hint) => {
    const actualData = {
      id,
      hint: hint,
    };
    const res = await Cart({ actualData, access_token });
    if (res.error) {
      console.log(res.error);
    }
    if (res.data) {
      setCartData(res.data.data);
      // alert(`${res.data.message}`);

      // Store User Data in Redux Store
      dispatch(
        setUserCart({
          cart: res.data.cart_len,
        })
      );
    }
  };

  // Total Price Calculate
  useEffect(() => {
    let x = 0;
    cartData.map((item, index) => {
      x += parseFloat(item.price) * item.quantity;
      setTotalPrice(parseFloat(x).toFixed(2));
    });
  });

  return (
    <>
      <div className="shopping-cart-steps" style={{ marginTop: "5%" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-steps">
                <ul className="clearfix">
                  <li className="active">
                    <div className="inner">
                      <span className="step">01</span>{" "}
                      <span className="inner-step">Shopping Cart</span>
                    </div>
                  </li>
                  <li>
                    <div className="inner">
                      <span className="step">02</span>{" "}
                      <span className="inner-step">Checkout </span>
                    </div>
                  </li>
                  <li>
                    <div className="inner">
                      <span className="step">03</span>{" "}
                      <span className="inner-step">Order Completed </span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="shopping-cart-area">
        <div className="container">
          <div className="row">
            <div className="col-sm-12">
              <div className="table-responsive">
                <table className="cart-table">
                  <thead>
                    <tr>
                      <th>Image</th>
                      <th>Product Name</th>
                      <th>Price</th>
                      <th>Quantity</th>
                      <th>Total</th>

                      <th className="text-center">
                        <i className="fa fa-times" aria-hidden="true"></i>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cartData.map((item) => {
                      return (
                        <>
                          <tr key={item.id}>
                            <td>
                              <div className="cart-product-thumb">
                                <a
                                  href={
                                    "/ecom/products/" + `${item.product_slug}`
                                  }
                                >
                                  <img
                                    width="130"
                                    height="130"
                                    src={
                                      "http://127.0.0.1:8000/media/" +
                                      `${item.product_image}`
                                    }
                                    alt={item.product_title}
                                  />
                                </a>
                              </div>
                            </td>
                            <td>
                              <div className="cart-product-name">
                                <h5>
                                  <a
                                    href={
                                      "/ecom/products/" + `${item.product_slug}`
                                    }
                                  >
                                    {item.product_short_title}
                                  </a>
                                </h5>
                              </div>
                            </td>
                            <td>
                              <span className="cart-product-price">
                                {item.price}
                              </span>
                            </td>
                            <td>
                              <div className="cart-quantity-changer">
                                <a
                                  className="value-decrease qtybutton d-none"
                                  onClick={() =>
                                    handleSubmit(
                                      `${item.product}`,
                                      "decrement-cart"
                                    )
                                  }
                                >
                                  -
                                </a>
                                <input type="text" value={item.quantity} />
                                <a
                                  className="value-increase qtybutton d-none"
                                  onClick={() =>
                                    handleSubmit(
                                      `${item.product}`,
                                      "increment-cart"
                                    )
                                  }
                                >
                                  +
                                </a>
                              </div>
                            </td>
                            <td>
                              <span className="cart-product-price">
                                {parseFloat(`${item.price}`) *
                                  parseFloat(`${item.quantity}`)}{" "}
                              </span>
                            </td>
                            <td>
                              <div className="product-remove">
                                <Link
                                  to=""
                                  onClick={() =>
                                    handleSubmit(`${item.product}`, "remove")
                                  }
                                >
                                  <i
                                    className="fa fa-times"
                                    aria-hidden="true"
                                  ></i>
                                </Link>
                              </div>
                            </td>
                          </tr>
                        </>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
          <div className="row mt-30">
            <div className="col-lg-6">
              <div className="cart-update">
                <Link to="/" className="btn-common">
                  CONTINUE SHOPPING
                </Link>
              </div>
            </div>
            <div className="col-lg-6">
              <div className="cart-update pull-right">
                {cartData.length == 0 ? (
                  <Link to="/" disabled className="btn-common">
                    No Product
                  </Link>
                ) : (
                  <Link to="/ecom/checkout" className="btn-common">
                    PROCEED TO CHECK OUT
                  </Link>
                )}
              </div>
            </div>
          </div>
          <div className="row mt-40">
            <div className="col-lg-12">
              <div className="cart-box cart-total ">
                <h5>Cart Total</h5>
                <div className="cart-box-inner">
                  <table className="table">
                    <tr>
                      <td>SUB TOTAL:</td>
                      <td>
                        <span>{totalPrice}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>GRAND TOTAL:</td>
                      <td>
                        <span>{totalPrice}</span>
                      </td>
                    </tr>
                  </table>
                  <div className="proceed-checkout">
                    <div className="col-lg-12">
                      {/* <a href="#">Checkout with multiple address</a> */}
                    </div>
                    <div className="col-lg-12">
                      {cartData.length == 0 ? (
                        <Link to="/" className="btn-common">
                          Back To Home
                        </Link>
                      ) : (
                        <Link to="/ecom/checkout" className="btn-common">
                          PROCEED TO CHECK OUT
                        </Link>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyCart;
