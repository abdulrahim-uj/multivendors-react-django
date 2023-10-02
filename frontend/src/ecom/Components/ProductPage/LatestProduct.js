import React,{useState,useEffect} from "react";
import { useGetProductQuery } from "../../../services/UserAuthApi";
import { Link } from "react-router-dom";

function LatestProduct() {
  const [product, setProduct] = useState([]);

  const ProductData = useGetProductQuery();

  useEffect(() => {
    if (ProductData.data && ProductData.isSuccess) {
      setProduct(ProductData.data);
    }
  });

  return (
    <>
      <div className="recent-viewed-products mt-50">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title">
              <h3>Recently Viewed Products</h3>
            </div>
          </div>
        </div>
        <div className="row recent-products mlr-minus-12">
          {product.slice(0, 6).map((item) => {
            return (
              <div className="col-lg-4">
                <div className="product-single style-2">
                  <div className="row align-items-center">
                    <div className="col-lg-6 p-0">
                      <div className="product-thumb">
                        <Link to={"/ecom/products/" + `${item.slug}`}>
                          <img  width="140" height="157" src={item.image_2} alt={item.title} />
                        </Link>
                      </div>
                    </div>
                    <div className="col-lg-6 p-0">
                      <div className="product-title">
                        <small>
                          <Link to={item.category_slug}>{item.category_name}</Link>
                        </small>
                        <h4>
                          <Link to={"/ecom/products/" + `${item.slug}`}>{item.short_title}</Link>
                        </h4>
                      </div>
                    
                      <div className="product-price-rating">
                        <span>{item.price}</span>
                        <del>{item.discount_price}</del>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default LatestProduct;
