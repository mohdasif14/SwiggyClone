import React from 'react'
import ItemCard from './ItemCard'

function OnlineFoodRestaurant({ data, header }) {
  return (
    <div>
      <div className='overflow-hidden'>
        <h2 className='font-bold text-[22px]'>
          Restaurants with online food delivery in {header.split(" in ")[1]}
        </h2>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2'>
        {data.map(({ info }) => (
          <div
            key={info.id}
            className='
              w-full
              lg:w-79
              h-73.5
              shrink-0
              px-2
              lg:pl-5
              py-2
              hover:scale-95
              duration-200
              object-cover
              cursor-pointer
            '
          >
            <ItemCard info={info} />
          </div>
        ))}
      </div>
    </div>
  )
}

export default OnlineFoodRestaurant