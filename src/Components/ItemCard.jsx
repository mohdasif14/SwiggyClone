import React from 'react'
import { Link } from 'react-router-dom'

function ItemCard({info}) {
  return (
    <Link to={`/menu/${info.id}`}>
      <div className='w-68.25 h-45.5 rounded-2xl relative'>
        <img
          key={info.id}
          src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_660/${info.cloudinaryImageId}`}
          className='h-full w-full object-cover rounded-2xl'
        />
        <p className='absolute bottom-2 text-white text-xl z-10 px-2 font-bold'>
          {
          info.aggregatedDiscountInfoV3?info.aggregatedDiscountInfoV3?.header + info.aggregatedDiscountInfoV3?.subHeader : ""
        }
        </p>
        <div className=' h-full w-full bg-linear-to-t from-black from-1% to-transparent to-25% top-0 absolute inset-0 rounded-2xl'></div>
          </div>
          <p className='px-2 font-bold text-[18px] line-clamp-1'>{info.name}</p>
          <div className='px-2 flex items-center gap-1 -mt-1.5'>
            <i className="fi fi-sr-circle-star text-green-600 mt-1.5 text-[18px]"></i>
            <span>{info.avgRating} • </span>
            <span>{info.sla.slaString}</span>
          </div>
          <p className='px-2 line-clamp-1 text-black/80'>{info.cuisines.join(", ")}</p>
          <p className='px-2 line-clamp-1 text-black/80 -mt-1'>{info.locality}</p>
    </Link>
  )
}

export default ItemCard
