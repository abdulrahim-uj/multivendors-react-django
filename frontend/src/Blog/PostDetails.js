import React, { useEffect, useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import SideBar from "./SideBar";
import Comments from "./Comments";


function PostDetails() {
  const location = useLocation();
  const [result, setResult] = useState({ data: {} });
  
  const postdata = result.data.data;
  useEffect(() => {
    const slug = location.pathname.replace("/blogs/", "");
    const func_data = axios
      .get("http://127.0.0.1:8000/blog/" + slug)
      .then((response) => {
        const newdata = JSON.parse(response.data.postdata);
        var data = result.data;
        data.data = newdata;
        setResult({ data: data });
      })
      .catch((error) => {
        alert(response.message);
      });
  }, []);

  return (
    <>
      {postdata !== undefined ? (
        <>
          <div className="mt-4 mb-5">
            <div className="container">
              <div className="row">
                <div className="col-md-8 mb-4">
                  <section className=" border-bottom mb-4">
                    <img
                      src={postdata.image}
                      className="img-fluid shadow-2-strong rounded-5 mb-4"
                      alt={postdata.title}
                    />

                    <div className="row align-items-center mb-4">
                      <div className="col-lg-6 text-center text-lg-start mb-3 m-lg-0">
                        <img
                          src="https://mdbootstrap.com/img/Photos/Avatars/img (23).jpg"
                          className="rounded-5 shadow-1-strong me-2"
                          height="35"
                          alt={postdata.category}
                          loading="lazy"
                        />
                        <span>
                          {" "}
                          Published <u>{postdata.created_date}</u>
                        </span>
                      </div>
                    </div>
                  </section>

                  <section>
                    <div
                      className="card-text"
                      dangerouslySetInnerHTML={{
                        __html: `${postdata.description}`,
                      }}
                    ></div>
                  </section>
                  
                  <hr/>
                    
                  <Comments id={postdata.id}/>


                </div>
                  
                <SideBar/>

              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          <p>Loding...</p>
        </>
      )}
    </>
  );
}

export default PostDetails;
