import { useSelector } from 'react-redux';
import { SelectedFilterLangDataFromStore } from '../../../store/slices/general_slices/selected-multilanguage-slice';
import useNavbar from '../../../hooks/GeneralHooks/useNavbar';
import useFetchCartItems from '../../../hooks/CartPageHook/useFetchCartItems';
import useWishlist from '../../../hooks/WishlistHooks/useWishlistHook';
import NavbarLayout from './NavbarLayout';
import NavbarLoader from './NavbarLoader';

function Navbar() {
  const { navbarData, isLoading, errorMessage, selectedCurrencyValue, handleLogoutUser, isLoggedIn } = useNavbar();
  const { selectedLanguageData }: any = useSelector(SelectedFilterLangDataFromStore);
  const { cartCount } = useFetchCartItems();
  const { wishlistCount } = useWishlist();

  if (isLoading) {
    return <NavbarLoader />;
  } else if (navbarData?.length > 0) {
    return (
      <>
        <NavbarLayout
          navbarData={navbarData}
          isLoading={isLoading}
          errorMessage={errorMessage}
          selectedCurrencyValue={selectedCurrencyValue}
          handleLogoutUser={handleLogoutUser}
          selectedLanguageData={selectedLanguageData}
          cartCount={cartCount}
          wishlistCount={wishlistCount}
          isLoggedIn={isLoggedIn}
        />
      </>
    );
  } else if (errorMessage) {
    return <></>;
  } else {
    return <></>;
  }
}

export default Navbar;
