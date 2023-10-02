import React from "react";
import Content from "./Content";
import "../../public/style.css";
import "../../public/dash.css";
import { Helmet } from "react-helmet";
// import '../../public/extra.css'
import { Link } from "react-router-dom";
import { removeToken } from "../services/LocalStorageService";
import { useDispatch } from "react-redux";
import { unSetUserToken } from "../features/authSlice";

function Main(props) {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(unSetUserToken({ access_token: null }));
    removeToken();
    navigate("/", { replace: true });
  };

  
  return (
    <>
      <Helmet>
        <title>Django With React | Dashboard</title>
      </Helmet>


      <main>
        <div className="container">
          <section className="mb-1">
            <Link class="m-2 btn btn-primary" to="/dashboard" >My Account</Link>
            <Link class="m-2 btn btn-secondary" to="/ecom/orders" >Orders</Link>
            <Link class="m-2 btn btn-info" to="/ecom/mycart" >My Cart</Link>
            <Link class="m-2 btn btn-success" to="/changepassword" >Change Password</Link>
            <Link class="m-2 btn btn-dark" to="/" onClick={handleClick}>Logout</Link>
          </section>

          {/* <Content /> */}
        </div>
      </main>
    </>
  );
}

export default Main;
