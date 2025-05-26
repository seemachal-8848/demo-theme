import { useSelector } from 'react-redux';
import useProductListing from '../../hooks/ProductListPageHooks/useProductsDataHook';
import SchemeList from './SchemeList';
import { selectWishlist } from '../../store/slices/wishlist-slices/wishlist-local-slice';
import { selectCart } from '../../store/slices/cart-slices/cart-local-slice';
import useSchemesList from '../../hooks/ProductListPageHooks/useSchemesListHooks';
import useSchemeType from '../../hooks/ProductListPageHooks/useSchemeType';

const SchemeMaster = () => {
  const { schemeType } = useSchemeType()
  
  const {
    schemesList,
    itemTotalCount,
    isLoading,
    errorMessage,
    handlePaginationBtn,
    query,
  } = useSchemesList(schemeType);

  const wishlistData = useSelector(selectWishlist).items;
  const cartData = useSelector(selectCart).items;
  const isSuperAdmin = localStorage.getItem('isSuperAdmin');
  const pageOffset = Number(query?.page) - 1;

  const handlePageClick = (event: any) => {
    handlePaginationBtn(event?.selected);
  };

  const layoutProps = {
    schemesList,
    itemTotalCount,
    handlePaginationBtn,
    query,
    isLoading,
    errorMessage,
    wishlistData,
    cartData,
    isSuperAdmin,
    pageOffset,
    handlePageClick,
  };

  return (
    <div className="container col-12">
      <div className=" mt-2 product-listing-row">
        <SchemeList {...layoutProps} />
      </div>
    </div>
  );
};

export default SchemeMaster;
