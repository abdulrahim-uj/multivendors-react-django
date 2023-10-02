import React, { useState, useEffect } from "react";
import { Link,Navigate } from "react-router-dom";
import { Helmet } from 'react-helmet';


function Contact() {
  const [res, setRes] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  function handlesubmit(evt) {
    evt.preventDefault();
    if (name == "" || message == "" || email == "") {
      setRes("Plzz Fill The All Details");
    } else {
      fetch("http://127.0.0.1:8000/contact", {
        method: "POST",
        body: JSON.stringify({
          name,
          email,
          message,
        }),
        mode: "same-origin",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }).then((response) => {
        if (response.status == 200) {
          setRes("Successfully Submit");
        } else {
          setRes("Something went wrong");
        }
      });
    }
  }

  return (
    <>
    <Helmet>
      <title>Django With React | Contact</title>
    </Helmet>

    <div className="bg-light">
      <div className="container">
        <div className="row h-100 align-items-center py-5">
          <div className="col-lg-6">
            <h1 className="display-4">Contact Us </h1>
            <p className="lead text-muted mb-0">iCode.com</p>
            
          </div>
          <div className="col-lg-6 d-none d-lg-block"><img src="https://cutewallpaper.org/24/contact-us-png/contact-7dda7-us-668de-vector-f87c2-png-415ca-transparent-f9486-png-ea13f-kindpng.png" alt="" className="img-fluid"/></div>
        </div>
      </div>
    </div>

      <div className="container m-4">
        <h2>Contact Us</h2>
        <hr/>
        <form onSubmit={handlesubmit}>
          <div className="mb-3">
            <label for="exampleInputEmail1" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <div id="emailHelp" className="form-text">
              We'll never share your email with anyone else.
            </div>
          </div>

          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="exampleInputPassword1"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>


          <div className="mb-3">
            <label for="exampleInputPassword1" className="form-label">
              Message
            </label>
            <textarea
              className="form-control"
              id="exampleInputPassword1"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
          </div>

          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
        <div className="alert alert-secondary my-3" role="alert">
          {res}
        </div>
      </div>
    </>
  );
}

export default Contact;
