import { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";

function App() {
  const [data, setData] = useState([]);
  const [data2, setData2] = useState([]);
  
  const [isError, setIsError] = useState("")
  const [isError2, setIsError2] = useState("")
  const API_URL = "https://jsonplaceholder.typicode.com/posts";
  const API_URL2='https://jsonplaceholder.typicode.com/comments'

  // using promises
  useEffect(()=>{
     axios.get(API_URL)
     .then((res)=>{
      // console.log(res.data);
      setData(res.data);
     })
     .catch((err)=>{  setIsError(err.message); });

  },[]);


  // using async await
  const getApiData = async () => {
    try {
      const res2 = await axios.get(API_URL2);
      console.log(res2);
      setData2(res2.data);
    } catch (error) {
      console.log(error.message);
      setIsError2(error.message);

    }
  };

  useEffect(() => {
    getApiData();
  }, []);

  return (
   <>
    <h1>Axios Tutorial With Promises</h1>
    {isError !== "" && <h2>{isError}</h2>}
    <div className="container">
      {data.slice(0, 12).map((post) => {
        const { id, title, body } = post;
        return (
          <div key={id} className="card">
            <h2>{title.slice(0, 15).toUpperCase()}</h2>
            <p>{body.slice(0, 150)}</p>
          </div>
        );
      })}
    </div>
    <h1>Axios Tutorial With Async Await</h1>
    {isError2 !== "" && <h2>{isError2}</h2>}
    <div className="container">
      {data2.slice(0, 12).map((comment) => {
        const { id, name,email, body } = comment;
        return (
          <div key={id} className="card">
            <h2>{name.slice(0,10).toUpperCase()}</h2>
            <h2>{email}</h2>
            <p>{body.slice(0, 100)}</p>
          </div>
        );
      })}
    </div>
   </>
  );
}
export default App;
