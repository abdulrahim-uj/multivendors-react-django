import React,{useState} from "react";
import { Helmet } from "react-helmet";
import { useNavigate, Link } from "react-router-dom";
import { useResetPasswordMutation } from "../services/UserAuthApi";


function ResetPassword() {
    const [password,setPassword] = useState("")
    const [confirm_password,setCPassword] = useState("")
    const [server_error, setServerError] = useState({});
    const [resetPassword, { isLoading }] = useResetPasswordMutation();
    

    // split url data -> id,token
    const url_data = location.pathname.replace("/reset-password/", "");
    const data = url_data.split('/')
    const id = data[0]
    const token = data[1]

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData(e.currentTarget);
        const actualData = {
            password,
            confirm_password,
        }
        const res = await resetPassword({ actualData, id, token })
        if (res.error) {
          setServerError(res.error.data.errors)
        }
        if (res.data) {
            setServerError(res.data)
            const input = document.getElementById('exampleInputEmail1')
            input.value = ""
          setTimeout(() => {
            navigate("/login")
          }, 3000)
        }
    
      }

  return (
    <>
      <Helmet>
        <title>Django With React | Reset Password</title>
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
        <h3 className="my-2">Reset Password </h3>
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

          {server_error.msg ? (
            <div className="alert alert-success my-3" role="alert">
              {server_error.msg}
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
      </div>
    </>
  );
}

export default ResetPassword;
