import React, { useEffect, useState } from "react";
import { useGetProductQuery } from "../../../../services/UserAuthApi";
import { Link } from "react-router-dom";

function LatestSideBar() {
  const [product, setProduct] = useState([]);

  const ProductData = useGetProductQuery();

  useEffect(() => {
    if (ProductData.data && ProductData.isSuccess) {
      setProduct(ProductData.data);
    }
  });

  return (
    <>
      <div className="products-list mt-30">
        <div className="section-title mb-30">
          <h3>Latest Items</h3>
        </div>
        <div className="one-carousel dots-none">
          <div>
            <ul className="list-none">
              {product.slice(0,4).map((item) => {
                return (
                  <li key={item.id}>
                    <div className="product-single style-2">
                      <div className="row align-items-center m-0">
                        <div className="col-lg-4 p-0">
                          <div className="product-thumb">
                            <Link to={item.slug}>
                              <img src={item.image_3} alt={item.title} />
                            </Link>
                          </div>
                        </div>
                        <div className="col-lg-8 p-0">
                          <div className="product-title">
                            <h4>
                              <Link to={item.slug}>{item.short_title}</Link>
                            </h4>
                          </div>
                          <div className="product-price-rating">
                            <span>{item.price}</span>
                            <del>{item.discount_price}</del>
                          </div>
                        </div>
                      </div>
                    </div>
                  </li>
                );
              })}
              <div class="product-single style-2">

              </div>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
}

export default LatestSideBar;
