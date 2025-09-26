import React, { useState, useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, loading, error, addToCart, cartLoading } =
    useContext(ShopContext);

  const [productData, setProductData] = useState(null);
  const [image, setImage] = useState("");
  const [addMsg, setAddMsg] = useState("");

  const whatsappNumber = "2348105994494"; // Replace with your number
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "";

  useEffect(() => {
    if (!loading && products.length > 0) {
      const found = products.find((item) => item._id === productId);
      if (found) {
        setProductData(found);
        setImage(
          found.image && found.image[0]
            ? `${apiUrl}${found.image[0]}`
            : "/placeholder.jpg"
        );
      }
    }
  }, [productId, products, loading, apiUrl]);

  if (loading)
    return <div className="pt-10 text-center">Loading product...</div>;
  if (error)
    return <div className="pt-10 text-center text-red-500">{error}</div>;

  if (!productData) return null;

  const whatsappMessage = encodeURIComponent(
    `Hello, I'm interested in this product:\nName: ${productData.name}\nDescription: ${productData.description}\nIs it still available?`
  );
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

  return (
    <div className="border-t-2 pt-10 transition-opacity ease-in duration-500 opacity-100">
      <div className="flex gap-12 flex-col sm:gap-12 sm:flex-row">
        {/* Product Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((img, index) => (
              <img
                key={index}
                onClick={() => setImage(`${apiUrl}${img}`)}
                src={`${apiUrl}${img}`}
                alt={productData.name}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt={productData.name} />
          </div>
        </div>

        {/* Product Info */}
        <div className="flex-1">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={assets.star_icon}
                alt="star"
                className="w-3 h-3"
              />
            ))}
            <img
              src={assets.star_dull_icon}
              alt="star dull"
              className="w-3 h-3"
            />
            <p className="pl-2">(122)</p>
          </div>

          <div className="flex flex-col gap-2 mt-8">
            <button
              className="bg-black text-white px-8 py-3 text-sm active:bg-gray-700 cursor-pointer rounded"
              disabled={cartLoading}
              onClick={async () => {
                await addToCart(productData._id, 1);
                setAddMsg("Added to cart!");
                setTimeout(() => setAddMsg(""), 1500);
              }}
            >
              {cartLoading ? "Adding..." : "Add to Cart"}
            </button>

            <a target="_blank" rel="noopener noreferrer" href={whatsappLink}>
              <button className="bg-green-600 text-white px-8 py-3 text-sm active:bg-green-800 cursor-pointer rounded mt-2">
                Get Product
              </button>
            </a>

            {addMsg && <div className="text-green-600 text-sm">{addMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Product;
