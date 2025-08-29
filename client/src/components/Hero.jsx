
import { Link } from "react-router-dom";
import { assets } from "../assets/assets";
import { BsWhatsapp } from "react-icons/bs";

const Hero = () => {
  // Example usage of import.meta.env for Vite environment variables
  const apiUrl = import.meta.env.VITE_REACT_APP_API_URL || "";
  // Example: const heroImgUrl = `${apiUrl}/uploads/your-hero-image.jpg`;
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0">
        <div className="text-[#414141]">
          <div className="flex items-center gap-2">
            {/* ...existing code... */}
          </div>
          <div className="group ">
            <Link to="/book" className="cursor-pointer hover:text-black">
              <p className="font-semibold text-sm md:text-base bg-black hover:bg-white hover:text-black text-white cursor-pointer py-2 px-4 rounded">
                Book Consultation
              </p>
            </Link>
            {/* ...existing code... */}
          </div>
        </div>
      </div>
      {/* Hero Right Side */}
      {/* Example: <img src={heroImgUrl} className="w-full sm:w-1/2" alt="" /> */}
      <img src={assets.hero_img} className="w-full sm:w-1/2" alt="" />
    </div>
  );
};

export default Hero;
