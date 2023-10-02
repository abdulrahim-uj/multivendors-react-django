import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useOrderQuery } from "../services/UserAuthApi";
import { getToken } from "../services/LocalStorageService";
import axios from 'axios';

function Orders() {
  const { access_token } = getToken();
  const [order, setOrder] = useState([]);

  // const Order = useOrderQuery({ access_token });

  // useEffect(() => {
  //   if (Order.data && Order.isSuccess) {
  //     setOrder(Order.data);
  //   }
  // });

  

  useEffect(() => {
    const config = {
      headers: { Authorization: `Bearer ${access_token}` },
      
    };

    const cart_data = axios
      .get("http://127.0.0.1:8000/ecom/placeorder", config)
      .then((response) => {
        console.log(response.data)
        setOrder(response.data);
      })
      .catch((error) => {
        console.log(error.message);
      });
  }, []);
  

  return (
    <>
      <div class="container">
        {/* <article class="card"> */}
        <header class="card-header"> My Orders</header>
        <div class="card-body">
          <div class="card mt-2" >
            {order.map((item) => {
              return (
                <>
                  <div class="card-body row" style={{border:'2px solid black',margin:'0'}}>
                    <div class="col">
                      {" "}
                      <strong>
                        Order Date :<br/> {item.ordered_date.slice(0, 10)}
                      </strong>{" "}
                      <br />
                    </div>
                    <div class="col">
                      {" "}
                      <strong>
                        Order Name :<br/> {item.product_short_title}
                      </strong>{" "}
                      <br />
                    </div>
                    {item.status == "Cancel" ? (
                      <>
                        <div class="col">
                          {" "}
                          <strong>Status: {item.status} <br/>Pay Mode: {item.payment_mode}</strong> <br />
                          <div class="progress mt-2">
                            <div
                              class="progress-bar bg-warning" 
                              role="progressbar"
                              style={{ width: "100%" }}
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="0"
                            ></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    {item.status == "Pending" ? (
                      <>
                        <div class="col">
                          {" "}
                          <strong>Status: {item.status} <br/>Pay Mode: {item.payment_mode}</strong> <br />
                          <div class="progress mt-2">
                            <div
                              class="progress-bar"
                              role="progressbar"
                              style={{ width: "10%" }}
                              aria-valuenow="0"
                              aria-valuemin="0"
                              aria-valuemax="0"
                            ></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                  
                  


                    {item.status == "Accepted" ? (
                      <>
                        <div class="col">
                          {" "}
                          <strong>Status: {item.status} <br/>Pay Mode: {item.payment_mode}</strong> <br />
                          <div class="progress mt-2">
                            <div
                              class="progress-bar bg-success"
                              role="progressbar"
                              style={{ width: "100%" }}
                              aria-valuenow="100"
                              aria-valuemin="0"
                              aria-valuemax="100"
                            ></div>
                          </div>
                        </div>
                      </>
                    ) : (
                      <></>
                    )}

                    <div class="col">
                      {" "}
                      <strong>
                        Order Id #:<br/> {item.order_id.slice(0, 8)}
                      </strong>{" "}
                      <br />{" "}
                    </div>

                    <div class="col">
                      {" "}
                      <strong>
                        Preview Link #:<br/> 
                        <a href={item.product_preview_link} >Demo</a>
                      </strong>{" "}
                      <br />{" "}
                    </div>

                    <div class="col">
                      {" "}
                      <strong>
                        Download Link #:<br/>
                        {item.status == "Accepted" ? (
                          <>
                        <a href={item.product_download_link} >Download</a> 
                        </>
                        ): 
                        
                        <>
                        <a href="#" >Waiting For Payment Verification</a> 
                        </>}
                      </strong>{" "}
                      <br />{" "}
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
        <hr />
        <hr />{" "}
        <Link to="/dashboard" class="btn btn-warning" data-abc="true">
          {" "}
          <i class="fa fa-chevron-left"></i> Back to Dashboard
        </Link>
      </div>
    </>
  );
}

export default Orders;
