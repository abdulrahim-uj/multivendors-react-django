import React from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import OurTeam from "./OurTeam";


export default function About() {

  return (
    <>
      <Helmet>
        <title>Django With React | About</title>
      </Helmet>

      <div className="bg-light">
        <div className="container py-5">
          <div className="row h-100 align-items-center py-5">
            <div className="col-lg-6">
              <h1 className="display-4">About us</h1>
              <p className="lead text-muted mb-0">
                DanMojo.com
              </p>
              <p className="lead text-muted"></p>
            </div>
            <div className="col-lg-6 d-none d-lg-block">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/illus.png"
                alt=""
                className="img-fluid"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white py-5">
        <div className="container py-5">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 order-2 order-lg-1">
              <i className="fa fa-bar-chart fa-2x mb-3 text-primary"></i>
              <h2 className="font-weight-light">Software Development </h2>
              <p className="font-italic text-muted mb-4">
                We are a software development company and we are passionate
                about delivering strong, robust software solutions to our
                clients. We specialise in online web systems that can solve many
                of the problems that businesses face as they grow and adapt to a
                changing marketplace. Our team are highly skilled based software
                developers who have long-term experience across a wide range of
                technologies and industries. Whether you need specific skills or
                ongoing support, we have the people to help you.
              </p>
              
            </div>
            <div className="col-lg-5 px-5 mx-auto order-1 order-lg-2">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/img-1.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
          </div>
          <div className="row align-items-center">
            <div className="col-lg-5 px-5 mx-auto">
              <img
                src="https://bootstrapious.com/i/snippets/sn-about/img-2.jpg"
                alt=""
                className="img-fluid mb-4 mb-lg-0"
              />
            </div>
            <div className="col-lg-6">
              <i className="fa fa-leaf fa-2x mb-3 text-primary"></i>
              <h2 className="font-weight-light">Our Mission</h2>
              <p className="font-italic text-muted mb-4">
                Our mission is to enhance business growth of our customers with
                creative design, development and to deliver market defining high
                quality solutions that create value and reliable competitive
                advantage to customers around the globe.
              </p>
              
            </div>
          </div>
        </div>
      </div>

      <OurTeam />
    </>
  );
}
