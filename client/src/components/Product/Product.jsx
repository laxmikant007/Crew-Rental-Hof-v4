import React, { useEffect, useState } from 'react';
import "../../css/Groupworkers.css";
import Header from "../Pages/Header"
import Footer from "../Footer";
import { getAllProducts, getAllProductProvider } from '../../service/api';
import ProductCard from "./ProductCard";






const Product = () => {
  const [products,setProducts]=useState([]);
  const [price, setPrice]=useState("100");
  const [productProvider, setProductProvider]=useState([]);

  useEffect(()=>{
        getProducts();
        getProductProvider();
  },[])

     const getProducts= async()=>{
          let result= await getAllProducts();
            
              console.log("result is ",result);
            setProducts(result.data);
     }

     const getProductProvider= async()=>{
      let result= await getAllProductProvider();
        
          console.log("result is ",result.data);
        setProductProvider(result.data);
 }


    //  console.log("Workers from backend are ",workers);



  return (
    <>
          <Header />
      <h1 style={{margin:"40px"}}>Group of Workers Page</h1>
    <div className="workers-page-workers-group">
    <div className="filter-section">
  <h3 >Filter Products</h3>
  <form>
    <label for="location">Company:</label>
    <select name="location" id="location" value="All companies">
      <option value="all">All Companies</option>      
         {   products.map((product) => {
          return  <option value={product.company}>{product.company}</option>
        })   }

      
    </select>

    <label for="city">City:</label>
    <select name="city" id="city">
      <option value="all">All Cities</option>
      {   productProvider.map((productProvider) => {
          return  <option value={productProvider.address}>{productProvider.address}</option>
        })   }
    </select>

    <label for="price">Price:</label>
            <div class="filter_price">
       
        <p>₹{price}.00</p>
       
        <input type="range" name="price" min="0" max="10000" value={price} style={{cursor:"pointer"}} onChange={(e)=>setPrice(e.target.value)}></input>

                </div>
    <label for="location">Category:</label>
    <select name="location" id="location" value="All companies">
      <option value="all">All Categories</option>      
         {   products.map((product) => {
          return  <option value={product.category}>{product.category}</option>
        })   }

      
    </select>    
      <button type="submit">Apply Filter</button>
      </form>
      </div>
      <div className="container">
      <div className="workers-container-workers-group">
        {   products.map((product) => {
          return <ProductCard key={product._id} product={product}  />;
        })   }
   


      </div>
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default Product;
