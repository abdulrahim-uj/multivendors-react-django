"use strict";
import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useRegistraitonMutation } from "../services/UserAuthApi";
import {getToken,storeToken} from '../../src/services/LocalStorageService';

function Signup(props) {
  let { access_token } = getToken()

  const [res,setRes] = useState("")
  const [server_error, setServerError] = useState({})
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [confirm_password, setCPassword] = useState("");

  const [registerUser, { isLoding }] = useRegistraitonMutation();

  let navigate = useNavigate();

  const handleSubmit = async (evt) => {
    evt.preventDefault();
      const data = new FormData(evt.currentTarget);
      const actualData = {
        username,
        email,
        first_name,
        last_name,
        password,
        confirm_password,
      };
      const res = await registerUser(actualData);
      if (res.error) {
        setServerError(res.error.data.errors)
      }
      if (res.data) {
        setRes(res.data.message)
        storeToken(res.data.token)
        navigate('/login')
      }
  };

  return (
    <>
    {!access_token ?
    <>
      <Helmet>
        <title>Django With React | Signup</title>
      </Helmet>
      <div
        className="container m-10"
        style={{
          color: "green",
          paddingLeft: "21%",
          paddingRight: "28%",
          marginTop: "18px",
          backgroundColor: "rgb(248,249,250)",
          borderRadius: "4px",
          marginBottom: "15%",
        }}
      >
        <h3 className="my-2">Signup </h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">User Number</label>
            <input
            pattern="/^-?\d+\.?\d*$/"
            maxlength="10"
            minlength="10"
              type="number"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your username with anyone else.
            </div>
          </div>

          {server_error.username ? <div className="alert alert-danger my-3" role="alert">{server_error.username[0]}</div> : ""}

          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputPassword1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          {server_error.email ? <div className="alert alert-danger my-3" role="alert">{server_error.email[0]}</div> : ""}

          <div className="mb-3">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={first_name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          {server_error.first_name ? <div className="alert alert-danger my-3" role="alert">{server_error.first_name[0]}</div> : ""}


          <div className="mb-3">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              id="exampleInputPassword1"
              value={last_name}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          {server_error.last_name ? <div className="alert alert-danger my-3" role="alert">{server_error.last_name[0]}</div> : ""}


          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {server_error.password ? <div className="alert alert-danger my-3" role="alert">{server_error.password[0]}</div> : ""}


          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="cpassword"
              className="form-control"
              id="exampleInputPassword1"
              value={confirm_password}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>

          {server_error.confirm_password ? <div className="alert alert-danger my-3" role="alert">{server_error.confirm_password[0]}</div> : ""}
          {server_error.non_field_errors ? <div className="alert alert-danger my-3" role="alert">{server_error.non_field_errors[0]}</div> : ""}


          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>

          <Link to="/login" className="btn btn-outline-secondary my-3 mx-2">
            Already Have a Account ?
          </Link>
        </form>
        
      </div>
      </> : <p>Loading</p>}
    </>
  );
}

export default Signup;
