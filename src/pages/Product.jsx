import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";

const Product = () => {
  const { productId } = useParams();
  const { products, loading, error, addToCart, cartLoading } =
    useContext(ShopContext);
  const [productData, setProductData] = useState(false);
  const [image, setImage] = useState("");
  const [addMsg, setAddMsg] = useState("");
  // const [size, setSize] = useState("");

  const whatsappNumber = "2348105994494"; // Replace with your number (e.g., Nigeria: 234...)
  // Size: ${productData.sizes}
  // Image: ${productData.image}
  const message = `Hello, I'm interested in this product:
  Name: ${productData.name}
  Description: ${productData.description}

  
  Is it still available?`;
  const encodedMessage = encodeURIComponent(message);
  const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;

  useEffect(() => {
    if (!loading && products.length > 0) {
      const found = products.find((item) => item._id === productId);
      if (found) {
        setProductData(found);
        setImage(found.image[0]);
      }
    }
  }, [productId, products, loading]);

  if (loading)
    return <div className="pt-10 text-center">Loading product...</div>;
  if (error)
    return <div className="pt-10 text-center text-red-500">{error}</div>;

  return productData ? (
    <div className="border-t-2 pt-10 transition-opacity ease-in-duration-500 opacity-100 ">
      {/* Product Data */}
      <div className="flex gap-12 flex-col sm:gap-12 sm:flex-row">
        {/* Prod Images */}
        <div className="flex-1 flex flex-col-reverse gap-3 sm:flex-row">
          <div className="flex sm:flex-col overflow-x-auto sm:overflow-y-scroll justify-between sm:justify-normal w-full sm:w-[18.7%]">
            {productData.image.map((item, index) => (
              <img
                onClick={() => setImage(item)}
                src={item}
                key={index}
                className="w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer"
                alt=""
              />
            ))}
          </div>
          <div className="w-full sm:w-[80%]">
            <img className="w-full h-auto" src={image} alt="" />
          </div>
        </div>
        {/* Prod info */}
        <div className="flex-1 ">
          <h1 className="font-medium text-2xl mt-2">{productData.name}</h1>
          <div className="flex items-center gap-1 mt-2">
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_icon} alt="" className="w-3 5" />
            <img src={assets.star_dull_icon} alt="" className="w-3 5" />
            <p className="pl-2">(122)</p>
          </div>
          {/* <p className="mt-5 text-3xl font-medium">
            {currency}
            {productData.price}
          </p> */}
          {/* <p className="mt-5 text-gray-500 md:w-4/5">
            {productData.description}
          </p> */}
          {/* <div className="flex flex-col gap-4 my-8">
            <p>Select Size</p>
            <div className="flex gap-2">
              {productData.sizes.map((item, index) => (
                <button
                  onClick={() => setSize(item)}
                  className={`border py-1 cursor-pointer px-2 bg-gray-400 ${
                    item === size ? "border-orange-400" : ""
                  } `}
                  key={index}
                >
                  {item}
                </button>
              ))}
            </div>
          </div> */}
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
            <a target="_blank" href={whatsappLink}>
              <button className="bg-green-600 text-white px-8 py-3 text-sm active:bg-green-800 cursor-pointer rounded">
                Get Product
              </button>
            </a>
            {addMsg && <div className="text-green-600 text-sm">{addMsg}</div>}
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="opacity-0 "></div>
  );
};

export default Product;
