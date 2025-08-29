import React from "react";
import NewsBox from "../components/NewsBox";
import Title from "../components/Title";
import { assets } from "../assets/assets";

const Contact = () => {
  return (
    <div>
      <div className="text-center text2xl pt-10 border-t">
        <Title text1={"CONTACT"} text2={"US"} />
      </div>
      <div className="my-10 flex flex-col md:flex-row justify-center gap-10 mb-28">
        <img
          src={assets.contact_img}
          className="w-full md:max-w-[480px]"
          alt=""
        />
        <div className="flex flex-col justify-center gap-6 items-start">
          <p className="font-semibold text-xl text-gray-600">Our Store</p>
          <p className="text-gray-500">
            14B Adewale Street <br /> Surulere, Lagos, Nigeria.
          </p>
          <p className="text-gray-500">
            Tel: +234 803 456 7890 <br />
            Gmail: mail@tfawecustom.com
          </p>
        </div>
      </div>
      <NewsBox />
    </div>
  );
};

export default Contact;
