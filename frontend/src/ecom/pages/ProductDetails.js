import React, { useEffect, useState } from "react";
import Breabcrumb from "../Components/ProductPage/Breabcrumb";
import {
  useGetProductSlugMutation,
  useGetProductReviewMutation,
  useCartMutation,
  useGetCartQuery,
} from "../../services/UserAuthApi";
import { Link, useParams } from "react-router-dom";
import { getToken } from "../../services/LocalStorageService";
import { setUserInfo } from "../../features/userSlice";
import { useDispatch } from "react-redux";
import { useGetLoggedUserQuery } from "../../services/UserAuthApi";

function ProductDetails() {
  const { access_token } = getToken();
  const dispatch = useDispatch();

  const { data, isSuccess } = useGetLoggedUserQuery(access_token);

  const [userData, setUserData] = useState({
    username: "",
    email: "",
    first_name: "",
    last_name: "",
  });

  // Store User Data in Local State
  useEffect(() => {
    if (data && isSuccess) {
      setUserData({
        username: data.username,
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
      });
    }
  }, [data, isSuccess]);

  // Store User Data in Redux Store
  useEffect(() => {
    if (data && isSuccess) {
      dispatch(
        setUserInfo({
          username: data.username,
          email: data.email,
          first_name: data.first_name,
          last_name: data.last_name,
        })
      );
    }
  }, [data, isSuccess, dispatch]);

  const { slug } = useParams();
  const [productSlug, setProductSlug] = useState([]);
  const [reviewData, setReviewData] = useState([]);
  const [SlugProduct, { isLoading }] = useGetProductSlugMutation();

  useEffect(() => {
    const func_data = async () => {
      const actualData = { slug };
      const res = await SlugProduct(actualData);
      if (res.error) {
        console.log(res.error);
      }
      if (res.data) {
        setProductSlug(res.data.slug);
        setReviewData(JSON.parse(res.data.review));
      }
    };
    func_data();
  }, []);

  // Review Area Submit

  const [serverMsg, setServerMsg] = useState();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [review_msg, setReview_msg] = useState("");
  const [username, setUserName] = useState("");
  const [product_id, setProduct_ID] = useState("");

  const [productReview] = useGetProductReviewMutation();

  const handleSubmit = async (e) => {
    setName(`${userData.first_name}` + ` ${userData.last_name}`);
    setEmail(`${userData.email}`);
    setUserName(`${userData.username}`);
    setProduct_ID(`${productSlug.id}`);

    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const actualDataReview = {
      username: `${userData.username}`,
      product_id: `${productSlug.id}`,
      name: `${userData.first_name}` + ` ${userData.last_name}`,
      email: `${userData.email}`,
      review_msg,
    };

    console.log(actualDataReview);
    const res = await productReview(actualDataReview);
    if (res.error) {
      console.log(res.error.data.errors);
    }
    if (res.data) {
      setServerMsg(res.data.message);
    }
    data();
  };

  // GET CART
  const [cartData, setCartData] = useState([]);
  const { datas, isSuccesss } = useGetCartQuery(access_token);

  // Store Cart Data in Local State
  useEffect(() => {
    if (datas && isSuccesss) {
      setCartData(datas.data);
    }
  }, [datas, isSuccesss]);

  // POST CART
  const [Cart] = useCartMutation();
  const handleSubmitCart = async (id) => {
    console.log("Its running");
    const actualData = {
      id,
      hint: "firstcart",
    };
    const res = await Cart({ actualData, access_token });
    if (res.error) {
      console.log(res.error);
    }
    if (res.data) {
      alert(`${res.data.message}`);
    }
  };

  return (
    <>
      <>
        <Breabcrumb />
      </>
      <div className="product-details-area mt-25">
        <div className="container-fluid">
          <div className="product-details">
            <div className="row">
              <div className="col-lg-1 col-md-2">
                <ul className="nav nav-tabs products-nav-tabs">
                  <li>
                    <a className="active" data-toggle="tab" href="#product-1">
                      <img src={productSlug.image_1} alt={productSlug.title} />
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#product-2">
                      <img src={productSlug.image_2} alt={productSlug.title} />
                    </a>
                  </li>
                  <li>
                    <a data-toggle="tab" href="#product-3">
                      <img src={productSlug.image_3} alt={productSlug.title} />
                    </a>
                  </li>
                </ul>
              </div>
              <div className="col-lg-4 col-md-6">
                <div className="tab-content">
                  <div id="product-1" className="tab-pane fade in show active">
                    <div className="product-details-thumb">
                      <a
                        className="venobox"
                        data-gall="myGallery"
                        href={productSlug.image_1}
                      >
                        <i className="fa fa-search-plus"></i>
                      </a>
                      <img
                        width="396"
                        height="376"
                        src={productSlug.image_1}
                        alt={productSlug.title}
                      />
                    </div>
                  </div>
                  <div id="product-2" className="tab-pane fade">
                    <div className="product-details-thumb">
                      <a
                        className="venobox"
                        data-gall="myGallery"
                        href={productSlug.image_2}
                      >
                        <i className="fa fa-search-plus"></i>
                      </a>
                      <img
                        width="396"
                        height="376"
                        src={productSlug.image_2}
                        alt={productSlug.title}
                      />
                    </div>
                  </div>
                  <div id="product-3" className="tab-pane fade">
                    <div className="product-details-thumb">
                      <a
                        className="venobox"
                        data-gall="myGallery"
                        href={productSlug.image_3}
                      >
                        <i className="fa fa-search-plus"></i>
                      </a>
                      <img
                        width="396"
                        height="376"
                        src={productSlug.image_3}
                        alt={productSlug.title}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-7 mt-sm-50">
                <div className="row">
                  <div className="col-lg-8 col-md-7">
                    <div className="product-details-desc">
                      <h2>{productSlug.title}</h2>
                      <p>
                        <div
                          className="card-text"
                          dangerouslySetInnerHTML={{
                            __html: `${productSlug.short_Description}`,
                          }}
                        ></div>
                      </p>

                      <div className="product-meta">
                        <ul className="list-none">
                          <li>
                            SKU: {productSlug.id} <span>|</span>
                          </li>
                          <li>
                            Categories:
                            <Link to="#">{productSlug.category_name}</Link>
                            <span>|</span>
                          </li>
                          <li>
                            Tags:
                            <Link to="#">{productSlug.short_title},</Link>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  <div className="col-lg-4 col-md-5">
                    <div className="product-action stuck text-left">
                      <div className="free-delivery">
                        <Link to="">
                          <i className="ti-truck"></i> Free Delivery
                        </Link>
                      </div>
                      <div className="product-price-rating">
                        <div>
                          <del>{productSlug.discount_price}</del>
                        </div>
                        <span>{productSlug.price}</span>
                        <div className="pull-right">
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star-o"></i>
                        </div>
                      </div>

                      <div className="product-quantity mt-15">
                        <label>Quatity:</label>
                        <input disabled type="number" value="1" />
                      </div>
                      <div className="add-to-get mt-50">
                        {access_token ? (
                          <>
                            <Link
                              to="#"
                              onClick={() =>
                                handleSubmitCart(`${productSlug.id}`)
                              }
                              className="add-to-cart add"
                            >
                              Add To Card
                            </Link>

                            <a href={productSlug.preview_link} target="_blank" className="mt-2 btn btn-success">
                              Preview
                            </a>


                          </>
                        ) : (
                          <>
                            <Link to="/login" className="add-to-cart">
                              Add to Cart
                            </Link>

                            <a href={productSlug.preview_link} className="add-to-cart">
                              Preview
                            </a>


                          </>
                        )}
                      </div>
                      <div className="product-features mt-50">
                        <ul className="list-none">
                          <li>Satisfaction 100% Guaranteed</li>
                          <li>Free shipping on orders over $99</li>
                          <li>14 day easy Return</li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="product-review-area mt-45">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-12">
              <ul className="nav nav-tabs product-review-nav">
                <li>
                  <a className="show active" data-toggle="tab" href="#description">
                    Description
                  </a>
                </li>

                <li>
                  <a data-toggle="tab" href="#reviews" className="show">
                    Theme Reviews
                  </a>
                </li>

                
              </ul>
              <div className="tab-content">
                <div id="description" className="tab-pane fade in show active">
                  <div className="product-description">
                    <p>
                      <div
                        className="card-text"
                        dangerouslySetInnerHTML={{
                          __html: `${productSlug.long_Description}`,
                        }}
                      ></div>
                    </p>
                  </div>
                </div>

                <div id="reviews" className="tab-pane fade in show active">
                  <div className="blog-comments product-comments mt-0">
                    <ul className="list-none">
                      {reviewData.map((item) => {
                        {
                          if (item.status == true) {
                            return (
                              <li>
                                <div className="comment-avatar text-center">
                                  <img
                                    src="https://mdbootstrap.com/img/Photos/Avatars/img%20(23).jpg"
                                    alt={item.name}
                                  />
                                </div>
                                <div className="comment-desc">
                                  <h4>{item.name}</h4>
                                  <p>{item.review}</p>
                                </div>
                              </li>
                            );
                          }
                        }
                      })}
                    </ul>
                  </div>
                  {access_token ? (
                    <>
                      <div className="blog-comment-form product-comment-form mt-05">
                        <h4>
                          <span>Add Review</span>
                        </h4>
                        <form onSubmit={handleSubmit}>
                          <div className="row mt-30">
                            <div className="col-sm-6 single-form">
                              <input
                                type="text"
                                placeholder="Name"
                                disabled
                                value={
                                  `${userData.first_name}` +
                                  ` ${userData.last_name}`
                                }
                              />
                            </div>
                            <div className="col-sm-6">
                              <input
                                type="text"
                                placeholder="Email"
                                disabled
                                value={userData.email}
                              />
                            </div>

                            <div className="col-sm-6">
                              <input type="hidden" value={userData.username} />
                            </div>

                            <div className="col-sm-6">
                              <input type="hidden" value={productSlug.id} />
                            </div>

                            <div className="col-sm-12"></div>
                            <div className="col-sm-12 mt-4">
                              <textarea
                                placeholder="Messages"
                                value={review_msg}
                                onChange={(e) => setReview_msg(e.target.value)}
                                required
                              ></textarea>
                            </div>
                            <div className="col-sm-12">
                              <button className="btn-common mt-25">
                                Submit
                              </button>
                            </div>
                          </div>
                        </form>

                        <div
                          className="alert alert-secondary my-3"
                          role="alert"
                        >
                          {serverMsg}
                        </div>
                      </div>
                    </>
                  ) : (
                    <>
                      <Link className="m-2 btn btn-primary" to="/login">
                        {" "}
                        Login For Review
                      </Link>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ProductDetails;
