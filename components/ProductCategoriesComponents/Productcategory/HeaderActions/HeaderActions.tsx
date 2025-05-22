
"use client";
import type React from "react";
import { FiSearch } from "react-icons/fi";
import { useRouter } from "next/router"; // Switch to "next/navigation" if using App Router
import { useState } from "react";
import SelectSearch from "react-select-search";
import Select from "react-select";
import "react-select-search/style.css";
import { flattenCategories } from "./flattenCategories"; // Adjust the import path as necessary

const HeaderActions = ({ navbarData }: any) => {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const user = localStorage.getItem('party_name');
  const { query } = router;


  const flattenedData = flattenCategories(navbarData);
  // Transform to react-select-search format
  const formattedSearchOptions = flattenedData.map((option: any) => ({
    name: option?.label, // Displayed in the dropdown
    value: option?.slug, // Used for routing
  }));
  const formattedSelectOptions = formattedSearchOptions.map((opt: any) => ({
    label: opt.name,
    value: opt.value,
  }));

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

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && searchTerm.trim() !== "") {
      console.log("Enter pressed, searching for:", searchTerm);
      handleSearch(searchTerm);
      e.preventDefault(); // Prevent default form submission or dropdown behavior
    }
  };
  

  return (
    <header className="py-3 navbar_slider_header">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          {/* Search Bar */}
          <div className="col-md-8 col-12 px-4">
            <div className="position-relative">
              <div className="input-group">

                <Select
                  options={formattedSelectOptions}
                  value={formattedSelectOptions.find((opt: any) => opt.value === searchTerm) || null}
                  onChange={(selected) => {
                    const value = selected?.value || "";
                    setSearchTerm(value);
                  }}
                  placeholder="Search..."
                  isSearchable
                  onKeyDown={handleKeyDown}
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