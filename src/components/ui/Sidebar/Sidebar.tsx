"use client";
import { logout } from "@/actions";
import { useUiStore } from "@/store";
import clsx from "clsx";
import Link from "next/link";
import {
  IoCloseOutline,
  IoLogInOutline,
  IoLogOutOutline,
  IoPeopleOutline,
  IoPersonOutline,
  IoSearchOutline,
  IoShirtOutline,
  IoTicketOutline,
} from "react-icons/io5";
import { useSession } from "next-auth/react";

export const Sidebar = () => {
  const isSideMenuOpen = useUiStore((state) => state.isSideMenuOpen);
  const closeSideMenu = useUiStore((state) => state.closeSideMenu);

  const { data: session } = useSession();
  
  return (
    <div className="">
      {/* Black background */}
      {isSideMenuOpen && (
        <div className="fixed left-0 top-0 z-10 h-screen w-screen bg-black opacity-30" />
      )}
      {/* Blur */}
      {isSideMenuOpen && (
        <div
          onClick={closeSideMenu}
          className="fade-in fixed left-0 top-0 z-10 h-screen w-screen backdrop-blur-sm backdrop-filter"
        />
      )}
      {/* Side Menu */}
      <nav
        className={clsx(
          "fixed right-0 top-0 z-20 h-screen w-[400px] transform bg-white p-5 shadow-2xl transition-all duration-300",
          { "translate-x-full": !isSideMenuOpen },
        )}
      >
        <IoCloseOutline
          size={36}
          className="text- absolute right-5 top-5 cursor-pointer"
          onClick={closeSideMenu}
        />
        {/* Input de busqueda */}
        <div className="relative mt-10">
          <IoSearchOutline size={26} className="absolute left-2" />
          <input
            type="text"
            placeholder="Buscar"
            className="w-full rounded border-b-2 border-gray-200 bg-gray-50 py-1 pl-10 pr-10 text-sm focus:border-blue-500 focus:outline-none"
          />
        </div>

        {/* Menú */}
        <Link
          href={"/profile"}
          onClick={closeSideMenu}
          className="mt-4 flex items-center rounded p-2 transition-all hover:bg-gray-100"
        >
          <IoPersonOutline size={26} />
          <span className="ml-3 text-sm">Perfil</span>
        </Link>
        <Link
          href={"/"}
          className="mt-4 flex items-center rounded p-2 transition-all hover:bg-gray-100"
        >
          <IoTicketOutline size={26} />
          <span className="ml-3 text-sm">Ordenes</span>
        </Link>
        <Link
          href={"/auth/login"}
          className="mt-4 flex items-center rounded p-2 transition-all hover:bg-gray-100"
          onClick={closeSideMenu}
        >
          <IoLogInOutline size={26} />
          <span className="ml-3 text-sm">Ingresar</span>
        </Link>
        <button
          className="mt-4 flex w-full items-center rounded p-2 transition-all hover:bg-gray-100"
          onClick={() => logout()}
        >
          <IoLogOutOutline size={26} />
          <span className="ml-3 text-sm">Salir</span>
        </button>
        {/* Line separator */}
        <div className="my-10 h-px w-full bg-gray-200">
          <Link
            href={"/"}
            className="mt-4 flex items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoShirtOutline size={26} />
            <span className="ml-3 text-sm">Productos</span>
          </Link>
          <Link
            href={"/"}
            className="mt-4 flex items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoTicketOutline size={26} />
            <span className="ml-3 text-sm">Ordenes</span>
          </Link>
          <Link
            href={"/"}
            className="mt-4 flex items-center rounded p-2 transition-all hover:bg-gray-100"
          >
            <IoPeopleOutline size={26} />
            <span className="ml-3 text-sm">Usuarios</span>
          </Link>
        </div>
      </nav>
    </div>
  );
};
