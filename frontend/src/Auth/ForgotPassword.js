import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSendPasswordResetEmailMutation } from "../services/UserAuthApi";
import { Helmet } from "react-helmet";

function ForgotPassword() {
  const [server_error, setServerError] = useState({});
  const [server_msg, setServerMsg] = useState({});
  const [email, setEmail] = useState("");

  
  const [sendPasswordResetEmail, { isLoading }] =
    useSendPasswordResetEmailMutation();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      email,
    };

    const res = await sendPasswordResetEmail(actualData);
    if (res.error) {
      setServerMsg({});
      setServerError(res.error.data.errors);
    }
    if (res.data) {
      setServerError(res.data);
      var id = document.getElementById("exampleInputEmail1")
      id.value = ""
    }
  };

  return (
    <>
      <Helmet>
        <title>Django With React | Forgot Password</title>
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
        <h3 className="my-2">Forgot Password </h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <div id="emailHelp" className="form-text">
              We'll never share your username with anyone else.
            </div>
          </div>

          {server_error. msg ? (
            <div className="alert alert-success my-3" role="alert">
              {server_error. msg}
            </div>
          ) : (
            ""
          )}

          {server_error.non_field_errors ? (
            <div className="alert alert-danger my-3" role="alert">
              {server_error.non_field_errors[0]}
            </div>
          ) : (
            ""
          )}

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>

          <Link to="/login" className="btn btn-outline-secondary my-3 mx-2">
            Back To Login
          </Link>
        </form>
      </div>
    </>
  );
}

export default ForgotPassword;
