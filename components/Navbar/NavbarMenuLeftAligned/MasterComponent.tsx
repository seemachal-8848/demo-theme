import useNavbar from '../../../hooks/GeneralHooks/useNavbar';
import { SelectedFilterLangDataFromStore } from '../../../store/slices/general_slices/selected-multilanguage-slice';
import { useSelector } from 'react-redux';
import useFetchCartItems from '../../../hooks/CartPageHook/useFetchCartItems';
import useWishlist from '../../../hooks/WishlistHooks/useWishlistHook';
import NavbarLayout from './NavbarLayout';

function Navbar() {
  const { navbarData, isLoading, errorMessage, selectedCurrencyValue, handleLogoutUser, isLoggedIn } = useNavbar();
  const { selectedLanguageData }: any = useSelector(SelectedFilterLangDataFromStore);
  const { cartCount } = useFetchCartItems();
  const { wishlistCount } = useWishlist();
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
}

export default Navbar;
