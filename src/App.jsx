import './App.css';

import React, { useEffect, useState } from 'react';

const ProductCard = ({ image, title }) => {
  return (
    <div className='product-card'>
      <img src={image} alt={title}  className="product-img" />
      <span>{title}</span>
    </div>
  );
};

const PAGE_SIZE = 10;

const App = () => {
  const [products, setProducts] = useState([]);
  const [currentpage,setCurrentpage] = useState([0]);

  const fetchData = async () => {
    const data = await fetch("https://dummyjson.com/products?limit=200");
    const json = await data.json();
    setProducts(json.products);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const totalProduct = products.length;
  const noofPages = Math.ceil(totalProduct/PAGE_SIZE);
  const start = currentpage * PAGE_SIZE;
  const end= start + PAGE_SIZE;

  const handlePageChange = (n) =>{
     setCurrentpage(n);
  }

  const gotoNextPage =() =>{
    setCurrentpage((prev = prev+1));
  }
  const gotoPrevPage =() =>{
    setCurrentpage((prev = prev-1));
  }

  return !products.length ? (
    <h1>No products found</h1>
  ) : (
    <div>
      <h1>Pagination</h1>
      <div className='pagination-container'>
        <button  disabled={currentpage === 0} className='page-number' onClick={()=>gotoNextPage()}>⬅️</button>
        {[...Array(noofPages).keys()].map((n)=>
        <button className={`page-number ${n === currentpage ? "active" : ""}`} key={n} onClick={()=>handlePageChange(n)}>
        {n}
        </button>
      )}
      <button  disabled={currentpage === noofPages-1}className='page-number' onClick={()=> gotoPrevPage()}>▶️</button>
      </div>
      <div className='product-container'>
      {products.slice(start,end).map((p) => (
        <ProductCard key={p.id} image={p.thumbnail} title={p.title} />
      ))}
      </div>
    </div>
  );
};

export default App;
