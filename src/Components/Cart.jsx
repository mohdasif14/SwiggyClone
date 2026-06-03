import { useContext } from "react";
import { CartContext } from "../context/contextApi";

function Cart() {
  const { cartData, setCartData } = useContext(CartContext);

  function handleRemove(index) {
    if (cartData.length>1 ) {
      const newCart = [...cartData];
      newCart.splice(index, 1);
      setCartData(newCart);
      localStorage.setItem("cartData", JSON.stringify(newCart));
    }else{
      handleClearCart()
    }
  }

  function handleClearCart() {
    setCartData([]);
    // localStorage.removeItem("cartData");
    localStorage.clear();
  }

  // Calculate total
  const itemTotal = cartData.reduce(
    (sum, item) =>
      sum + (item.price || item.defaultPrice) / 100,
    0
  );

  if (cartData.length === 0) {
    return (
      <div className="flex flex-col items-center mt-20 text-gray-600">
        <h2 className="text-2xl font-bold">Your cart is empty</h2>
        <p className="mt-2">Add items to see them here</p>
      </div>
    );
  }

  return (
    <div className="w-full bg-gray-100 min-h-screen py-10">
      <div className="w-[95%] lg:w-[80%] mx-auto flex flex-col lg:flex-row gap-6">
        
        {/* LEFT: CART ITEMS */}
        <div className="w-full lg:w-[65%] bg-white rounded-xl shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-xl sm:text-2xl font-extrabold">Your Cart</h1>

            <button
              onClick={handleClearCart}
              className="text-red-600 font-semibold text-sm hover:underline"
            >
              Clear Cart
            </button>
          </div>

          {cartData.map((item, index) => (
            <div
              key={index}
              className="flex justify-between items-center border-b border-gray-200 py-4"
            >
              <div className="flex-1 pr-4">
                <h2 className="font-bold text-gray-800 text-lg">
                  {item.name}
                </h2>
                <p className="text-gray-600 mt-1">
                  ₹{(item.price || item.defaultPrice) / 100}
                </p>

                <button
                  className="mt-3 text-red-600 font-semibold text-sm hover:underline"
                  onClick={() => handleRemove(index)}
                >
                  Remove
                </button>
              </div>

              <img
                className="w-20 h-20 sm:w-28 sm:h-28 rounded-lg object-cover"
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_300,h_300,c_fit/${item.imageId}`}
                alt={item.name}
              />
            </div>
          ))}
        </div>

        {/* RIGHT: BILL SUMMARY */}
        <div className="w-full lg:w-[35%] bg-white rounded-xl shadow-lg p-6 h-fit">
          <h2 className="text-lg font-bold mb-4">Bill Details</h2>

          <div className="flex justify-between mb-2 text-gray-700">
            <p>Item Total</p>
            <p>₹{itemTotal.toFixed(0)}</p>
          </div>

          <div className="flex justify-between mb-2 text-gray-700">
            <p>Delivery Fee</p>
            <p>₹40</p>
          </div>

          <div className="flex justify-between mb-4 text-gray-700">
            <p>GST & Charges</p>
            <p>₹25</p>
          </div>

          <div className="flex justify-between font-extrabold text-lg border-t pt-4">
            <p>TO PAY</p>
            <p>₹{(itemTotal + 65).toFixed(0)}</p>
          </div>

          <button className="w-full mt-6 bg-orange-500 text-white font-bold py-3 rounded-lg hover:bg-orange-600">
            Proceed to Checkout
          </button>
        </div>

      </div>
    </div>
  );
}

export default Cart;
