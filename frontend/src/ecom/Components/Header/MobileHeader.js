import React,{useState,useEffect} from "react";
import { Link } from "react-router-dom";
import { useGetCategoryQuery } from "../../../services/UserAuthApi";

function MobileHeader() {
  const [catData, setCatData] = useState([]);
  const CategoryData = useGetCategoryQuery();

  useEffect(() => {
    if (CategoryData.data && CategoryData.isSuccess) {
      setCatData(CategoryData.data);
    }
  }, [CategoryData.data, CategoryData.isSuccess]);

  return (
    <>
      <div className="row mt-sm-10">
        <div className="col-lg-12">
          <a href="#my-menu" className="mmenu-icon pull-left">
            <i className="fa fa-bars"></i>
          </a>

          <div className="mainmenu">
            <nav id="my-menu">
              <ul>
                <li>
                  <Link to="/">
                    Home <b className="caret"></b>
                  </Link>
                </li>
                <li>
                  <Link to="/ecom/products">
                    <span className="text-label label-featured">Hot</span>
                    Shop
                  </Link>
                </li>
                <li>
                  <Link to="/about">
                    About
                    <b className="caret"></b>
                  </Link>
                </li>
                <li>
                  <Link to="/blogs">
                    Blog <b className="caret"></b>
                  </Link>
                </li>
                <li>
                  <Link to="/contact">Contact</Link>
                </li>
                <li>
                  <Link to="/dashboard">Dashboard</Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="collapse-menu mt-0 pull-right">
            <ul>
              <li>
                <a href="javascript:void(0);" className="vm-menu">
                  <i className="fa fa-navicon"></i>
                  <span>All Departments</span>
                </a>
                <ul className="vm-dropdown">
                  {catData.slice(0, 14).map((item) => {
                      return (
                        <li>
                          <Link to={"ecom/category/" + `${item.slug}`}>
                            <i className="fa fa-laptop"></i>
                            {item.name} <b className="caret"></b>
                          </Link>

                        </li>
                      );
                    })}


                </ul>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default MobileHeader;
