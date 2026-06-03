import Body from "./Components/Body"
import Navbar from "./Components/Navbar"
import RestaurantMenu from "./Components/RestaurantMenu"
import TopRestraunt from "./Components/TopRestraunt"
import {Route, Routes} from 'react-router-dom'
import { CartContext, Coordinates, Visibility } from "./context/contextApi"
import { useEffect, useState } from "react"
import Cart from "./Components/Cart"
import { useSelector } from "react-redux"

function App() {
  // const [visible,setVisible] = useState(false);
  const [cartData,setCartData] = useState([]);
  const [coord,setCoord] = useState({lat:28.7040592 ,lon:77.10249019999999})

  const visible = useSelector((state)=>state.toggleSlice.searchBarToggle)
  

  function get_Data_From_LocalStorage(){
    let data = JSON.parse(localStorage.getItem("cartData")) || []
    setCartData(data)
  }

  useEffect(()=>{
    get_Data_From_LocalStorage();
  },[])

  return (
  <CartContext.Provider value={{cartData,setCartData}}>
    <Coordinates.Provider value={{coord,setCoord}}>
      {/* <Visibility.Provider value={{visible,setVisible}}> */}
      <div className={visible?"max-h-screen overflow-hidden":" "}>
      <Routes>
          <Route path="/" element = {<Navbar/>}>
            <Route path="/" element = {<Body/>}/>
            <Route path="/menu/:id" element = {<RestaurantMenu/>}/>
            <Route path="/cart" element = {<Cart/>}/>
          </Route>
      </Routes>
      </div>
      {/* </Visibility.Provider> */}
      </Coordinates.Provider>
    </CartContext.Provider>
  )
}

export default App
