import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsBox from "../components/NewsBox";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -30 },
};

const Pricing = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 2 }}
    >
      <div className="text-xl playfair">
        <div className="text-2xl text-center pt-8 playfair border-t">
          <Title text2={"PRICING"} />
        </div>
        <div className="my-10 flex flex-col items-center justify-center md:flex-row gap-16">
          <img
            src={assets.price_img}
            className="w-full md:max-w-[450px]"
            alt=""
          />
          <div className="flex flex-col text-center justify-center gap-6 md:w-2/4 text-gray-600 playfair-light">
            <b className="text-center playfair text-2xl">PRICING</b>
            <p className="text-gray-600 playfair-light">
              2 pieces suits starting from $700cad{" "}
            </p>
            <p className="text-gray-600 playfair-light">
              3 pieces suits from $900cad
            </p>
            <p className="text-gray-600 playfair-light">Shirts from $150cad</p>
            <p className="text-gray-600 playfair-light">Jacket from $500cad</p>
            <p className="text-gray-600 playfair-light">
              Trousers from $200cad
            </p>
            <p className="text-gray-600 playfair-light">
              Overcoats from $450cad
            </p>
          </div>
        </div>
        <div className="text-xl py-4 flex flex-col items-center text-center">
          <Title text1={"PLEASE "} text2={"NOTE:"} />
          <p className="text-gray-600 text-md playfair-light">
            Our standard turnaround time is 3 to 4 weeks. Every garment is made
            with care, precision, and attention to detail.
          </p>
        </div>
        <div className="flex flex-col md:flex-row text-sm mb-20 items-center">
          <div className=" px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b className="text-center text-xl playfair">
              <Title
                text1={" With every TFAWE garment, "}
                text2={"you can expect:"}
              />
            </b>
            <ul className="list-disc">
              <li className="mb-1">
                <p className="text-gray-600 playfair-light text-xl">
                  Premium all-natural materials and exceptional craftsmanship
                </p>
              </li>
              <li className="mb-1">
                <p className="text-gray-600 playfair-light text-xl">
                  Access to thousands of luxury fabric options
                </p>
              </li>
              <li className="mb-1">
                <p className="text-gray-600 playfair-light text-xl">
                  Expert guidance from consultation to final fitting
                </p>
              </li>
              <li className="mb-1">
                <p className="text-gray-600 playfair-light text-xl">
                  Impeccable tailoring tailored to your exact measurements
                </p>
              </li>
              <li className="mb-1">
                <p className="text-gray-600 playfair-light text-xl">
                  A wide range of customizable design details to reflect your
                  style.
                </p>
              </li>
            </ul>
          </div>
          <div className=" px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <Link to="/book" className="cursor-pointer hover:text-black">
              <p
                className={`font-semibold text-sm md:text-base bg-black hover:bg-white hover:text-black text-white cursor-pointer py-2 px-4 rounded $`}
              >
                Book Consultation
              </p>
            </Link>
          </div>
        </div>
        <NewsBox />
      </div>
    </motion.div>
  );
};

export default Pricing;
