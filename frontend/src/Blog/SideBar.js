import React,{useEffect,useState} from "react";
import axios from "axios";
import '../../public/style.css'

function SideBar() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const func_sidebar = axios
      .get("http://127.0.0.1:8000/apisidebar/")
      .then((response) => {
        setData(response.data[0]);
      })
      .catch((error) => {
        alert(response.message);
      });
  }, []);

  return (
    <>
      <div className="col-md-4 mb-4">
        <section className="main sticky-top" style={{ Top: "80px" }}>
          <section className="text-center border-bottom pb-4 mb-4">
            <div className="bg-image hover-overlay ripple mb-4">
              <img
                src={data.image}
                className="img-fluid"
              />
              <a
                href={data.link}
                target="_blank"
              >
                <div
                  className="mask"
                  style={{
                    backgroundColor: "rgba(57, 192, 237, 0.2)",
                  }}
                ></div>
              </a>
            </div>
            <h5>{data.tile}</h5>

            <div
                dangerouslySetInnerHTML={{
                  __html: `${data.description}`,
                }}
              ></div>
            <a
              role="button"
              className="btn btn-primary"
              href={data.link}
              target="_blank"
            >
              {data.btn_name}
              <i className="fas fa-download ms-2"></i>
            </a>
          </section>

          <section className="text-center">
            <h5 className="mb-4">{data.video_title}</h5>

            <div className="embed-responsive embed-responsive-16by9 shadow-4-strong">
              <iframe
                className="embed-responsive-item rounded-5"
                src={data.video_link}
              ></iframe>
            </div>
          </section>
        </section>
      </div>
    </>
  );
}

export default SideBar;
