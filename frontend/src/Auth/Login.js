import React,{useState,useEffect} from "react";
import {useNavigate,Link}   from "react-router-dom";
import { Helmet } from 'react-helmet';
import { useLoginMutation } from "../services/UserAuthApi";

import { useDispatch } from 'react-redux';
import {storeToken,getToken} from '../../src/services/LocalStorageService';
import {setUserToken} from '../../src/features/authSlice';

function Login() {
  const [server_error, setServerError] = useState({})
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  const [loginUser, { isLoading }] = useLoginMutation()
  const dispatch = useDispatch()

  let navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualData = {
      username,
      password
    }


    const res = await loginUser(actualData)
    if (res.error) {
      setServerError(res.error.data.errors)
      
    }
    if (res.data) {
      storeToken(res.data.token)
      let { access_token } = getToken()
      dispatch(setUserToken({ access_token: access_token }))
      navigate('/dashboard')
    }
  }

  let { access_token } = getToken()
  useEffect(() => {
    dispatch(setUserToken({ access_token: access_token }))
  }, [access_token, dispatch])




  return (
    <>
      <Helmet>
        <title>Django With React | Login</title>
      </Helmet>
      <div className="container m-10" style={{
          color: "green",
          paddingLeft: "21%",
          paddingRight: "28%",
          marginTop: "18px",
          backgroundColor: "rgb(248,249,250)",
          borderRadius: "4px",
          marginBottom: "15%",
        }}>
        <h3 className="my-2">Login </h3>
        <hr/>
        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label className="form-label">User Number</label>
            <input
              pattern="\d*" 
              maxlength="10"
              onKeyPress = {(e) => (e.target.value.length==10)}
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
            <label  className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          {server_error.password ? <div className="alert alert-danger my-3" role="alert">{server_error.password[0]}</div> : ""}
          {server_error.non_field_errors ? <div className="alert alert-danger my-3" role="alert">{server_error.non_field_errors[0]}</div> : ""}

      

          <button type="submit" className="btn btn-primary my-3">
            Submit
          </button>

          <Link to="/signup" className="btn btn-outline-secondary my-3 mx-2">
            Create a Account
          </Link>

          <Link to="/forgot-password" className="btn btn-outline-primary my-3 mx-2">
            Forgot Password
          </Link>

        </form>
        
      </div>
    </>
  );
}

export default Login;
