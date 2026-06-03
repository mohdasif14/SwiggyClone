import { useState, useEffect, useContext } from "react";
import OnYourMind from "./OnYourMind";
import TopRestraunt from "./TopRestraunt";
import OnlineFoodRestaurant from "./OnlineFoodRestaurant";
import { Coordinates } from "../context/contextApi";

function Body() {
  const [oymData, setOymData] = useState([]);
  const [trData, setTrData] = useState([]);
  const { coord: { lat, lon } } = useContext(Coordinates);
  const [header, setHeader] = useState("");

  async function fetchData() {
    const data = await fetch(
      `https://www.swiggy.com/dapi/restaurants/list/v5?lat=${lat}&lng=${lon}&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING`
    );

    const result = await data.json();

    setHeader(result?.data?.cards[1]?.card?.card?.header?.title);
    setOymData(
      result?.data?.cards[0]?.card?.card?.imageGridCards?.info || []
    );
    setTrData(
      result?.data?.cards[1]?.card?.card?.gridElements?.infoWithStyle
        ?.restaurants || []
    );
  }

  useEffect(() => {
    fetchData();
  }, [lat, lon]);

  return (
    <div className="w-full flex justify-center">
      <div
        className="
          w-[95%]
          sm:w-[92%]
          md:w-[88%]
          lg:w-[82%]
          p-3
          px-3
          sm:px-4
          lg:px-6
          flex
          flex-col
          gap-5
          text-left
        "
      >
        <OnYourMind data={oymData} />

        <span className="w-full border border-gray-400/40 mt-12"></span>

        <TopRestraunt data={trData} header={header} />

        <span className="w-full border border-gray-400/40 mt-12"></span>

        <OnlineFoodRestaurant data={trData} header={header} />

        <span className="w-full border border-gray-400/40 mt-12"></span>
      </div>
    </div>
  );
}

export default Body;