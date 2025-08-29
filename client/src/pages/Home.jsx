import React from "react";
import Hero from "../components/Hero";
// import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
// import Policy from "../components/Policy";
import NewsBox from "../components/NewsBox";
import { motion } from "framer-motion";

const slideInLeft = {
  initial: { opacity: 0, x: -100 },
  animate: { opacity: 1, x: 0 },
};

const transition = {
  duration: 5,
  ease: "easeOut",
};

const Home = () => {
  return (
    <div>
      <motion.section
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <Hero />
      </motion.section>
      {/* <motion.section
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <LatestCollection />
        <hr />
      </motion.section> */}
      <motion.section
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <BestSeller />
      </motion.section>
      {/* <Policy /> */}
      <motion.section
        variants={slideInLeft}
        initial="initial"
        animate="animate"
        transition={transition}
      >
        <NewsBox />
      </motion.section>
    </div>
  );
};

export default Home;
