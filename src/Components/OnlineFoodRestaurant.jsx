import React from 'react'
import ItemCard from './ItemCard'

function OnlineFoodRestaurant({data,header}) {

  return (
    <div>
      
         <div className='overflow-hidden'>
      <h2 className='font-bold text-[22px]'>Restaurants with online food delivery in {header.split(" in ")[1]}</h2>
    </div>
    <div className='grid items-center grid-cols-4 gap-1'>
      {data.map(({info}) => (
        <div className='w-79 h-73.5 shrink-0  pl-5 py-2  hover:scale-95 duration-200 object-cover cursor-pointer'>
          <ItemCard info = {info}/>
        </div>
      ))}
    </div>
    </div>
  )
}

export default OnlineFoodRestaurant
