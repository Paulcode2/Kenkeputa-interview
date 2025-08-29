import p_img1 from "./TFAWE 1.jpg";
import p_img2_1 from "./TFAWE 2.png";
import p_img2_2 from "./TFAWE 3.jpg";
// import p_img2_3 from "./p_img45.png";
import p_img2_4 from "./TFAWE 5.jpg";
import p_img3 from "./TFAWE 6.jpg";
import p_img4 from "./TFAWE 7.jpg";
import p_img5 from "./TFAWE 8.jpg";
import p_img6 from "./Tfawe prod 1.jpg";
import p_img7 from "./Tfawe prod 2.jpg";
import p_img8 from "./Tfawe prod 3.jpg";
import p_img9 from "./Tfawe prod 4.jpg";
import p_img10 from "./Tfawe prod 5.jpg";
import p_img11 from "./Tfawe prod 6.jpg";
import p_img12 from "./Tfawe prod 7.jpg";
import p_img13 from "./Tfawe prod 8.jpg";
import p_img14 from "./Tfawe prod 9.jpg";
import p_img15 from "./Tfawe prod 10.jpg";
import eye_1 from "./Dark eye wear.jpg";

// Commented out unused imports - keeping for potential future use
// import p_img2_3 from "./p_img45.png";

import logo from "./Logo.jpg";
import hero_img from "./TFAWE 1.jpg";
import cart_icon from "./cart_icon.png";
import bin_icon from "./bin_icon.png";
import dropdown_icon from "./dropdown_icon.png";
import exchange_icon from "./exchange_icon.png";
import profile_icon from "./profile_icon.png";
import price_img from "./New_img.jpg";
import quality_icon from "./quality_icon.png";
import search_icon from "./search_icon.png";
import star_dull_icon from "./star_dull_icon.png";
import star_icon from "./star_icon.png";
import support_img from "./support_img.png";
import menu_icon from "./menu_icon.png";
import about_img from "./About_img.jpg";
import contact_img from "./contact_img.png";
import razorpay_logo from "./razorpay_logo.png";
import stripe_logo from "./stripe_logo.png";
import cross_icon from "./cross_icon.png";

export const assets = {
  logo,
  hero_img,
  cart_icon,
  dropdown_icon,
  exchange_icon,
  profile_icon,
  quality_icon,
  search_icon,
  star_dull_icon,
  star_icon,
  bin_icon,
  support_img,
  menu_icon,
  about_img,
  contact_img,
  razorpay_logo,
  stripe_logo,
  cross_icon,
  price_img,
};

export const products = [
  {
    _id: "aaaaa",
    name: "Double Breasted Suit",
    description: "Double Breasted Suit",
    price: 100,
    image: [p_img1, p_img2_1, p_img2_2, p_img7, p_img9],
    category: ["Suits", "Complete"],
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716634345448,
    bestseller: true,
  },
  {
    _id: "aaaac",
    name: "Brown Double Breasted Suits",
    description: "Brown Double Breasted Suits",
    price: 220,
    image: [p_img3, p_img4],
    category: ["Suits", "Complete"],
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: 1716234545448,
    bestseller: true,
  },

  {
    _id: "aaaaf",
    name: "White Double Breasted Suit",
    description: "White double breasted suit",
    price: 140,
    image: [p_img8, p_img6, p_img7, p_img9, p_img10],
    category: ["Suits", "Complete"],
    subCategory: "Topwear",
    sizes: ["S", "L", "XL"],
    date: 1716623423448,
    bestseller: true,
  },
  {
    _id: "aaaak",
    name: "Peak Lapel Breasted Suit",
    description: "Peak Lapel double breasted suit",
    price: 120,
    image: [p_img11, p_img12, p_img13],
    category: ["Suits", "Complete"],
    subCategory: "Topwear",
    sizes: ["S", "M", "L"],
    date: 1716623345448,
    bestseller: true,
  },
  {
    _id: "aaaal",
    name: "Black Double Breasted Suit",
    description: "Black double breasted suit",
    price: 150,
    image: [p_img14, p_img15],
    category: ["Suits", "Complete"],
    subCategory: "Topwear",
    sizes: ["S", "M", "L", "XL"],
    date: 1716624445448,
    bestseller: true,
  },
  {
    _id: "aaaam",
    name: "Eye Glasses",
    description: "White double breasted suit",
    price: 130,
    image: [eye_1],
    // category: "Complete",
    subCategory: "EyeWears",
    // sizes: ["S", "M", "L", "XL"],
    date: 1716625545448,
    bestseller: false,
    accessories: true,
  },
];
