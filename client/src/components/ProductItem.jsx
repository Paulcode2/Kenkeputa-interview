import React, { useContext, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { Link } from "react-router-dom";

const ProductItem = ({ id, image, name, price }) => {
  const { addToCart, cartLoading } = useContext(ShopContext);
  const [addMsg, setAddMsg] = useState("");
  // const { currency } = useContext(ShopContext);
  // Use backend image URL from environment variable
  const backendUrl = import.meta.env.VITE_REACT_APP_API_URL || "http://localhost:5000";
  const imgSrc = image ? `${backendUrl}${image}` : "/placeholder.jpg";

  const handleAddToCart = async (e) => {
    e.preventDefault(); // Prevent navigation
    await addToCart(id, 1);
    setAddMsg("Added!");
    setTimeout(() => setAddMsg(""), 1500);
  };

  return (
    <div className="text-gray-700 cursor-pointer relative">
      <Link to={`/product/${id}`}>
        <div className="overflow-hidden">
          <img className="hover:scale-110" src={imgSrc} alt={name || "Product"} />
        </div>
        <p className="pt-3 pb-1 text-sm">{name || "Product"}</p>
        <p className="text-sm font-medium">
          {/* {currency} */} {price ? `$${price}` : ""}
        </p>
      </Link>
      <button
        className="absolute bottom-2 right-2 bg-black text-white px-2 py-1 text-xs rounded hover:bg-gray-800"
        onClick={handleAddToCart}
        disabled={cartLoading}
      >
        {cartLoading ? "..." : "+"}
      </button>
      {addMsg && (
        <div className="absolute top-2 left-2 bg-green-500 text-white px-2 py-1 text-xs rounded">
          {addMsg}
        </div>
      )}
    </div>
  );
};

export default ProductItem;
