import React from "react";

function Pagination() {
  return (
    <>
      <div className="row align-items-center mt-30">
        <div className="col-lg-6">
          <div className="site-pagination">
            <ul>
              <li>
                <a href="#" className="active">
                  1
                </a>
              </li>
              <li>of</li>
              <li>
                <a href="#">3</a>
              </li>
              <li>
                <a href="#">
                  <i className="fa fa-long-arrow-right"></i>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="col-lg-6">
          <div className="product-results pull-right">
            <span>Showing 1–3 of 60 results</span>
            <div className="products-sort ml-35 mr-0">
              <form>
                <label>Show :</label>
                <select>
                  <option>12</option>
                  <option>8</option>
                  <option>4</option>
                </select>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Pagination;
