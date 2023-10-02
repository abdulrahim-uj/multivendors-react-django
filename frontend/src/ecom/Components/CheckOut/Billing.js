import React, { useState, useEffect } from "react";
import RightOrder from "./RightOrder";
import {
  useBillingMutation,
  usePaymentMutation,
} from "../../../services/UserAuthApi";
import { getToken } from "../../../services/LocalStorageService";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function loadScript(src) {
  return new Promise((resolve) => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

function Billing() {
  const [res, setRes] = useState("");
  const [country, setCountry] = useState("India");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [company_name, setCompnay] = useState("");
  const [address_street, setAdressStreet] = useState("");
  const [address_optional, setAdressOptional] = useState("");
  const [city, setCity] = useState("");
  const [states, setState] = useState("");
  const [zip_code, setZipCode] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [mode, setMode] = useState("");

  let navigate = useNavigate();
  const [Billing, { isLoading }] = useBillingMutation();
  const [Payment] = usePaymentMutation();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
    const { access_token } = getToken();

    if (
      first_name == "" ||
      address_street == "" ||
      city == "" ||
      states == "" ||
      zip_code == "" ||
      phone == ""
    ) {
      setRes("Plzz Fill The All Details");
    } else if (mode == "") {
      setRes("Plzz Select The Payment Mode");
    } else {
      const actualData = {
        country,
        first_name,
        last_name,
        company_name,
        address_street,
        address_optional,
        city,
        states,
        zip_code,
        email,
        phone,
        mode,
      };

      const response = await Billing({ actualData, access_token });
      if (response.error) {
        console.log(response.error);
      }
      if (response.data) {
        const data = response.data;
        if (mode == "cash") {
          navigate("/ecom/orders");
        } else {
          displayRazorpay(data);
        }
      }
    }
  };

  async function displayRazorpay(data) {
    const { access_token } = getToken();

    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
    };

    const res = await loadScript(
      "https://checkout.razorpay.com/v1/checkout.js"
    );

    if (!res) {
      alert(
        "Failure loading the Razorpay SDK. PLease make sure you are connected to the internet"
      );
      return;
    }

    const options = {
      key: "rzp_test_8owKWhpJrbOci8", // Enter the Key ID generated from the Dashboard
      amount: data.payment.amount.toString(),
      currency: data.payment.currency,
      name: "DanMojo",
      description: "Powered By MasterPrograming.com",
      // image: logo,
      order_id: data.payment.id,
      handler: async function (response) {
        const price = data.payment.amount;
        const razorpay_paymentId = response.razorpay_payment_id;
        const razorpay_orderId = response.razorpay_order_id;
        const razorpay_signature = response.razorpay_signature;
        const actualData = {
          razorpay_paymentId,
          razorpay_orderId,
          razorpay_signature,
          price,
        };
        const res = await Payment({ actualData, access_token });
        if (res.error) {
          console.log(res.error);
        }
        if (res.data) {
          console.log(res.data.message);
          navigate("/ecom/orders");
        }
      },
      prefill: {
        name: "DanMojo",
        email: "help@danmojo.com",
        contact: "91- 8534867764",
      },
      theme: {
        color: "#61dafb",
      },
    };
    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  }

  return (
    <>
      <div className="checkout-area mt-15">
        <div className="container">
          <div className="row"></div>
          <form onSubmit={handleSubmit}>
            <div className="row mt-10">
              <div className="col-lg-8">
                <div className="billing-form">
                  <h4>Billing Address</h4>
                  <form>
                    <div className="row">
                      <div className="col-lg-3 align-items-center">
                        <label>COUNTRY *</label>
                      </div>
                      <div className="col-lg-9">
                        <select>
                          <option>India</option>
                        </select>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>FIRST NAME *</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          name={first_name}
                          onChange={(e) => setFirstName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>LAST NAME *</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          name={last_name}
                          onChange={(e) => setLastName(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>COMPANY NAME</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          name={company_name}
                          onChange={(e) => setCompnay(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>ADDRESS *</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          placeholder="Street Address"
                          name={address_street}
                          onChange={(e) => setAdressStreet(e.target.value)}
                          required
                        />
                        <input
                          type="text"
                          placeholder="Apartment, suite, unite ect (optinal)"
                          className="mt-sm-30"
                          name={address_optional}
                          onChange={(e) => setAdressOptional(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>CITY *</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          name={city}
                          onChange={(e) => setCity(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>STATES</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="text"
                          name={states}
                          onChange={(e) => setState(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>POSTCODE / ZIP *</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="number"
                          name={zip_code}
                          onChange={(e) => setZipCode(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>EMAIL ADDRESS *</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="email"
                          name={email}
                          onChange={(e) => setEmail(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-lg-3">
                        <label>PHONE *</label>
                      </div>
                      <div className="col-lg-9">
                        <input
                          type="number"
                          name={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              </div>

              <RightOrder mode={mode} setMode={setMode} />
            </div>
          </form>
          <div className="alert alert-secondary my-3" role="alert">
            {res}
          </div>
        </div>
      </div>
    </>
  );
}

export default Billing;
