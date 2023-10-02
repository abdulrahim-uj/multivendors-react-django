import React, { useState, useEffect } from "react";
import { getToken } from "../../../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { setUserCart } from "../../../features/cartSlice";
import axios from "axios";

function RightOrder({mode,setMode}) {
  const { access_token } = getToken();
  // GET CART
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
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);

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
      <div className="col-lg-4">
        <div className="order-details mt-30">
          <h4>Your Order</h4>
          <div className="order-details-inner">
            <table>
              <thead>
                <tr>
                  <th>PRODUCT</th>
                  <th>TOTAL</th>
                </tr>
              </thead>
              <tbody>
                {cartData.map((item) => {
                  return (
                    <>
                      <tr key={item.price}>
                        <td>{item.product_short_title}</td>
                        <td>
                          <strong>{item.price}</strong>
                        </td>
                      </tr>
                    </>
                  );
                })}

                <tr>
                  <td>Support and Handling</td>
                  <td>Free Support</td>
                </tr>
                <tr>
                  <td>ORDER TOTAL</td>
                  <td>
                    <strong>{totalPrice}</strong>
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="payment-gateways mt-30">
              <div className="single-payment-gateway">
                <label for="system1">Disclaimer</label>
                <div className="payment-gateway-desc">
                  <p>
                    Lorem ipsum dolor screated_date
created_date
created_dateit amet, consectetur adip elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  </p>
                </div>
              </div>

              <div className="single-payment-gateway d-none">
                <input type="radio" checked={mode === 'cash'} onClick={() => setMode('cash')} id="paymentmode" />
                <label for="system3">Cash on Delivery</label>
              </div>

              <div className="single-payment-gateway">
                <input type="radio" checked={mode === 'online'} onClick={() => setMode('online')} id="paymentmode" />
                <label for="system3">Pay Online</label>
              </div>


            </div>
            <div className="place-order text-center mt-60">
              <button type="submit" className="btn-common width-180">
                Place Order
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default RightOrder;
