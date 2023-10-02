import React, { useState, useEffect } from "react";
import HomeAfterCategory from "./CategoryFilter/HomeAfterCategory";
import { useGetCategoryQuery } from "../../../services/UserAuthApi";
import { Link } from "react-router-dom";

function Category() {

  const [catData, setCatData] = useState([]);
  const CategoryData = useGetCategoryQuery();

  useEffect(() => {
    if (CategoryData.data && CategoryData.isSuccess) {
      setCatData(CategoryData.data);
    }
  }, [CategoryData.data, CategoryData.isSuccess]);





  return (
    <>
      <div className="col-xl-10 col-lg-9 fix">
        <div className="product-categories mt-sm-40">
          <div className="row">
            <div className="col-lg-12">
              <div className="section-title">
                <h3>Top Categories</h3>
              </div>
            </div>
          </div>

          <div className="row product-categories-carousel mt-30">
            {catData.slice(0, 8).map((item) => {
              return (
                <div className="col-lg-3" style={{display:'inline-block',marginTop:'5'}}>
                  <div className="single-product-cat">
                    <Link to={"ecom/category/" + `${item.slug}`}>
                      <img src={item.image} alt={item.name} />
                    </Link>
                    <h4>
                    <Link to={"ecom/category/" + `${item.slug}`}>{item.name}</Link>
                    </h4>
                  </div>
                </div>
              );
            })}
           
          </div>

  
        </div>

        {/* Home Category After Slider */}
        <HomeAfterCategory />
      </div>
    </>
  );
}

export default Category;
