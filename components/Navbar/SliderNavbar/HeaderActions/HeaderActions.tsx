"use client"
import type React from "react"
import Link from "next/link"
import { FiSearch, FiUser, FiShoppingCart, FiHeart } from "react-icons/fi"
import { CiLogout, CiLogin } from "react-icons/ci";
import useFetchCartItems from "../../../../hooks/CartPageHook/useFetchCartItems"
import useWishlist from "../../../../hooks/WishlistHooks/useWishlistHook"
import useNavbar from "../../../../hooks/GeneralHooks/useNavbar"
import { useRouter } from "next/router";
import { useState } from "react";

const HeaderActions = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const { cartCount } = useFetchCartItems();
  const { wishlistCount } = useWishlist();
  const { handleLogoutUser, isLoggedIn } = useNavbar();
  const router = useRouter();

  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm.trim() !== '') {
      const formattedSearchTerm = searchTerm.toLowerCase().trim().replace(/\s+/g, '-');
      router.push({
        pathname: `/product-category/${formattedSearchTerm}`,
        query: { page: 1, currency: 'INR' }
      });
    }
  };
  
  return (
    <header className="border-bottom py-3">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-md-3 d-flex justify-content-center">
            <Link href="/" className="d-flex align-items-center text-decoration-none">
              <div className="me-2">
                <svg width="120" height="40" viewBox="0 0 120 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M99.5 20C99.5 25.5 95.5 30 90 30C84.5 30 80.5 25.5 80.5 20C80.5 14.5 84.5 10 90 10C95.5 10 99.5 14.5 99.5 20Z"
                    fill="#7B189F"
                  />
                  <path
                    d="M19.5 20C19.5 25.5 15.5 30 10 30C4.5 30 0.5 25.5 0.5 20C0.5 14.5 4.5 10 10 10C15.5 10 19.5 14.5 19.5 20Z"
                    fill="#7B189F"
                  />
                  <path d="M23.5 20L30 10H37L30.5 20L37 30H30L23.5 20Z" fill="#7B189F" />
                  <path d="M40 10H47L50 25L53 10H58L61 25L64 10H71L65 30H58L55 15L52 30H45L40 10Z" fill="#7B189F" />
                  <path
                    d="M72 10H79V13C80 11 82 10 84 10C88 10 90 12 90 17V30H83V19C83 17 82 16 80 16C78 16 77 17 77 19V30H72V10Z"
                    fill="#7B189F"
                  />
                  <path
                    d="M103 10H110V13C111 11 113 10 115 10C119 10 121 12 121 17V30H114V19C114 17 113 16 111 16C109 16 108 17 108 19V30H103V10Z"
                    fill="#7B189F"
                  />
                </svg>
              </div>
            </Link>
          </div>

          {/* Search Bar */}
          <div className="col-md-6 px-4">
            <div className="position-relative">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control border border-1 rounded-start py-2"
                  placeholder="Search..."
                  aria-label="Search"
                  value={searchTerm}
                  onChange={(e: any) => setSearchTerm(e.target.value)}
                />
                <button
                  className="btn text-white rounded-end px-3"
                  type="button"
                  style={{ backgroundColor: "#7B189F" }}
                  onClick={handleSearch}
                >
                  <FiSearch size={20} />
                </button>
              </div>
            </div>
          </div>

          {/* User Actions */}
          <div className="col-md-3 d-flex justify-content-center align-items-center gap-4 ps-5">
            {isLoggedIn ? (
              <span onClick={handleLogoutUser} style={{ cursor: 'pointer' }}><CiLogout /></span>
            ) :
              (
                <Link href={'/login'}>
                  <CiLogin />
                </Link>
              )}
            {/* <Link href="/account" className="text-decoration-none text-dark d-flex align-items-center gap-2">
              <FiUser size={20} />
              <span>Sign In</span>
            </Link> */}
            <Link href="/my-orders" passHref className="text-decoration-none text-dark">
              <span>My Orders</span>
            </Link>
            <Link href="/wishlist">
              <FiHeart className="icon" />
              <span>
                {wishlistCount}
              </span>
            </Link>
            <Link href="/cart" className="text-decoration-none text-dark d-flex align-items-center gap-2">
              <FiShoppingCart size={20} />
              <span>{cartCount}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  )
}

export default HeaderActions
