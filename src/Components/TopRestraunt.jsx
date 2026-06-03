import React, { useEffect, useState,useRef } from 'react'
import ItemCard from './ItemCard';
import { Link } from 'react-router-dom';

function TopRestraunt({data,header}) {
    // const [data,setData] = useState([]);
    
    //     async function fetchData(){
    //         const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.73630&lng=74.86510&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //         const result = await data.json();
    //         console.log(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
            
    //         setData(result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle?.restaurants);
    //     }
    
    //     useEffect(()=>{
    //         fetchData();
    //     },[])
    
    
        const sliderRef = useRef(null);
    
        const slideLeft = () => {
        sliderRef.current.scrollLeft -= 300; // move left
        };
    
        const slideRight = () => {
        sliderRef.current.scrollLeft += 300; // move right
        };
  return (
    <div>
         <div className='flex justify-between mt-6 overflow-hidden'>
      <h2 className='font-bold text-[22px]'>{header}</h2>

      <div className='text-3xl text-black mr-4 mt-1'>
        <i
          className="fi fi-rs-arrow-circle-left mr-4 cursor-pointer"
          onClick={slideLeft}
        ></i>

        <i
          className="fi fi-rs-arrow-circle-right cursor-pointer"
          onClick={slideRight}
        ></i>
      </div>
    </div>

    <div
      ref={sliderRef}
      className='flex items-center overflow-x-scroll no-scrollbar scroll-smooth'
    >
      {data.map(({info}) => (
          
        <div className='w-77 h-71.5 shrink-0  pl-5 py-2  hover:scale-95 duration-200 object-cover cursor-pointer'>
          <ItemCard info = {info}/>
        </div>
      ))}
    </div>
      
    </div>
  )
}

export default TopRestraunt
