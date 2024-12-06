import React, { useEffect, useState } from 'react'

import axios from 'axios';
import Loading from '../../components/Loading/Loading';


export default function Home() {
    // const [products ,setProducts]=useState(null);
    // async function getProducts(){
    //     const options = {
    //       url: "https://ecommerce.routemisr.com/api/v1/products",
    //       method:"GET",
    //     };
    //     const {data}=await axios.request(options);
    //     setProducts(data.data)
    // }
    // useEffect(()=>{
    //     getProducts();
    // },[]);
  return (
    <>
    <p>home</p>
      
{/* 
      {products ? (
        <div className="grid grid-cols-12 gap-3">
          {products.map((product) => (
            <Card productInfo={product} key={product._id} />
          ))}
        </div>
      ) : (
        <Loading />
      )} */}
    </>
  );
}
