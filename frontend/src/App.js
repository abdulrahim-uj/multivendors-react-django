import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Redirect,
  Navigate,
} from "react-router-dom";

// iCOM
import Home from "./ecom/pages/Home";
import Header from "./ecom/pages/Header";
import Footer from "./ecom/pages/Footer";
import PageNotFound from "./ecom/pages/PageNotFound";
import Login from "./Auth/Login";
import Signup from "./Auth/Signup";
import ChangePassword from "./Auth/ChangePassword";
import ForgotPassword from "./Auth/ForgotPassword";
import ResetPassword from "./Auth/ResetPassword";

import Contact from "./ecom/pages/Contact";
import About from "./ecom/pages/About";
import Main from "./DashBoard/Main";
import Orders from "./DashBoard/Orders";

import CategoryPage from "./ecom/pages/CategoryPage";
import ProductPage from "./ecom/pages/ProductPage";
import ProductDetails from "./ecom/pages/ProductDetails";
import MyCart from "./ecom/pages/MyCart";
import CheckOut from "./ecom/pages/CheckOut";
import SearchFilter from "./ecom/pages/SearchFilter";

import Blog from "./Blog/Blog";
import PostDetails from "./Blog/PostDetails";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setUserCard } from "./features/cartSlice";
import { getToken } from "./services/LocalStorageService";

function App() {
  const dispatch = useDispatch();

  // const { access_token } = getToken()
  const { access_token } = useSelector((state) => state.auth);

  return (
    <>
      <Router>
        <Routes>
          <Route
            path="/*"
            element={
              <>
                <Header title="iCode" />
                <Routes>
                  {/* Auth Section Start */}
                  <Route
                    path="signup"
                    element={!access_token ? <Signup /> : <Navigate to="/" />}
                  />
                  <Route
                    path="login"
                    element={!access_token ? <Login /> : <Navigate to="/" />}
                  />
                  <Route
                    path="forgot-password"
                    element={
                      !access_token ? <ForgotPassword /> : <Navigate to="/" />
                    }
                  />
                  <Route
                    path="changepassword"
                    element={
                      access_token ? <ChangePassword /> : <Navigate to="/" />
                    }
                  />
                  <Route
                    path="reset-password/:uid/:token"
                    element={
                      !access_token ? (
                        <ResetPassword />
                      ) : (
                        <Navigate to="/login" />
                      )
                    }
                  />

                  {/* Auth Section End */}

                  {/* Start Product */}
                  <Route
                    path="ecom/category/:slug"
                    element={
                      <>
                        <CategoryPage />
                      </>
                    }
                  />

                  <Route
                    path="ecom/search/:slug"
                    element={
                      <>
                        <SearchFilter />
                      </>
                    }
                  />

                  <Route
                    path="ecom/category/:slug/:slug"
                    element={
                      <>
                        <ProductDetails />
                      </>
                    }
                  />

                  <Route
                    path="ecom/products"
                    element={
                      <>
                        <ProductPage />
                      </>
                    }
                  />
                  <Route
                    path="ecom/products/:slug"
                    element={
                      <>
                        <ProductDetails />
                      </>
                    }
                  />

                  <Route
                    path="ecom/mycart"
                    element={
                      access_token ? <MyCart /> : <Navigate to="/login" />
                    }
                  />

                  <Route
                    path="ecom/checkout"
                    element={
                      access_token ? <CheckOut /> : <Navigate to="/login" />
                    }
                  />

                  <Route
                    path="ecom/orders"
                    element={
                      access_token ? <Orders /> : <Navigate to="/login" />
                    }
                  />

                  {/* End Product */}

                  {/* Pages Start */}
                  <Route
                    exact
                    path=""
                    element={
                      <>
                        {" "}
                        <Home />{" "}
                      </>
                    }
                  />
                  <Route
                    exact
                    path="contact"
                    element={
                      <>
                        {" "}
                        <Contact />{" "}
                      </>
                    }
                  />
                  <Route
                    exact
                    path="about"
                    element={
                      <>
                        {" "}
                        <About />{" "}
                      </>
                    }
                  />
                  {/* Pages End */}

                  {/* Blog Section Start*/}
                  <Route
                    exact
                    path="blogs"
                    element={
                      <>
                        {" "}
                        <Blog />{" "}
                      </>
                    }
                  />
                  <Route
                    exact
                    path="blogs/:slug"
                    element={
                      <>
                        {" "}
                        <PostDetails />{" "}
                      </>
                    }
                  />
                  {/* Blog Section End */}
                  <Route path="*" element={<PageNotFound />} />
                </Routes>
                <Footer />
              </>
            }
          />
          <Route
            path="/dashboard"
            element={access_token ? <Main /> : <Navigate to="/login" />}
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;