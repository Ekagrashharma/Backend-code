import { useState } from "react";
import "./App.css";
import axios from 'axios'
import { useEffect } from "react";

function App() {
  const [fruits, setfruits] = useState([]);

  useEffect(()=>{
    axios.get('/api/fruits')
    .then((res)=>{
      setfruits(res.data)
    })
    .catch((error)=>{
      console.log(error in Response)
    })
  })

  return (
    <>
      <h1>full stack </h1>
      <p>frutis : {fruits.length}</p>
      {fruits.map((fruits) => (
        <div key={fruits.id}>
          <h3>{fruits.name}</h3>
          <p>{fruits.detail}</p>
        </div>
      ))}
    </>
  );
}

export default App;
