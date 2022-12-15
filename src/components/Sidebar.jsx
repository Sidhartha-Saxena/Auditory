import React from "react";
import { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { RiCloseLine } from "react-icons/ri";
// import {logo} from '../assets'
import aud from "../assets/aud.png";
import { links } from "../assets/constants";
import { HiOutlineMenu } from "react-icons/hi";

const NavLinks = ({ handleClick }) => (
  <div className="mt-5">
    {links.map((item) => (
      <NavLink
        className="flex flex-row justify-start items-center my-8 text-lg text-gray-400 hover:text-rose-500 font-medium"
        key={item.name}
        to={item.to}
        onClick={() => handleClick && handleClick()}
      >
        <item.icon className="w-6 h-6 mr-2" />
        {item.name}
      </NavLink>
    ))}
  </div>
);
export default function Sidebar() {
  const [mobile, setMobile] = useState(false);
  const navigate=useNavigate();
  return (
    <>
      <div className="md:flex hidden flex-1 flex-col w-[240px] py-10 px-4 bg-stone-900 backdrop-blur-lg">
        <img src={aud} alt="Auditory" className="w-full h-16 object-contain cursor-pointer" onClick={()=>navigate('/')}/>
        <NavLinks />
      </div>
      <div className="absolute md:hidden block top-6 right-3 ">
        {mobile ? (
          <RiCloseLine
            className="w-6 h-6 text-white mr-2"
            onClick={() => setMobile(false)}
          />
        ) : (
          <HiOutlineMenu
            className="w-6 h-6 text-rose-600 mr-2"
            onClick={() => setMobile(true)}
          />
        )}
      </div>
      <div
        className={`absolute top-0 h-screen w-2/3 bg-stone-900 backdrop-blur-lg z-10 p-6 md:hidden smooth-transition ${
          mobile ? "left-0" : "-left-full"
        }`}
      >
        <img src={aud} alt="Auditory" className="w-full h-24 object-contain cursor-pointer" onClick={()=>navigate('/')}/>
        <NavLinks handleClick={() => setMobile(false)} />
      </div>
    </>
  );
}
