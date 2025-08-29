import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import ProductItem from "../components/ProductItem";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -30 },
};

const Collection = () => {
  const { products, search, showSearch, loading, error } =
    useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);
  const [category, setCategory] = useState([]);
  const [subCategory, setSubCategory] = useState([]);
  const [sortType, setSortType] = useState("relevant");
  // const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);
  const [accessories, setAccessories] = useState([]);

  // Collections
  useEffect(() => {
    if (!loading && products.length > 0) {
      const bestProduct = products.filter((item) => item.bestseller);
      setBestSeller(bestProduct.slice(0, 5));
      const accessoriesProd = products.filter((item) => item.accessories);
      setAccessories(accessoriesProd.slice(0, 5));
    }
  }, [products, loading]);
  const toggleCategory = (e) => {
    if (category.includes(e.target.value)) {
      setCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setCategory((prev) => [...prev, e.target.value]);
    }
  };

  const toggleSubCategory = (e) => {
    if (subCategory.includes(e.target.value)) {
      setSubCategory((prev) => prev.filter((item) => item !== e.target.value));
    } else {
      setSubCategory((prev) => [...prev, e.target.value]);
    }
  };

  const applyFilter = () => {
    let productsCopy = products.slice();
    if (showSearch && search) {
      productsCopy = productsCopy.filter((item) =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }
    if (category.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        category.includes(item.category)
      );
    }

    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter((item) =>
        subCategory.includes(item.subCategory)
      );
    }
    setFilterProducts(productsCopy);
  };

  const sortProduct = () => {
    let filterProductCopy = filterProducts.slice();
    switch (sortType) {
      case "low-high":
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;

      case "high-low":
        setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price));
        break;

      default:
        applyFilter();
        break;
    }
  };

  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  useEffect(() => {
    sortProduct();
  }, [sortType]);

  if (loading)
    return <div className="pt-10 text-center">Loading products...</div>;
  if (error)
    return <div className="pt-10 text-center text-red-500">{error}</div>;

  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 2 }}
    >
      <div className="flex flex-col sm:flex-row gap-1 pt-10 border-t">
        {/* Left filter*/}
        <div className="min-w-60">
          <p
            onClick={() => setShowFilter(!showFilter)}
            className="my-2 text-xl flex items-center cursor-pointer gap-2"
          >
            Filters
            <img
              className={`h-3 sm:hidden ${showFilter ? "rotate-90" : ""}`}
              src={assets.dropdown_icon}
              alt=""
            />
          </p>
          {/* Category Filter */}
          <div
            className={`border border-gray-300 pl-5 py-3 mt-6 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">Categories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Suits"}
                  onChange={toggleCategory}
                />
                Suits
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Pants"}
                  onChange={toggleCategory}
                />
                Pants
              </p>
              {/* <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Complete"}
                  onChange={toggleCategory}
                />
                Complete
              </p> */}
            </div>
          </div>
          {/*Sub Category filter  */}
          <div
            className={`border border-gray-300 pl-5 py-3 my-5 ${
              showFilter ? "" : "hidden"
            } sm:block`}
          >
            <p className="mb-3 text-sm font-medium">Accessories</p>
            <div className="flex flex-col gap-2 text-sm font-light text-gray-700">
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"EyeWears"}
                  onChange={toggleSubCategory}
                />{" "}
                Eye Wears
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Cufflinks"}
                  onChange={toggleSubCategory}
                />{" "}
                Cufflinks
              </p>
              <p className="flex gap-2">
                <input
                  type="checkbox"
                  className="w-3"
                  value={"Shoes"}
                  onChange={toggleSubCategory}
                />{" "}
                Shoes
              </p>
            </div>
          </div>
        </div>
        {/* Right Side */}
        <div className="flex flex-col">
          <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
              <Title text1={"ALL"} text2={"ACCESSORIES"} />
              {/* Product sort */}
              {/* <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-300 text-small px-2"
              >
                <option value="relevant">Sort By: Relevant</option>
                <option value="low-high">Sort By: Low to High</option>
                <option value="high-low">Sort By: High to Low</option>
              </select> */}
            </div>
            {/* Map Products */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {accessories.map((item, index) => (
                <ProductItem
                  key={index}
                  // name={item.name}
                  id={item._id}
                  image={item.image}
                  // price={item.price}
                />
              ))}
            </div>
          </div>
          {/* ACCESSORIES */}
          {/* <div className="flex-1">
            <div className="flex justify-between text-base sm:text-2xl mb-4">
              <Title text1={"ALL"} text2={"COLLECTIONS"} />
              Product sort
              <select
                onChange={(e) => setSortType(e.target.value)}
                className="border border-gray-300 text-small px-2"
              >
                <option value="relevant">Sort By: Relevant</option>
                <option value="low-high">Sort By: Low to High</option>
                <option value="high-low">Sort By: High to Low</option>
              </select>
            </div>
            Map Products
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6">
              {filterProducts.map((item, index) => (
                <ProductItem
                  key={index}
                  // name={item.name}
                  id={item._id}
                  image={item.image}
                  // price={item.price}
                />
              ))}
            </div>
          </div> */}
        </div>
      </div>
    </motion.div>
  );
};

export default Collection;
// filterProducts
