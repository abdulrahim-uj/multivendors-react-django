import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { getToken } from "../services/LocalStorageService";
import { useChangeUserPasswordMutation } from "../services/UserAuthApi";
import { useSelector } from "react-redux";

function ChangePassword() {
  const [password, setPassword] = useState("");
  const [confirm_password, setCPassword] = useState("");
  const [server_error, setServerError] = useState({});
  const [changeUserPassword, { isLoading }] = useChangeUserPasswordMutation();
  const { access_token } = getToken();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const actualData = {
      password,
      confirm_password,
    };
    const res = await changeUserPassword({ actualData, access_token });
    if (res.error) {
      setServerError(res.error.data.errors);
      // console.log(res.error);
    }
    if (res.data) {
      setServerError(res.data);
      const input = document.getElementById('exampleInputEmail1')
      input.value = ""
    }
  };
  // Getting User Data from Redux Store
  const myData = useSelector((state) => state.user);
  // console.log("Change Password", myData)

  return (
    <>
      <Helmet>
        <title>Django With React | Change Password</title>
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
        <h3 className="my-2">Change Password </h3>
        <hr />
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={confirm_password}
              onChange={(e) => setCPassword(e.target.value)}
              required
            />
          </div>

          {server_error.message ? (
            <div className="alert alert-success my-3" role="alert">
              {server_error.message}
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
        </form>
        <Link to="/dashboard" className="btn btn-outline-secondary my-3 mx-2">
          Back To Dashboard
        </Link>
      </div>
    </>
  );
}

export default ChangePassword;
