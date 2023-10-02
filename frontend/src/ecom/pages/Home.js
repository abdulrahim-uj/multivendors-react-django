import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Slider from "../Components/Home/Slider";
import Product from "../Components/Home/Product";

import { getToken } from "../../services/LocalStorageService";
import { setUserInfo } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useGetLoggedUserQuery } from "../../services/UserAuthApi";


function Home() {
  const { access_token } = getToken();

  const dispatch = useDispatch();

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



  return (
    <>
      <Helmet>
        <title>Home - iCom</title>
      </Helmet>

      <div>
        <Slider />
        <Product />
      </div>
    </>
  );
}

export default Home;
