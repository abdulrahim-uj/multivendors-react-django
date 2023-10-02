import React from 'react'
import { Helmet } from 'react-helmet';
import { Navigate, Link } from "react-router-dom";

function PageNotFound() {
  return (
    <>
    <Helmet>
      <title>Django With React | Page not Found</title>
    </Helmet>
    <main className="bg-light py-5">
        <div className="container">
          <h1 className="mt-5">Page Not Found (404)</h1>
          
          <p><Link to="/">Back to Home</Link></p>
        
        </div>
      </main>
    </>
  )
}

export default PageNotFound;
