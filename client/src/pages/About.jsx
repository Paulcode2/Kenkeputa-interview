import React from "react";
import Title from "../components/Title";
import { assets } from "../assets/assets";
import NewsBox from "../components/NewsBox";
import { motion } from "framer-motion";

const pageVariants = {
  initial: { opacity: 0, scale: 0.98, y: 30 },
  animate: { opacity: 1, scale: 1, y: 0 },
  exit: { opacity: 0, scale: 0.98, y: -30 },
};

const About = () => {
  return (
    <motion.div
      variants={pageVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 2 }}
    >
      <div className="text-xl">
        <div className="text-2xl text-center pt-8 playfair border-t">
          <Title text1={"ABOUT"} text2={"US"} />
        </div>
        <div className="my-10 flex flex-col md:flex-row gap-16">
          <img
            src={assets.about_img}
            className="w-full md:max-w-[450px]"
            alt=""
          />
          <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
            <b className="text-center playfair">
              Where Heritage Meets Modern Elegance
            </b>
            <p className="playfair-light">
              At TFAWE, every garment begins with a story...YOURS. What started
              as a small operation in a Toronto home has grown into an
              international brand, with a second home in Lagos, Nigeria. Rooted
              in heritage and driven by the pursuit of personal expression,
              TFAWE was founded on the belief that style is more than
              appearance. It is our identity.
              <br />
              We don’t just make clothes. We shape pieces of character,
              craftsmanship, and confidence.
            </p>
            <b className="text-center playfair">
              A Garment Designed Around You
            </b>
            <p className="playfair-light">
              From the first consultation to the final fitting, the TFAWE
              experience is personal. Every detail i.e. fabric, silhouette,
              stitching, is chosen with your lifestyle, your values, and your
              story in mind. It's not just tailoring, it’s collaboration.
            </p>
            <b className="text-center playfair">
              Crafted with Precision, Worn with Purpose
            </b>
            <p className="playfair-light">
              Our master tailors bring decades of skill to each creation,
              working with premium fabrics sourced from across the globe. The
              result? Garments that fit like second skin and carry the quiet
              power of something made just for you.
            </p>
            <b className="text-center playfair">
              More Than Fashion, A Personal Legacy
            </b>
            <p className="playfair-light">
              This isn’t fast fashion. This is personalised for you. Whether
              you're suiting up for a milestone moment or refining your daily
              presence, a TFAWE piece goes beyond the occasion. It becomes part
              of your journey. Worn with purpose, remembered with pride.
            </p>
          </div>
        </div>
        {/* <div className="text-xl py-4 text-center">
          <Title text1={"OUR "} text2={"PRODUCTS ARE"} />
        </div> */}
        <div className="flex flex-col md:flex-row text-xl mb-20">
          {/* <div className=" px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b className="text-center playfair">
              Crafted with Precision, Worn with Purpose
            </b>
            <p className="text-gray-600 playfair-light">
              Our master tailors bring decades of skill to each creation,
              working with premium fabrics sourced from across the globe. The
              result? Garments that fit like second skin and carry the quiet
              power of something made just for you.
            </p>
          </div> */}
          {/* <div className=" px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
            <b className="text-center playfair">
              More Than Fashion, A Personal Legacy
            </b>
            <p className="text-gray-600 playfair-light">
              This isn’t fast fashion. This is personalised for you. Whether
              you're suiting up for a milestone moment or refining your daily
              presence, a TFAWE piece goes beyond the occasion. It becomes part
              of your journey. Worn with purpose, remembered with pride.
            </p>
          </div> */}
          {/* <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
          <b>Exceptional Customer Service:</b>
          <p className="text-gray-600 ">
            Our team of dedicated professionals is here to assist you the way,
            ensuring your satisfaction is our top priority.
          </p>
        </div> */}
        </div>
        <NewsBox />
      </div>
    </motion.div>
  );
};

export default About;
