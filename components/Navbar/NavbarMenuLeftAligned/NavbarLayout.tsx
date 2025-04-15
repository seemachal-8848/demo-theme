import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';
import { GoSearch } from 'react-icons/go';
import { RiMenu2Line } from 'react-icons/ri';
import logo from '../../../public/assets/images/logo.png';
import stylesNavbar from '../../../styles/components/navbar.module.scss';
import CustomProductCategoriesNavbar from '../CustomProductCategoriesNavbar';
import MobileProductCategories from '../MobileProductCategories';

function LogoInCenterNavbar({
  navbarData,
  isLoading,
  errorMessage,
  selectedCurrencyValue,
  handleLogoutUser,
  multiLanguagesData,
  selectedLang,
  handleLanguageChange,
  selectedLanguageData,
  cartCount,
  wishlistCount,
  isLoggedIn,
}: any) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [showDropDown, setShowDropDown] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = router?.asPath;
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm !== '') {
      router.push('/product/' + searchTerm);
    }
  };
  const handleCloseSidebar = () => setIsSidebarOpen(false);
  const handleShowDropDown = () => setShowDropDown(!showDropDown);
  const handleToggle = (e: any) => {
    setShowDropDown((prevState) => !prevState);
  };
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  return (
    <>
      <header className={path === '/' ? (scrolled ? stylesNavbar.scrolled_navbar : stylesNavbar.transperant_navbar) : stylesNavbar?.header}>
        <nav>
          <div className={`${stylesNavbar.navbar} ps-lg-4 pe-lg-4`}>
            <div className="w-100 d-flex  py-2 align-items-center">
              {/* Product Categories Navbar */}
              {navbarData?.length > 0 && navbarData[0]?.slug === 'all-category' && (
                <div className="col-4 d-none d-md-none d-lg-block">
                  <CustomProductCategoriesNavbar
                    navbarData={navbarData[0]?.values}
                    errorMessage={errorMessage}
                    selectedCurrencyValue={selectedCurrencyValue}
                    multiLanguagesData={multiLanguagesData}
                    selectedLang={selectedLang}
                    handleLanguageChange={handleLanguageChange}
                  />
                </div>
              )}
              <div className="col-4 mobile-nav text-start px-3 px-sm-4 d-block d-lg-none">
                <a
                  className="mobile-menu-toggle w-icon-hamburger"
                  aria-label="menu-toggle"
                  onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                >
                  <RiMenu2Line className="icon" />
                </a>
              </div>
              <div className="col-4 text-center d-none d-sm-block">
                <Link href="/" legacyBehavior>
                  <a>
                    <Image
                      className=""
                      style={{ maxWidth: '250px', maxHeight: '59px' }}
                      src={logo}
                      alt="logo"
                      layout="responsive"
                      width={100}
                      height={100}
                      priority={true}
                    />
                  </a>
                </Link>
              </div>

              <div className={`col-8 col-sm-4 text-end`}>
                <ul className=" list-inline d-flex justify-content-end align-items-center m-0">
                  <li className={` ${stylesNavbar.list_inline_item_custom} `}>
                    <Link href="/wishlist " legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <GoSearch className="icon" />
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className={`${stylesNavbar.list_inline_item_custom} `}>
                    {isLoggedIn ? (
                      <>
                        <div className={stylesNavbar.icon_container} onClick={handleShowDropDown}>
                          <FiUser className="icon" />
                          {/* <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>{user}</span> */}
                        </div>

                        {isLoggedIn && (
                          <NavDropdown
                            title={''}
                            id="basic-nav-dropdown"
                            className={` ${stylesNavbar.order_list_dropdown}`}
                            show={showDropDown}
                            onToggle={handleToggle}
                          >
                            <NavDropdown.Item
                              as="a"
                              className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                            ></NavDropdown.Item>

                            <Link href="/quick-order" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.quick_order}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/quick-order" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.my_account}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/quick-order" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.dealer_ledger}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/catalog" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.view_catalogs}
                              </NavDropdown.Item>
                            </Link>
                            <Link href="/my-orders" passHref className="text-decoration-none">
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.my_order}
                              </NavDropdown.Item>
                            </Link>

                            <Link href="#" passHref className="text-decoration-none" onClick={handleLogoutUser}>
                              <NavDropdown.Item
                                as="a"
                                className={`text-decoration-none ${stylesNavbar.order_list_items} custom-dropdown-item`}
                              >
                                {selectedLanguageData?.logout}
                              </NavDropdown.Item>
                            </Link>
                          </NavDropdown>
                        )}
                      </>
                    ) : (
                      <Link href={'/login'} className={stylesNavbar.icon_container} onClick={handleShowDropDown}>
                        <FiUser className="icon" />
                      </Link>
                    )}
                  </li>

                  <li className={` ${stylesNavbar.list_inline_item_custom} `}>
                    <Link href="/wishlist " legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FiHeart className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning} ${stylesNavbar.badge_custom} text-white`}>
                            {wishlistCount}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                  <li className={`${stylesNavbar.list_inline_item_custom} ${stylesNavbar.cart_icon_mob}`}>
                    <Link href="/cart" legacyBehavior>
                      <a className={`link-dark ${stylesNavbar.label}`}>
                        <div className={stylesNavbar.icon_container}>
                          <FiShoppingCart className="icon" />
                          <span className={`${stylesNavbar.badge} ${stylesNavbar.badge_warning}  ${stylesNavbar.badge_custom} text-white`}>
                            {cartCount}
                          </span>
                        </div>
                      </a>
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </nav>
      </header>
      {navbarData?.length > 0 && navbarData[0]?.slug === 'all-category' && (
        <MobileProductCategories
          show={isSidebarOpen}
          handleClose={handleCloseSidebar}
          navbarData={navbarData[0]?.values}
          setIsSidebarOpen={setIsSidebarOpen}
          selectedLanguageData={selectedLanguageData}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          handleSearch={handleSearch}
        />
      )}
    </>
  );
}

export default LogoInCenterNavbar;
