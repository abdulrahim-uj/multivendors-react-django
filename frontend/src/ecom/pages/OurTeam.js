import React, { useState, useEffect } from "react";

function OurTeam() {
  const [data, setTeamData] = useState([]);
  useEffect(() => {
    const teamdata = fetch("http://127.0.0.1:8000/apiteam/")
      .then((response) => response.json())
      .then((rdata) => setTeamData(rdata));
  }, []);

  return (
    <>
    <div className="bg-light py-5">
      <div className="container py-5">
        <div className="row mb-1">
          <div className="col-lg-5">
            <h2 className="display-4 font-weight-light">Our team</h2>
            </div>
        </div>
      </div>
    </div>
    
      <div className="row text-center">
        {data.map((item) => {
          return (
            <div className="col-xl-3 col-sm-6 mb-5" key={item.id}>
              <div className="bg-white rounded shadow-sm py-5 px-4">
                <img
                  src={item.icon}
                  alt=""
                  width="100"
                  className="img-fluid rounded-circle mb-3 img-thumbnail shadow-sm"
                />
                <h5 className="mb-0">{item.name}</h5>
                <span className="small text-uppercase text-muted">
                  {item.designation}
                </span>
                <ul className="social mb-0 list-inline mt-3">
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-facebook-f"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                  <li className="list-inline-item">
                    <a href="#" className="social-link">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </>
  );
}

export default OurTeam;
