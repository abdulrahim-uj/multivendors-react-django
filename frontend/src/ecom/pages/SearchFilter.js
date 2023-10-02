import React, { useEffect, useState, useHistory } from "react";
import { useSearchFilterMutation } from "../../services/UserAuthApi";
import CategoryCard from "../Components/CategoryPage/CategoryCard";
import { useParams } from "react-router-dom";


function SearchFilter(props) {
  const { slug } = useParams();

  const [product, setProduct] = useState([]);
  const [SearchFilter, { isLoading }] = useSearchFilterMutation();

  useEffect(() => {
    const func_data = async () => {
      const search_url = location.pathname.split("/")[3];
      const actualData = { search_url };
      const res = await SearchFilter(actualData);
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

export default SearchFilter;
