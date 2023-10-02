import React,{useEffect,useState}  from "react";
import Logo from '../../../public/logo.png'

function Footer(props) {
  const [resData,setResData] = useState([])
  
  useEffect(() => {
    const resdata = fetch("http://127.0.0.1:8000/webinfo")
    .then((response) => response.json())
    .then((rdata) => setResData(rdata.data[0]));
  }, []);
  
  const logo_url = "http://" + window.location.hostname + "/" + "media/" + resData.logo


  return (
    <>
      <footer className="footer-area mt-50">
        <div className="container-fluid">
          <div className="row">
            <div className="col-lg-3 col-sm-6">
              <div className="company-info">
                <img src={logo_url} alt="logo" />
                <p>
                  {resData.address}
                </p>
                <p>Phone: {resData.phone}</p>
                <p>Email: {resData.email}</p>
              </div>
              <div className="copyright">
                <p>
                  {resData.copyright}
                </p>
              </div>
              <div className="payment-gateways">
                <img src="assets/images/footer/p1.png" alt="" />
                <img src="assets/images/footer/p2.png" alt="" />
                <img src="assets/images/footer/p3.png" alt="" />
                <img src="assets/images/footer/p4.png" alt="" />
                <img src="assets/images/footer/p5.png" alt="" />
                <img src="assets/images/footer/p6.png" alt="" />
              </div>
            </div>
            
            <div className="col-lg-2 col-sm-6">
              <div className="fooer-widget">
                <h4>Find It Fast</h4>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="/ecom/products">Laptop & Computers</a>
                    </li>
                    <li>
                      <a href="/ecom/products">Smart Phone & Tablets</a>
                    </li>
                    <li>
                      <a href="/ecom/products">TV & Audio</a>
                    </li>
                    <li>
                      <a href="/ecom/products">Cameras & Photography</a>
                    </li>
                    <li>
                      <a href="/ecom/products">Gadgets</a>
                    </li>
                    <li>
                      <a href="/ecom/products">Car Electronic & GP5</a>
                    </li>
                    <li>
                      <a href="/ecom/products">Accesories</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-3 mt-sm-45">
              <div className="fooer-widget">
                <h4>Information</h4>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="/ecom/products">Find a Store</a>
                    </li>
                    <li>
                      <a href="/about">About Us</a>
                    </li>
                    <li>
                      <a href="/contact">Contact Us</a>
                    </li>
                    <li>
                      <a href="/contact">Delivery information</a>
                    </li>
                   
                    
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-2 col-sm-3 mt-sm-45">
              <div className="fooer-widget">
                <h4>Customer Care</h4>
                <div className="footer-menu">
                  <ul>
                    <li>
                      <a href="/dashboard">My Account</a>
                    </li>
                    <li>
                      <a href="/ecom/orders">Order History</a>
                    </li>
                    
                    <li>
                      <a href="/contact">Customer Service</a>
                    </li>
                    <li>
                      <a href="/contact">Returns / Exchange</a>
                    </li>
               
                    <li>
                      <a href="/contact">Product Support</a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className="col-lg-3 col-sm-6 mt-sm-45">
              <div className="footer-widget">
                <div className="subscribe-form">
                  <h3>
                    Sign Up to <strong>Newsletter</strong>
                  </h3>
                  <p>
                    Subscribe our newsletter gor get notification about
                    information discount.
                  </p>
                  
                </div>
                <div className="social-icons style-2">
                  <strong>GET IN TOUCH !</strong>
                  <a href={resData.facebook}>
                    <i className="fa fa-facebook"></i>
                  </a>
                  <a href={resData.twitter}>
                    <i className="fa fa-twitter"></i>
                  </a>
                  <a href={resData.instagram}>
                    <i className="fa fa-instagram"></i>
                  </a>
                  <a href={resData.youtube}>
                    <i className="fa fa-youtube"></i>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
      
    </>
  );
}

export default Footer;
