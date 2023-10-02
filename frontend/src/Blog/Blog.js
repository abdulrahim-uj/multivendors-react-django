import React,{useState,useEffect} from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import axios from "axios";
import '../../public/style.css'


function Blog() {
  const [data,setData] = useState([])

  const truncate = function(str) {
    return str.length > 100 ? str.substring(0, 97) + "..." : str;
  }


    useEffect(() => {
      const blogdata = axios.get("http://127.0.0.1:8000/apiblog",)
        .then((response) => {
          setData(response.data);
        }).catch((error) => {
          alert(error.message);

        });
    },[])

  return (
    <>
      <Helmet>
        <title>Django With React | Blog</title>
      </Helmet>
      <div className="container">
        <div className="row">



        {data.map((item)=>{
          return(

            <div className="col-4" key={item.id}>
            <div className="card my-2" style={{ width: "18rem" }}>
              <img src={item.image} width="286" height="286" className="card-img-top" alt={item.title} />
              <div className="card-body">
                <h5 className="card-title"><Link to={item.slug}>{item.title}</Link></h5>
                <div className="card-text" dangerouslySetInnerHTML={{__html:`${truncate(item.description)}`}}></div>
              </div>

              <div className="card-body">
                <Link to={item.slug} className="card-link">
                  Read More 
                </Link>

                

              </div>
            </div>
          </div>

          )
        })}
          


        </div>
      </div>
    </>
  );
}

export default Blog;

