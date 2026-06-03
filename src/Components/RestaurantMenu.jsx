import React, { useState, useEffect, useRef, act, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { CartContext, Coordinates } from "../context/contextApi";

function RestaurantMenu() {
  const { id } = useParams();
  const [menuData, setMenuData] = useState([]);
  const [resInfo, setResInfo] = useState([]);
  const [discountData, setDiscountData] = useState([]);
  const [topPicksData, setTopPicksData] = useState({});
  const {coord:{lat,lon}} = useContext(Coordinates)

  async function fetchMenu() {
    const data = await fetch(
      `https://www.swiggy.com/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=${lat}&lng=${lon}&restaurantId=${id}`
    );
    const result = await data.json();

    // console.log(
    //   result?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards
    // );
    setResInfo(result?.data?.cards[2]?.card?.card?.info);
    setDiscountData(
      result?.data?.cards[3]?.card?.card?.gridElements?.infoWithStyle?.offers
    );
    let actualMenu =
      result?.data?.cards[5]?.groupedCard?.cardGroupMap?.REGULAR?.cards.filter(
        (item) => item?.card?.card?.itemCards || item?.card?.card?.categories
      );
    setTopPicksData(result?.data?.cards[5]);

    // console.log(actualMenu);

    setMenuData(actualMenu);
  }

  useEffect(() => {
    fetchMenu();
  }, [id]);

  const sliderRef = useRef(null);

  const slideLeft = () => {
    sliderRef.current.scrollLeft -= 300; // move left
  };

  const slideRight = () => {
    sliderRef.current.scrollLeft += 300; // move right
  };

  // console.log(topPicksData);

  return (
    <div className="w-full">
      <div className="w-[800px] mx-auto pt-6">
        <p className="text-[11px] font-semibold text-slate-400 ">
          <Link to={"/"}>
            <span className="cursor-pointer hover:text-slate-950 mr-0.5">
              Home
            </span>{" "}
          </Link>
          /{" "}
          <span className="cursor-pointer hover:text-slate-950 mr-0.5">
            {resInfo.city}
          </span>{" "}
          / <span className="text-slate-950 ml-0.5">{resInfo.name}</span>
        </p>
        <h1 className="text-3xl font-bold pt-6 pl-2">{resInfo.name}</h1>
        <div className="w-full h-[165px] pb-4 px-4 rounded-4xl bg-linear-to-t from-gray-300 mt-7">
          <div className="w-full h-full bg-white border border-gray-300 rounded-3xl p-4">
            <div className="flex items-center gap-2 font-bold">
              <i className="fi fi-sr-circle-star text-green-600 mt-1.5 text-[18px]"></i>
              <span>
                {resInfo.avgRatingString}({resInfo.totalRatingsString})
              </span>
              <p> • {resInfo.costForTwoMessage}</p>
            </div>
            <p className="text-orange-600 font-bold underline ml-1 text-[15px]">
              {resInfo?.cuisines?.join(",")}
            </p>

            <div className="flex mt-4 gap-2">
              <div className="w-1.5 items-center flex flex-col justify-center px-1.5 ">
                <div className="w-1.5 h-1.5 bg-gray-400/80 rounded-full"></div>
                <div className="w-0.5 h-6 bg-gray-400/80"></div>
                <div className="w-1.5 h-1.5 bg-slate-400/80 rounded-full"></div>
              </div>
              <div className="flex gap-2 font-bold">
                <p>Outlet</p>{" "}
                <span className="font-normal text-gray-500">
                  {resInfo.locality}
                </span>
                <p>{resInfo?.sla?.slaString}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Deals For You */}

        <div className="w-full p-4.5 mt-4">
          <div className="flex justify-between overflow-hidden">
            <h2 className="font-bold text-[21px]">Deals for you</h2>

            <div className="text-3xl text-black mr-1 mt-2">
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
            {discountData.map(({ info }) => (
              <div className="flex items-center gap-3 mr-3 p-3 border border-gray-400/40 rounded-2xl w-82 h-19 shrink-0 mt-2">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,/${info?.offerLogo}`}
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-lg font-bold">{info.header}</p>
                  <p className="font-bold text-sm text-gray-500/80 mb-1">
                    {info.couponCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="text-center text-md mt-7 font-semibold text-gray-600">
          Menu
        </h2>

        <div>
          <div className="flex h-12 bg-gray-200 items-center px-3 rounded-xl justify-center mt-4 cursor-pointer">
            <p className="text-center font-semibold text-gray-600">
              Search for dishes
            </p>
            <i className="fi fi-bs-search mt-1.5 text-gray-600 text-end translate-x-78"></i>
          </div>
        </div>

        {/* Top Picks */}
        {/* <div className="w-full p-4.5 mt-4">
          <div className="flex justify-between overflow-hidden">
            <h2 className="font-bold text-[21px]">Deals for you</h2>

            <div className="text-3xl text-black mr-1 mt-2">
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
            {topPicksData.map(({ info }) => (
              <div className="flex items-center gap-3 mr-3 p-3 border border-gray-400/40 rounded-2xl w-82 h-19 shrink-0 mt-2">
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,/${info?.offerLogo}`}
                  className="w-12 h-12"
                />
                <div>
                  <p className="text-lg font-bold">{info.header}</p>
                  <p className="font-bold text-sm text-gray-500/80 mb-1">
                    {info.couponCode}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div> */}

        {/* DropDown Menu */}
        <div className="mt-5">
          {/* FIRST gray gap */}

          {menuData.map(({ card: { card } }, i) => (
            <div key={card.title || i}>
              <div className="h-4 bg-gray-100"></div>
              <DetailMenu card={card} isNested={false} resInfo={resInfo}/>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default RestaurantMenu;

function DetailMenu({ card, isNested,resInfo }) {
  const [isOpen, setIsOpen] = useState(true);
  const [readmore, setReadMore] = useState(false);
  const { cartData, setCartData } = useContext(CartContext);

  function handleCart(info) {
    const isAdded = cartData.find((data) => data.id === info.id);
    let getInfoFromLS = JSON.parse(localStorage.getItem("resInfo")) || []
    if (!isAdded) {
      if (getInfoFromLS.id === resInfo.id || getInfoFromLS.length === 0) {
        setCartData((prev) => [...prev, info]);
        localStorage.setItem("cartData", JSON.stringify(...cartData, info));
        localStorage.setItem("resInfo",JSON.stringify(resInfo))
      } else {
        alert("different restaurant")
      }
      
    } else {
      alert("Already Added");
    }
  }

  function toggle() {
    setIsOpen((prev) => !prev);
  }

  // SECTION (has items)
  if (card.itemCards) {
    const { title, itemCards } = card;

    return (
      <div className="bg-white">
        {/* HEADER */}
        <div
          className={`flex justify-between items-center cursor-pointer
            ${isNested ? "py-2.5 pl-2" : "mt-5 pl-2"}`}
          onClick={toggle}
        >
          <h3
            className={`font-bold text-gray-900
              ${isNested ? "text-[16px]" : "text-lg font-extrabold "}`}
          >
            {title} ({itemCards.length})
          </h3>

          <i
            className={`fi fi-rs-angle-small-down transition-transform
              ${isOpen ? "rotate-180" : ""}`}
          ></i>
        </div>

        {/* ITEMS */}
        {isOpen &&
          itemCards.map(({ card: { info } }) => (
            <div>
              <div key={info.id} className="flex gap-8 py-7 pl-4 items-center">
                <div className="flex-1 gap-3 w-[70%]">
                  <p>
                    {info.itemAttribute.vegClassifier === "VEG" ? (
                      <img
                        className="w-4"
                        src="https://tse1.mm.bing.net/th/id/OIP.j80S21_H0kqUzxFVezy8GQHaHw?rs=1&pid=ImgDetMain&o=7&rm=3"
                        alt=""
                      />
                    ) : (
                      <img
                        className="w-4"
                        src="https://www.pngkey.com/png/full/245-2459071_non-veg-icon-non-veg-symbol-png.png"
                        alt=""
                      />
                    )}
                  </p>
                  <h4 className="font-bold text-gray-700 text-lg">
                    {info.name}
                  </h4>
                  <p className="font-semibold mb-3">
                    ₹{info.defaultPrice / 100 || info.price/100} 
                  </p>
                  {info.ratings?.aggregatedRating?.rating && (
                    <div className="flex items-center gap-0.5 text-sm">
                      <i className="fi fi-ss-star text-green-600 mt-[3px]"></i>
                      <p className="text-green-600 font-semibold">
                        {info.ratings.aggregatedRating.rating}
                      </p>
                      <p>({info.ratings.aggregatedRating.ratingCountV2})</p>
                    </div>
                  )}
                  <p className="text-md text-gray-600 mt-4">
                    <span className={readmore ? " " : "line-clamp-2"}>
                      {info.description}
                    </span>{" "}
                    <span
                      className="font-semibold"
                      onClick={() => setReadMore((prev) => !prev)}
                    >
                      Read More
                    </span>
                  </p>
                </div>
                <div className="w-[30%] flex flex-col items-center h-[200px] relative">

                    {info.imageId && <img
                    className="w-39 h-36 rounded-lg object-cover"
                    src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${info.imageId}`}
                    alt=""
                  />}
                  <button
                  className="bg-white text-green-600 font-bold border border-gray-300/50 drop-shadow-xl px-9 py-1.5 rounded-lg text-xl bottom-9 cursor-pointer"
                  onClick={() => handleCart(info)}
                  >
                    ADD
                  </button>

                  <p className="text-sm text-gray-500 mt-5.5">Customisable</p>
                </div>
              </div>
              <hr className="text-gray-400/60 w-[98.5%] ml-3.5" />
            </div>
          ))}

        {/* HR for BOTH types */}
        {isNested && <hr className="border-gray-200 my-2" />}
      </div>
    );
  }

  // CATEGORY
  if (card.categories) {
    return (
      <div>
        <h2 className="text-[18px] font-extrabold px-2 py-3 text-gray-900">
          {card.title}
        </h2>

        {card.categories.map((sub, i) => (
          <DetailMenu key={sub.title || i} card={sub} isNested={true} />
        ))}
      </div>
    );
  }

  return null;
}
