import React, { useEffect, useState,useRef } from 'react'

function OnYourMind({data}) {
  
    // const [data,setData] = useState([]);

    // async function fetchData(){
    //     const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=32.73630&lng=74.86510&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING")
    //     const result = await data.json();
    //     console.log(result?.data?.cards[0]?.card?.card);
        
    //     setData(result?.data?.cards[0]?.card?.card?.imageGridCards?.info);
    // }

    // useEffect(()=>{
    //     fetchData();
    // },[])

    const sliderRef = useRef(null);

    const slideLeft = () => {
    sliderRef.current.scrollLeft -= 300; // move left
    };

    const slideRight = () => {
    sliderRef.current.scrollLeft += 300; // move right
    };
  return (
    <div>
      <div className='flex justify-between overflow-hidden'>
      <h2 className='font-bold text-[18px] sm:text-[20px] lg:text-[22px]'>What's on your mind?</h2>

      <div className='text-2xl lg:text-3xl text-black mr-2 lg:mr-4 mt-1 shrink-0'>
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
      {data.map(item => (
        <img
          key={item.imageId}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/,f_auto,q_auto,w_288,h_360/${item.imageId}`}
          className='w-28 h-36 sm:w-32 sm:h-40 lg:w-36 lg:h-45 mr-4 lg:mr-7 shrink-0'
/>
      ))}
    </div>
    
    </div>
  )
}

export default OnYourMind
