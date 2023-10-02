import React,{useState,useEffect} from "react";
import axios from "axios";

function Comments(props) {
  const [result,setResult] = useState("")
  const [name,setName] = useState("")
  const [email,setEmail] = useState("")
  const [content,setContent] = useState("")
  const [cdata,setCData]  = useState([])

  useEffect(() => {
    const commentdata = axios.get("http://127.0.0.1:8000/comment",
    {
      params: {
        id: props.id
      }
    }
    )
      .then((response) => {
        setCData(response.data.data);
      }).catch((error) => {
        alert(error.statusText);

      });
  },[])

  function handlesubmit(evt) {
    evt.preventDefault();
    const id = props.id
    if (name == "" || email == "" || content == "") {
      setResult("Plzz Fill The All Details");
    } else {
      axios.post('http://127.0.0.1:8000/comment', 
        JSON.stringify({
            id,
            name,
            email,
            content,
          }))          
        .then(response => {
            setResult("Successfully Submit")
            setCData(response.data.data)
            setName("")
            setEmail("")
            setContent("")
          }).catch(error => {
            setResult(error.message);
        });
    }
  }

  return (
    <>
      <section className="border-bottom mb-3">
        <p className="text-center">
          <strong>Comments</strong>
        </p>

      {
        cdata.map((item) =>{
          return (
            <div className="row mb-4">
            <div className="col-2">
              <img
                src="https://cdn-icons-png.flaticon.com/512/146/146031.png"
                className="img-fluid shadow-1-strong rounded-5"
                alt=""
              />
            </div>
  
            <div className="col-10">
              <p className="mb-2">
                <strong>{item.name}</strong>
              </p>
              <p>
                {item.text}
              </p>
            </div>
          </div>
          )

        })
      }


        <section>
          <p className="text-center">
            <strong>Leave a reply</strong>
          </p>

          <form onSubmit={handlesubmit}> 
            <div className="form-outline mb-4">
              <input value={name} onChange={(e) => setName(e.target.value)} type="text" id="form4Example1" name="name" className="form-control" />
              <label className="form-label">Name</label>
            </div>

            <div className="form-outline mb-4">
              <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email" name="email" id="form4Example2" className="form-control" />
              <label className="form-label">Email address</label>
            </div>

            <div className="form-outline mb-4">
              <textarea
               value={content} 
               onChange={(e) => setContent(e.target.value)}
                name="content"
                className="form-control"
                id="form4Example3"
                rows="4"
              ></textarea>
              <label className="form-label">Text</label>
            </div>

            <button type="submit" className="btn btn-primary btn-block mb-4">
              Publish
            </button>
          </form>

          {result ? <div className="alert alert-secondary my-3" role="alert">
          {result}
        </div> : ""}
        </section>
      </section>
    </>
  );
}

export default Comments;
