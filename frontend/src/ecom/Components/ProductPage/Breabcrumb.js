import React from "react";
import { Link } from "react-router-dom";

function Breabcrumb(props) {
  return (
    <>
      <div className="breadcrumb-area mt-25">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <div className="breadcrumbs">
                <ul>
                  <li>
                    <Link to="/">
                      Home <i className="fa fa-angle-right"></i>
                    </Link>
                  </li>
                  <li>
                    <Link to="#">
                      Shop<i className="fa fa-angle-right"></i>
                    </Link>
                  </li>
                  {/* <li>Shop Grid 05 Col</li> */}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Breabcrumb;
