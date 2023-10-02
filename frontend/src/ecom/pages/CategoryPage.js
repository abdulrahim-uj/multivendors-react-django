import React, { useEffect, useState, useHistory } from "react";
import { useCategoryFilterMutation } from "../../services/UserAuthApi";
import CategoryCard from "../Components/CategoryPage/CategoryCard";
import { useParams } from "react-router-dom";


function CategoryPage(props) {
  const { slug } = useParams();

  const [product, setProduct] = useState([]);
  const [CategoryFilter, { isLoading }] = useCategoryFilterMutation();

  useEffect(() => {
    const func_data = async () => {
      const category_url = location.pathname.split("/")[3];
      const actualData = { category_url };
      const res = await CategoryFilter(actualData);
      if (res.error) {
        console.log(res.error);
      }
      if (res.data) {
        setProduct(res.data);
      }
    };
    func_data();
  }, [slug]);

  return (
    <>
      {isLoading ? (
        <>
          <h3>Loading..</h3>
        </>
      ) : (
        <>
          <CategoryCard data={product} />
        </>
      )}
    </>
  );
}

export default CategoryPage;
