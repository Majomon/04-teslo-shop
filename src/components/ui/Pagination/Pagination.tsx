"use client";
import { generatePaginationNumbers } from "@/utils";
import clsx from "clsx";
import Link from "next/link";
import { redirect, usePathname, useSearchParams } from "next/navigation";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";

interface Props {
  totalPages: number;
}

// const currentPage =
// Number(searchParams.get("page") ? searchParams.get("page") : 1) || 1;
export const Pagination = ({ totalPages }: Props) => {
  const pathName = usePathname();
  const searchParams = useSearchParams();

  const pageString = searchParams.get("page") ?? 1;
  let currentPage = isNaN(+pageString) ? 1 : +pageString;

  if (currentPage < 1 || isNaN(+pageString)) {
    redirect(pathName);
  }
  
  const allPages = generatePaginationNumbers(currentPage, totalPages);

  const createPageUrl = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);

    if (pageNumber === "...") {
      return `${pathName}?${params.toString()}`;
    }

    if (Number(pageNumber) <= 0) {
      return `${pathName}`;
    }

    if (Number(pageNumber) > totalPages) {
      return `${pathName}?${params.toString()}`;
    }

    params.set("page", pageNumber.toString());

    return `${pathName}?${params.toString()}`;
  };

  return (
    <div className="mb-32 mt-10 flex justify-center text-center">
      <nav aria-label="Page navigation example">
        <ul className="list-style-none flex">
          <li className="page-item disabled">
            <Link
              className="page-link relative block  rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(currentPage - 1)}
            >
              <IoChevronBackOutline size={30} />
            </Link>
          </li>
          {allPages.map((page, index) => (
            <li key={page + "-" + index} className="page-item">
              <Link
                className={clsx(
                  "page-link relative block  rounded border-0 px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none",
                  {
                    "bg-blue-600 text-white shadow-md hover:bg-blue-700 hover:text-white":
                      page === currentPage,
                  },
                )}
                href={createPageUrl(page)}
              >
                {page}
              </Link>
            </li>
          ))}

          <li className="page-item">
            <Link
              className="page-link relative block  rounded border-0 bg-transparent px-3 py-1.5 text-gray-800 outline-none transition-all duration-300 hover:bg-gray-200 hover:text-gray-800 focus:shadow-none"
              href={createPageUrl(currentPage + 1)}
            >
              <IoChevronForwardOutline size={30} />
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};
