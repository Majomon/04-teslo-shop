"use client";
import { IoCloseOutline, IoSearchOutline } from "react-icons/io5";

export const Sidebar = () => {
  return (
    <div className="">
      {/* Black background */}
      <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30" />
      {/* Blue */}
      <div className="fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter" />
      {/* Side Menu */}
      <nav className="fixed right-0 top-0 z-20 h-screen w-[500px] transform bg-white p-5 shadow-2xl transition-all duration-300">
        <IoCloseOutline
          size={50}
          className="absolute right-5 top-5 cursor-pointer"
          onClick={() => console.log("click")}
        />
        {/* Input de busqueda */}
        <div className="relative mt-14 ">
          <IoSearchOutline size={20} className="absolute left-2 top-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full rounded border-b-2 border-gray-200 bg-gray-50 py-1 pl-10 pr-10 text-xl focus:border-blue-500 focus:outline-none"
          />
        </div>
      </nav>
    </div>
  );
};
