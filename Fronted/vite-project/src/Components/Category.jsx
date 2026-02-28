import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { filterByCategroy } from "../../Redux/Listing";
import { MdWhatshot } from "react-icons/md";
import { GiFamilyHouse } from "react-icons/gi";
import { MdBedroomParent } from "react-icons/md";
import { MdOutlinePool } from "react-icons/md";
import { GiWoodCabin } from "react-icons/gi";
import { SiHomeassistantcommunitystore } from "react-icons/si";
import { IoBedOutline } from "react-icons/io5";
import { FaTreeCity } from "react-icons/fa6";
import { BiBuildingHouse } from "react-icons/bi";

function Category() {

    const dispatch = useDispatch();
    const [activeCategory, setActiveCategory] = useState("trending");

    const categories = [
        { key: "trending", label: "Trending", icon: <MdWhatshot size={22} /> },
        { key: "villa", label: "Villa", icon: <GiFamilyHouse size={22} /> },
        { key: "room", label: "Rooms", icon: <MdBedroomParent size={22} /> },
        { key: "pool-house", label: "Pool House", icon: <MdOutlinePool size={22} /> },
        { key: "cabin", label: "Cabins", icon: <GiWoodCabin size={22} /> },
        { key: "shop", label: "Shops", icon: <SiHomeassistantcommunitystore size={22} /> },
        { key: "pg", label: "PG", icon: <IoBedOutline size={22} /> },
        { key: "farm-house", label: "Farm House", icon: <FaTreeCity size={22} /> },
        { key: "flat", label: "Flat", icon: <BiBuildingHouse size={22} /> },
      ];

      const handleCategroy = (category) => {
        setActiveCategory(category);
        dispatch(filterByCategroy(category));
    
        console.log(category);
      };
  return (
    <div className="
    sticky top-20 z-40
    bg-white border-b border-gray-200
  ">
    <div className="
      flex gap-8 px-4 py-4
      overflow-x-auto scrollbar-hide
      md:justify-center
    ">
      {categories.map((cat) => (
        <div
          key={cat.key}
          onClick={() =>handleCategroy(cat.key)}
          className={`
            flex flex-col items-center min-w-[72px] cursor-pointer
            transition-all duration-200
            ${activeCategory === cat.key
              ? "text-black border-b-2 border-black"
              : "text-gray-500 hover:text-black"}
          `}
        >
          {cat.icon}
          <span className="mt-1 text-xs md:text-sm whitespace-nowrap font-medium">
            {cat.label}
          </span>
        </div>
      ))}
    </div>
  </div>
  )
}

export default Category