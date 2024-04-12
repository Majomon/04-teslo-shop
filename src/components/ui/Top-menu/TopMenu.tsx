"use client"
import { titleFont } from "@/config/fonts";
import { useUiStore } from "@/store";
import Link from "next/link";
import { IoSearchOutline, IoCartOutline } from "react-icons/io5";

export const TopMenu = () => {
  const openSideMenu = useUiStore((state) => state.openSideMenu);

  return (
    <nav className="flex w-full items-center justify-between px-5">
      {/* Logo */}
      <div>
        <Link href={"/"}>
          <span className={`${titleFont.className} font-bold antialiased`}>
            Teslo
          </span>
          <span> | Shop</span>
        </Link>
      </div>
      {/* Ceneter menu */}
      <div className="hidden sm:block">
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href={"/category/men"}
        >
          Hombres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href={"/category/women"}
        >
          Mujeres
        </Link>
        <Link
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
          href={"/category/kids"}
        >
          Niños
        </Link>
      </div>
      {/* Search, cart, menu */}
      <div className="flex items-center">
        <Link href={"/search"} className="mx-2">
          <IoSearchOutline className="h-5 w-5" />
        </Link>
        <Link href={"/cart"} className="mx-2">
          <div className="relative">
            <span className="absolute -right-2 -top-2 rounded-full bg-blue-700 px-1 text-xs font-bold text-white">
              3
            </span>
            <IoCartOutline className="h-5 w-5" />
          </div>
        </Link>
        <button
          onClick={openSideMenu}
          className="m-2 rounded-md p-2 transition-all hover:bg-gray-100"
        >
          Menú
        </button>
      </div>
    </nav>
  );
};
