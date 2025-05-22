"use client";
import type React from "react";
import Link from "next/link";
import { FaUserCircle } from "react-icons/fa";
import { IoCart, IoHeart } from "react-icons/io5";
import useFetchCartItems from "../../../hooks/CartPageHook/useFetchCartItems";
import useWishlist from "../../../hooks/WishlistHooks/useWishlistHook";
import useNavbar from "../../../hooks/GeneralHooks/useNavbar";
import { useRouter } from "next/router"; // Switch to "next/navigation" if using App Router
import { useState } from "react";
import { NavDropdown } from 'react-bootstrap';
import "react-select-search/style.css";
import style from "../../../styles/components/navbarWithoutCategory.module.scss";
import autohouseLogo from "../../../public/assets/images/autohousehubliLarge.png";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { resetBreadcrumb } from "../../../store/slices/category-breadcrumb-slice/category-breadcrumb-slice";

const NavbarWithoutSearch = () => {
  const [showDropDown, setShowDropDown] = useState(false);
  const { cartCount } = useFetchCartItems();
  const { wishlistCount } = useWishlist();
  const { handleLogoutUser, isLoggedIn } = useNavbar();
  const router = useRouter();
  const dispatch = useDispatch();
  const { asPath, pathname } = router;
  const user = localStorage.getItem('party_name');
  const handleShowDropDown = () => setShowDropDown(!showDropDown);

  const handleToggle = (e: any) => {
    setShowDropDown((prevState) => !prevState);
  };

  if (!asPath.startsWith("/product-category")) {
    dispatch(resetBreadcrumb());
  }

  return (
    <header className="border-bottom py-3 navbar_slider_header">
      <div className="container-fluid px-4">
        <div className="row align-items-center">
          {/* Logo */}
          <div className="col-md-3 d-flex justify-content-center">
            <Link href="/" className="d-flex align-items-center text-decoration-none">
              <Image
                src={autohouseLogo.src}
                alt="logo"
                width={200}
                height={50}
                className="object-fit-contain"
              />
            </Link>
          </div>
          {/* shop  */}
          <div className="col-md-6 d-flex justify-content-center align-items-center gap-4 ps-5">
            <Link
              href="/product-category?page=1&currency=INR"
              className={`text-decoration-none text-secondary ${style.navLink} ${pathname.startsWith("/product-category") ? style.active : ""}`}
            >
              <span className={style.order_list_dropdown}>Shop</span>
            </Link>

            <Link
              href="#"
              className={`text-decoration-none text-secondary ${style.navLink} ${pathname === "/about" ? style.active : ""}`}
            >
              <span className={style.order_list_dropdown}>About</span>
            </Link>

            <Link
              href="#"
              className={`text-decoration-none text-secondary ${style.navLink} ${pathname === "/contact" ? style.active : ""}`}
            >
              <span className={style.order_list_dropdown}>Contact Us</span>
            </Link>

          </div>
          {/* User Actions */}
          <div className="col-md-3 d-flex justify-content-center align-items-center gap-4 ps-5">
            {isLoggedIn ? (
              <>

                <div className={`${style.icon_container}`}>
                  <Link href="/wishlist" className={`text-decoration-none text-dark ${style.icon_container}`}>
                    <IoHeart className="icon" />
                    <span className={`${style.badge_count}`}>{wishlistCount}</span>
                    <span className={`${style.order_list_dropdown}`}>Wishlist</span>
                  </Link>
                </div>
                <div className={`${style.icon_container}`}>
                  <Link
                    href="/cart"
                    className={`text-decoration-none text-dark d-flex align-items-center gap-2 ${style.icon_container}`}
                  >
                    <IoCart size={20} />
                    <span className={`${style.badge_count} ${style.badge_count_cart}`}>{cartCount}</span>
                    <span className={`${style.order_list_dropdown}`}>Cart</span>
                  </Link>
                </div>


                <div>
                  <div className={style.icon_container} onClick={handleShowDropDown}>
                    <FaUserCircle className="icon" />
                    <span className={`d-none d-md-inline-block theme-blue mt-2 ${style.order_list_dropdown}`}>{user}</span>
                  </div>

                  {isLoggedIn && (
                    <NavDropdown
                      title={''}
                      id="basic-nav-dropdown"
                      className={` ${style.order_list_dropdown}`}
                      show={showDropDown}
                      onToggle={handleToggle}
                    >
                      <Link href="/profile" passHref className="text-decoration-none">
                        <NavDropdown.Item
                          as="a"
                          className={`text-decoration-none ${style.order_list_items} custom-dropdown-item`}
                        >
                          My Account
                        </NavDropdown.Item>
                      </Link>

                      <Link href="/my-orders" passHref className="text-decoration-none">
                        <NavDropdown.Item
                          as="a"
                          className={`text-decoration-none ${style.order_list_items} custom-dropdown-item`}
                        >
                          My Orders
                        </NavDropdown.Item>
                      </Link>

                      <Link href="#" passHref className="text-decoration-none" onClick={handleLogoutUser}>
                        <NavDropdown.Item
                          as="a"
                          className={`text-decoration-none ${style.order_list_items} custom-dropdown-item`}
                        >
                          logout
                        </NavDropdown.Item>
                      </Link>
                    </NavDropdown>
                  )}
                </div>

              </>
            ) : (
              <Link href={"/login"} className={`text-decoration-none text-dark ${style.icon_container}`}>
                <FaUserCircle />
                <span>Sign In</span>
              </Link>
            )}

          </div>
        </div>
      </div>
    </header>

  );
};

export default NavbarWithoutSearch;