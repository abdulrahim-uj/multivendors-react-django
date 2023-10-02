import React from "react";
import Billing from "../Components/CheckOut/Billing";

function CheckOut() {
  return (
    <>
      <div className="shopping-cart-steps" style={{ marginTop: "5%" }}>
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="cart-steps">
                <ul className="clearfix">
                  <li>
                    <div className="inner">
                      <span className="step">01</span>{" "}
                      <span className="inner-step">Shopping Cart</span>
                    </div>
                  </li>
                  <li className="active">
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

      <Billing/>
    </>
  );
}

export default CheckOut;
