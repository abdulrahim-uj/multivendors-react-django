import React,{useEffect,useState} from "react";
import { useGetCategoryQuery } from "../../../../services/UserAuthApi";

function CategoryFilterSideBar() {
  const [checked, setChecked] = useState(false);

  const [catData, setCatData] = useState([]);
  const CategoryData = useGetCategoryQuery();

  useEffect(() => {
    if (CategoryData.data && CategoryData.isSuccess) {
      setCatData(CategoryData.data);
    }
  }, [CategoryData.data, CategoryData.isSuccess]);

  const HandleFilter = ((category_name) => {
    console.log("Click :" ,category_name)
  })

  return (
    <>
      <div className="list-filter mt-43">
        <div className="section-title">
          <h3>Category Filter</h3>
        </div>
        <ul className="list-none mt-25">
          {catData.slice(0, 20).map((item) => {
            return (
              <li>
                <input 
                key={item.id}
                type="checkbox" 
                onClick={() => {HandleFilter(item.name)}} 
                id="filterbycategory" 
                />
                <label for={item.name}>{item.name}</label>
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default CategoryFilterSideBar;
