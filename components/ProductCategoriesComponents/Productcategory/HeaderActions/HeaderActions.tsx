"use client";
import type React from "react";
import Link from "next/link";
import { FiSearch, FiShoppingCart, FiHeart, FiUser } from "react-icons/fi";
import { CiLogout, CiLogin } from "react-icons/ci";
import { FaShoppingBag } from "react-icons/fa";
import useFetchCartItems from "../../../../hooks/CartPageHook/useFetchCartItems";
import useWishlist from "../../../../hooks/WishlistHooks/useWishlistHook";
import useNavbar from "../../../../hooks/GeneralHooks/useNavbar";
import { useRouter } from "next/router"; // Switch to "next/navigation" if using App Router
import { useState } from "react";
import { NavDropdown } from 'react-bootstrap';
import SelectSearch from "react-select-search";
import "react-select-search/style.css";
import style from "../../../../styles/components/sliderNavbar.module.scss";
import { flattenCategories } from "./flattenCategories"; // Adjust the import path as necessary

const HeaderActions = ({ navbarData, selectedLanguageData }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const user = localStorage.getItem('party_name');
  const { query } = router;

  const handleSearch = (value: string) => {
    if (value.trim() !== "") {
      const formattedSearchTerm = value.toLowerCase().trim().replace(/\s+/g, "-");

      router.push({
        pathname: `/product-category/${formattedSearchTerm}`,
        query: {
          page: 1,
          currency: "INR",
          ...(query.vehicle_filters && { vehicle_filters: query.vehicle_filters as string }),
        },
      });
    }
  };
  const flattenedData = flattenCategories(navbarData);
  // Transform to react-select-search format
  const formattedSearchOptions = flattenedData.map((option: any) => ({
    name: option?.label, // Displayed in the dropdown
    value: option?.slug, // Used for routing
  }));

  // console.log("formattedSearchOptions",formattedSearchOptions);

  return (
    <header className="py-3 navbar_slider_header">
      <div className="container-fluid px-4">
        <div className="row align-items-center">


          {/* Search Bar */}
          <div className="col-md-8 col-12 px-4">
            <div className="position-relative">
              <div className="input-group">
                <SelectSearch
                  options={formattedSearchOptions}
                  value={searchTerm}
                  // @ts-expect-error
                  style={{ width: "80%" }}
                  onChange={(value: any) => {
                    setSearchTerm(value);
                    handleSearch(value);
                  }}
                  placeholder="Search..."
                  search
                />
                <button
                  className="btn text-white rounded-end px-3"
                  type="button"
                  style={{ backgroundColor: "#7B189F" }}
                  onClick={() => handleSearch(searchTerm)}
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </div>
          </div>


        </div>
      </div>
    </header>
  );
};

export default HeaderActions;