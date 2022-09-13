import React, { useState } from "react";
import "./App.css";
import ResultCard from "./components/ResultCard";

function SearchBar({ setProducts }) {
  const [searchTerm, setSearchTerm] = useState("");

  // fetch data from the backend
  async function showKeywordProduct() {
    // console.log(searchTerm);
    // create a fetch request to the backend with the keyword

    try{
    const resp = await fetch("http://localhost:8000/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ str: searchTerm }),
    });
    const data = await resp.json();
    setProducts(data);
    }catch(err){
        console.log(err);
    }
  }
  return (
    // form to get the keyword
    <form className="search-bar">
      <input
        type="text"
        placeholder="Press enter to show all, or type a keyword to search"
        className="search-input"
        value={searchTerm}
        onChange={(event) => {
          setSearchTerm(event.target.value);
          // to show the results as the user types
          // showKeywordProduct(); 
        }}
      />
      <button
        type="submit"
        onClick={(e) => {
          e.preventDefault();
          showKeywordProduct();
        }}
      >
        Search
      </button>
    </form>
  );
}

function Products({ prod }) {
  // console.log(prod);
  return (
    // show the results, it's in a responsive grid columns format
    <div className="products">
      {prod ? prod.map((product) => (
        <ResultCard product={product} />
      )) : <h1>Not Found</h1>}
    </div>
  );
}

function App() {
  // the app is simple therefore use of redux is not necessary
  const [prod, setProducts] = useState([]);
  return (
    <div className="App">
      <SearchBar setProducts={setProducts} />
      <Products prod={prod} />
    </div>
  );
}

export default App;
