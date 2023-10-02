import React, { useState, useEffect } from "react";
import { useGetCategoryQuery } from "../../../../services/UserAuthApi";
import { Link,useParams } from "react-router-dom";


function CategoryListSideBar() {
  const slug = useParams()
  console.log(slug)
  const [catData, setCatData] = useState([]);
  const CategoryData = useGetCategoryQuery();

  useEffect(() => {
    if (CategoryData.data && CategoryData.isSuccess) {
      setCatData(CategoryData.data);
    }
  }, [CategoryData.data, CategoryData.isSuccess]);

  return (
    <>
      <div className="vertical-menu">
        <ul>
          {catData.slice(0,20).map((item) => {
            return (
              <li>
                <Link to={"../ecom/category/" + `${item.slug}`}>{item.name}</Link>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CategoryListSideBar;
