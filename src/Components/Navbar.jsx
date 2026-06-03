import React, { useContext, useEffect, useState } from "react";
import { Outlet, Link } from "react-router-dom";
import { CartContext, Coordinates, Visibility } from "../context/contextApi";
import { useDispatch, useSelector } from "react-redux";
import { toggleSearchBar } from "../utils/toggleSlice";

function Navbar() {
  // const { visible, setVisible } = useContext(Visibility);

  // accessed data from redux store using useSelector
  const visible = useSelector((state)=>state.toggleSlice.searchBarToggle);
  const dispatch = useDispatch();

  const { cartData } = useContext(CartContext);
  const { setCoord } = useContext(Coordinates);

  const [searchResult, setSearchResult] = useState([]);
  const [searchText, setSearchText] = useState(""); // controlled input state
  const [address, setAddress] = useState("");

  /* ===================== SEARCH API ===================== */
  async function fetchData(value) {
    // Protect against empty or 1-letter input
    if (!value || value.length < 2) {
      setSearchResult([]);
      return;
    }

    const res = await fetch(
      `https://blinkit.com/location/autoSuggest?query=${value}&lat=28.4652382&lng=77.0615957`
    );

    const data = await res.json();

    // Always fallback to [] to avoid undefined.map crash
    setSearchResult(data?.ui_data?.suggestions || []);
  }

  /* ===================== PLACE DETAILS ===================== */
  async function fetchlatlan(placeId) {
    if (!placeId) return;

    const res = await fetch(
      `https://blinkit.com/location/info?place_id=${placeId}`
    );
    const data = await res.json();

    setAddress(data?.display_address?.address_line || "");

    setCoord({
      lat: data?.coordinate?.lat,
      lon: data?.coordinate?.lon,
    });

    // UX cleanup after selecting a location
    setSearchText("");     // clear input
    setSearchResult([]);   // clear suggestions
    // setVisible(false);     // close drawer
    dispatch(toggleSearchBar())     // close drawer
  }

  function handleSearch() {
    // setVisible((prev) => !prev);
    dispatch(toggleSearchBar())
  }

  /* ===================== DEBOUNCE ===================== */
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchData(searchText);
    }, 400);

    return () => clearTimeout(timer);
  }, [searchText]);

  return (
    <>
      <div className="relative">
        {/* ===================== SEARCH DRAWER ===================== */}
        <div
          className={
            "fixed inset-0 bg-black/50 z-30 " +
            (visible ? "visible" : "invisible")
          }
          onClick={handleSearch}
        >
          <div
  className={
    "bg-white w-full sm:w-[80%] md:w-[60%] lg:w-[38%] h-full z-50 duration-300 " +
    (visible ? "translate-x-0" : "-translate-x-full")
  }
  onClick={(e) => e.stopPropagation()}
>
  {/* HEADER */}
  <div className="flex items-center justify-between px-6 py-4 border-b">
    <h2 className="text-lg font-semibold text-gray-800">
      Select your location
    </h2>

    {/* Close button */}
    <button
      onClick={handleSearch}
      className="text-gray-500 hover:text-black text-xl font-bold"
    >
      ✕
    </button>
  </div>

  {/* CONTENT */}
  <div className="px-6 py-5 flex flex-col gap-4">
    {/* SEARCH INPUT */}
    <input
      type="text"
      value={searchText}
      onChange={(e) => setSearchText(e.target.value)}
      className="w-full p-3 border border-gray-300 rounded-lg
                 outline-none focus:border-black
                 focus:shadow-[0_0_12px_rgba(0,0,0,0.2)]
                 placeholder:text-gray-500"
      placeholder="Search for area, street name.."
    />

    {/* RESULTS */}
    {searchResult.length > 0 && (
      <ul className="border rounded-lg shadow-sm max-h-[60vh] overflow-y-auto">
        {searchResult.map((item) => (
          <li
            key={item.meta.place_id}
            onClick={() => fetchlatlan(item.meta.place_id)}
            className="flex items-center gap-3 px-4 py-3
                       cursor-pointer hover:bg-gray-100
                       transition-colors"
          >
            <img
              src={item.left_image?.url}
              alt=""
              className="w-9 h-9 rounded-full"
            />
            <div className="flex flex-col">
              <span className="text-sm font-medium text-gray-800">
                {item.title.text}
              </span>
              <span className="text-xs text-gray-500">
                {item.subtitle?.text}
              </span>
            </div>
          </li>
        ))}
      </ul>
    )}
  </div>
</div>

        </div>

        {/* ===================== NAVBAR (UNCHANGED) ===================== */}
        <div className="w-full sticky top-0 z-20 bg-white items-center flex justify-center shadow-lg overflow-hidden">
          <div className="flex items-center w-[95%] sm:w-[90%] lg:w-[82%] justify-between p-3 h-20">
            <div className="flex items-center gap-12">
              <Link to={"/"}>
                <img
                  src="https://assets-netstorage.groww.in/stocks-ipo/logos/Swiggy_logo.png"
                  alt=""
                  className="w-12 rounded-[30%] shadow-md cursor-pointer hover:scale-105 duration-200"
                />
              </Link>

              <div
                className="flex items-center gap-3 cursor-pointer group"
                onClick={handleSearch}
              >
                <p className="border-black border-b-2 text-[16px] font-semibold group-hover:border-orange-600 group-hover:text-orange-600">
                  Other
                </p>

                {/* Address shown only if exists (prevents spacing issue) */}
                {address && (
                  <span className="hidden sm:block line-clamp-1 max-w-[15rem] text-gray-600">
                    {address}
                  </span>
                )}

                <i className="fi mt-0.5 fi-rs-angle-small-down text-xl text-orange-600"></i>
              </div>
            </div>

            <div className="hidden lg:flex w-[63%] text-[16px] justify-between">
              <div className="flex items-center gap-1.5 cursor-pointer">
                <i className="fi fi-bs-briefcase-blank mt-1"></i>
                <p className="hover:text-orange-600 font-semibold">
                  Swiggy Corporate
                </p>
              </div>
              <div className="flex items-center gap-1.5 hover:text-orange-600 cursor-pointer text-gray-800 font-semibold">
                <i className="fi fi-bs-search mt-1"></i>
                <p>Search</p>
              </div>
              <div className="flex items-center gap-1.5 hover:text-orange-600 cursor-pointer text-gray-800 font-semibold">
                <i className="fi fi-rs-badge-percent mt-1 "></i>
                <p>Offers</p>
              </div>
              <div className="flex items-center gap-1.5 hover:text-orange-600 cursor-pointer text-gray-800 font-semibold">
                <i className="fi fi-sr-life-ring mt-1 "></i>
                <p>Help</p>
              </div>
              <div className="flex items-center gap-1.5 hover:text-orange-600 cursor-pointer text-gray-800 font-semibold">
                <i className="fi fi-bs-user mt-1 "></i>
                <p>Sign In</p>
              </div>
              <Link to={"/cart"}>
                <div className="flex items-center gap-1.5 relative hover:text-orange-600 cursor-pointer text-gray-800 font-semibold">
                  <i className="fi fi-rr-square mt-1 "></i>
                  {cartData.length > 0 && (
                    <p className="absolute left-[1px] p-1 text-orange-600">
                      {cartData.length}
                    </p>
                  )}
                  <p>Cart</p>
                </div>
              </Link>
            </div>
          </div>
        </div>

        <Outlet />
      </div>
    </>
  );
}

export default Navbar;
