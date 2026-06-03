import React, { useRef } from 'react'
import ItemCard from './ItemCard'

function TopRestraunt({ data, header }) {
  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 300;
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 300;
  };

  return (
    <div>
      <div className="flex justify-between mt-6 overflow-hidden">
        <h2 className="font-bold text-[22px]">{header}</h2>

        <div className="text-3xl text-black mr-4 mt-1">
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
        className="flex items-center overflow-x-scroll no-scrollbar scroll-smooth"
      >
        {data.map(({ info }) => (
          <las
            key={info.id}
            className="w-77 shrink-0 px-2 sm:px-3 lg:pl-5 py-2 hover:scale-95 duration-200 cursor-pointer"
          >
            <ItemCard info={info} />
          </las>
        ))}
      </div>
    </div>
  );
}

export default TopRestraunt;