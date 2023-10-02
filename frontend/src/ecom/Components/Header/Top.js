import React, { useEffect, useState } from "react";
import Logo from "../../../../public/logo.png";
import { Link, useNavigate } from "react-router-dom";

// Logout
import { removeToken, getToken } from "../../../services/LocalStorageService";
import { unSetUserToken } from "../../../features/authSlice";
import {
  useGetCategoryQuery,
  useGetCartQuery,
  useCartMutation,
  useGetSearchQuery,
} from "../../../services/UserAuthApi";
import { setUserInfo, unsetUserInfo } from "../../../features/userSlice";
import { useDispatch } from "react-redux";
import { setUserCart, initialState } from "../../../features/cartSlice";
import { useSelector } from "react-redux";
import { useGetLoggedUserQuery } from "../../../services/UserAuthApi";

function Top() {
  // Logout
  const { access_token } = getToken();
  const dispatch = useDispatch();

  // Navigation
  const navigate = useNavigate();

  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  const handleClick = () => {
    dispatch(
      unsetUserInfo({ username: "", email: "", first_name: "", last_name: "" })
    );
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/", { replace: true });
  };

  const [resData, setResData] = useState([]);

  useEffect(() => {
    const resdata = fetch("http://127.0.0.1:8000/webinfo")
      .then((response) => response.json())
      .then((rdata) => setResData(rdata.data[0]));
  }, []);

  const logo_url =
    "http://" + window.location.hostname + "/" + "media/" + resData.logo;

  const [catData, setCatData] = useState([]);
  const CategoryData = useGetCategoryQuery();

  useEffect(() => {
    if (CategoryData.data && CategoryData.isSuccess) {
      setCatData(CategoryData.data);
    }
  }, [CategoryData.data, CategoryData.isSuccess]);

  // GET CART
  const [cartLen, setCartLen] = useState(0);
  const getCartData = useGetCartQuery(access_token);

  // Store Cart Data in Local State
  useEffect(() => {
    if (getCartData.data && getCartData.isSuccess) {
      setCartLen(getCartData.data.cart_len);
    }
  }, [getCartData.data, getCartData.isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (getCartData.data && getCartData.isSuccess) {
      dispatch(
        setUserCart({
          cart: getCartData.data.cart_len,
        })
      );
    }
  }, [getCartData.data, getCartData.isSuccess, dispatch]);

  const initialState = useSelector((state) => state.cart);
  // setCartLen(initialState.cart)
  console.log("Value ", initialState);

  const [search,setSearch] = useState("")
  const handleSearch = () => {
    if(search == ""){
      alert("Please Enter Keyword For Search")
    }else{
      console.log(search)
      navigate(`ecom/search/${search}`, { replace: true });
    }
  };
	const [state , setState] = useState(true)
const [active ,setActive] =useState()
   const handleStyle = () => {
  let isActive =  state ? "none" : 'block'
	setState(!state)
console.log(isActive, "sjfgjsf")
setActive(isActive)
 }

  return (
    <>
      <div className="desktop-header">
        <div className="header-top">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-6">
                <div className="topbar-left">
                  <ul className="list-none">
                    <li>{resData.offer_line}</li>
                    <li>
                      Call Us: <span>{resData.phone}</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="topbar-right">
                  <div className="currency-bar lang-bar pull-right">
                    <ul>
                      <li>
                        <a href="#">
                          English <i className="fa fa-angle-down"></i>
                        </a>
                      </li>
                      <li>
                        <span className="br">|</span>
                      </li>
                    </ul>
                  </div>
                  <div className="currency-bar pull-right">
                    <ul>
                      <li>
                        <a href="#">
                          INR <i className="fa fa-angle-down"></i>
                        </a>
                      </li>
                      <li>
                        <span>|</span>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {access_token ? (
          <div className="container my-2">
            <div
              className="alert alert-success alert-dismissible fade show"
              role="alert"
            >
              <strong>ICode - </strong> Login Successfully.
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="alert"
                aria-label="Close"
              ></button>
            </div>
          </div>
        ) : (
          ""
        )}

        <div className="sticker header-bottom">
          <div className="container-fluid">
            <div className="row align-items-center">
              <div className="col-lg-2">
                <div className="logo">
                  <Link to="/">
                    <img src={Logo} alt="logo" />
                  </Link>
                </div>
              </div>
              <div className="col-lg-8">
                <div className="mainmenu">
                  <nav>
                    <ul>
                      <li>
                        <Link to="/">
                          Home <b className="caret"></b>
                        </Link>
                      </li>
                      <li>
                        <Link to="ecom/products">
                          <span className="text-label label-featured">
                            Featured
                          </span>
                          Shop
                          <b className="caret"></b>
                        </Link>
                      </li>
                      <li>
                        <Link to="/about">
                          About Us
                          <b className="caret"></b>
                        </Link>
                      </li>
                      <li>
                        <Link to="/blogs">
                          <span className="text-label label-hot">Hot</span>
                          Blog <b className="caret"></b>
                        </Link>
                      </li>
                      <li>
                        <Link to="/contact">Contact</Link>
                      </li>
                      <li>
                        <Link to="/dashboard">DashBoard</Link>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
              <div className="col-lg-2">
                <div className="register-login pull-right">
                  {access_token ? (
                    <>
                      <Link to="/" onClick={handleClick}>
                        Logout {userData.first_name} {userData.last_name}
                      </Link>
                    </>
                  ) : (
                    <>
                      <Link to="/signup">Register</Link>
                      <span>/</span>
                      <Link to="/login">Sign in</Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="products-search">
          <div className="container-fluid">
            <div className="row ">
              <div className="col-xl-2 col-lg-3">
                <div className="collapse-menu mt-0">
                  <ul>
                    <li>
                      <a href="javascript:void(0);" className="vm-menu"  onClick={handleStyle}>
                        <i className="fa fa-navicon"></i>
                        <span>All Departments</span>
                      </a>
                      <ul className="vm-dropdown" style={{display:active}} >
                        {catData.slice(0, 14).map((item) => {
                          return (
                            <li>
                              <Link to={"ecom/category/" + `${item.slug}`}>
                                <i className="fa fa-laptop"></i>
                                {item.name} <b className="caret"></b>
                              </Link>

                              {/* <ul className="mega-menu">
                            <li className="megamenu-single">
                              <span className="mega-menu-title">Shop Page</span>
                              <ul>
                                <li>
                                  <a href="#">Products Block Top</a>
                                </li>
                                
                              </ul>
                            </li>
                          </ul> */}
                            </li>
                          );
                        })}
                      </ul>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="col-xl-6 col-lg-6">
                <div className="search-box">
                  <select>
                    <option>All Categories</option>
                  </select>
                  
                  <input type="text" placeholder="What do you need?" 
                  value={search}
                  onChange = {(e) => setSearch(e.target.value)}
                  />
                  <button onClick={handleSearch}>Search</button>

                </div>
              </div>
              <div className="col-xl-4 col-lg-3">
                <div className="mini-cart pull-right">
                  <ul>
                    <li>
                      <a href="#" title="Track Your Order">
                        <i className="ti-truck"></i>
                      </a>
                    </li>
                    {/* <li>
                      <a href="#">
                        <i className="icon_heart_alt"></i>
                        <span>1</span>
                      </a>
                    </li> */}
                    <li>
                      <a href="javascript:void(0);" className="minicart-icon">
                        <i className="icon_bag_alt"></i>
                        <span></span>
                      </a>
                      <div className="cart-dropdown">
                        <ul></ul>

                        <div className="mini-cart-checkout">
                          <Link
                            to="/ecom/mycart"
                            className="btn-common view-cart"
                          >
                            VIEW CARD
                          </Link>
                          <Link
                            to="/ecom/checkout"
                            className="btn-common checkout mt-10"
                          >
                            CHECK OUT
                          </Link>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Top;
