import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { NavDropdown } from 'react-bootstrap';
import { FaUserCircle } from 'react-icons/fa';
import { FiHeart, FiShoppingCart, FiUser } from 'react-icons/fi';
import { RiMenu2Line } from 'react-icons/ri';
// import logo from '../../public/assets/images/logo.png';
import logo from '../../../public/assets/images/logo.png';
import stylesNavbar from '../../../styles/components/navbar.module.scss';
import CustomProductCategoriesNavbar from './CustomProductCategoriesNavbar';
import MobileProductCategories from './MobileProductCategories';

function CustomWebNavbar({
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
  const user = localStorage.getItem('party_name');
  const handleSearch = (e: any) => {
    e.preventDefault();
    if (searchTerm !== '') {
      router.push('/product/' + searchTerm);
    }
  };
  const handleKeyDown = (e: any) => {
    if (e.key === 'Enter') {
      handleSearch(e);
    }
  };
  const handleCloseSidebar = () => setIsSidebarOpen(false);
  const handleShowDropDown = () => setShowDropDown(!showDropDown);
  const handleToggle = (e: any) => {
    setShowDropDown((prevState) => !prevState);
  };

  return (
    <>
      <header className={stylesNavbar.header}>
        <nav>
          <div className={`${stylesNavbar.navbar} `}>
            <div className={`w-100 d-flex justify-content-between py-2 align-items-center ${stylesNavbar.navbar_wrapper}`}>
              <div className="mobile-nav d-flex justify-content-sm-between px-3 px-sm-4 d-sm-block d-md-none align-items-center">
                <Link href="#" legacyBehavior>
                  <a
                    className="mobile-menu-toggle  w-icon-hamburger"
                    aria-label="menu-toggle"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                  >
                    <RiMenu2Line className="icon" />
                  </a>
                </Link>
              </div>
              {/* <div className="d-flex justify-content-between align-items-center w-100"> */}
              <div className="d-flex align-items-center">
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

              {/* Product Categories Navbar */}
              <div className="w-50 d-none d-sm-none d-md-block">
                <CustomProductCategoriesNavbar
                  navbarData={navbarData}
                  errorMessage={errorMessage}
                  selectedCurrencyValue={selectedCurrencyValue}
                  multiLanguagesData={multiLanguagesData}
                  selectedLang={selectedLang}
                  handleLanguageChange={handleLanguageChange}
                />
              </div>

              <div className={``}>
                <ul className={` list-inline d-flex justify-content-end align-items-center m-0 ${stylesNavbar.list_inline_container}`}>
                  <li className={`${stylesNavbar.list_inline_item_custom} ${stylesNavbar.list_inline_item_user} d-flex align-items-center`}>
                    {isLoggedIn ? (
                      <>
                        <div className={stylesNavbar.icon_container} onClick={handleShowDropDown}>
                          <FaUserCircle className="icon" />
                          <span className={`d-none d-md-inline-block theme-blue ${stylesNavbar.order_list_dropdown}`}>{user}</span>
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
                {/* </div> */}
              </div>
            </div>
          </div>
        </nav>
      </header>
      {/* <ProductCatagoriesNavbar
        navbarData={navbarData}
        errorMessage={errorMessage}
        selectedCurrencyValue={selectedCurrencyValue}
        multiLanguagesData={multiLanguagesData}
        selectedLang={selectedLang}
        handleLanguageChange={handleLanguageChange}
      /> */}
      <MobileProductCategories
        show={isSidebarOpen}
        handleClose={handleCloseSidebar}
        navbarData={navbarData}
        setIsSidebarOpen={setIsSidebarOpen}
        selectedLanguageData={selectedLanguageData}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        handleSearch={handleSearch}
      />
    </>
  );
}

export default CustomWebNavbar;
