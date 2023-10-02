import React, { useEffect, useState } from "react";
import Top from "../Components/Header/Top";
import { Link } from "react-router-dom";
import Logo from "../../../public/logo.png";
import MobileHeader from "../Components/Header/MobileHeader";

function Header() {
  const [resData, setResData] = useState([]);

  useEffect(() => {
    const resdata = fetch("http://127.0.0.1:8000/webinfo")
      .then((response) => response.json())
      .then((rdata) => setResData(rdata.data[0]));
  }, []);



  const logo_url =
    "http://" + window.location.hostname + "/" + "media/" + resData.logo;

  return (
    <>
      <header className="header-area">
        <Top />

        <div className="sticker mobile-header">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-sm-4 col-6">
                <div className="logo">
                  <Link to="/">
                    <img src={logo_url} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-sm-8 col-6">
                <div className="mini-cart text-right">
                  <ul>
                    <li>
                      <a href="#">
                        <i className="icon_heart_alt"></i>
                        <span>1</span>
                      </a>
                    </li>
                    <li className="minicart-icon">
                      <a href="#">
                        <i className="icon_bag_alt"></i>
                        <span>2</span>
                      </a>
                      <div className="cart-dropdown">
                        <div className="mini-cart-checkout">
                          <a
                            href="/ecom/mycart"
                            className="btn-common view-cart"
                          >
                            VIEW CARD
                          </a>
                          <a
                            href="/shipping"
                            className="btn-common checkout mt-10"
                          >
                            CHECK OUT
                          </a>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="row align-items-center">
              <div className="col-sm-12">
                <div className="search-box mt-sm-15">
                  <select>
                    <option>All Categories</option>
                  </select>
                  <input type="text" placeholder="What do you need?" />
                  <button>Search</button>
                </div>
              </div>
            </div>

            <MobileHeader />
          </div>
        </div>
      </header>
    </>
  );
}

export default Header;
