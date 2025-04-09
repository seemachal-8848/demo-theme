import ReactPaginate from 'react-paginate';
import JewelleryProductCardVariantImage from '../../../cards/JewelleryProductCardVariantImage';
import ProductCardSkeleton from '../../../cards/ProductCardSkeleton';
import useAddToCartHook from '../../../hooks/CartPageHook/useAddToCart';
import paginationStyle from '../../../styles/components/pagination.module.scss';
import NoDataFound from '../../NoRecordFound';
import { CONSTANTS } from '../../../services/config/app-config';

function ProductListingWithLeftFilterDrawerMaster({
  isLoading,
  productListingData,
  productListTotalCount,
  pageOffset,
  handlePageClick,
  wishlistData,
  isSuperAdmin,
  handleShowCatalogModal,
  handleDeleteCatalogItem,
  cartData,
}: any) {
  const { PRODUCT_COUNT_ON_PRODUCT_CATEGORY_PAGE } = CONSTANTS;
  const isNextButtonDisabled: boolean =
    parseInt((productListTotalCount / PRODUCT_COUNT_ON_PRODUCT_CATEGORY_PAGE).toString(), 10) === pageOffset;
  const { addToCartItem, getPartyName } = useAddToCartHook();
  const handleDataRendering = () => {
    if (isLoading) {
      return (
        <div className="row">
          {[...Array(10)].map((_, index) => (
            <div key={index} className="col-sm-6 col-lg-4 col-xl-3 col-xxl-3 text-center mb-4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      );
    }

    if (productListingData?.length > 0) {
      return (
        <>
          {productListingData?.map((data: any, i: any) => {
            return (
              <div key={innerHeight * i} className="col-6 col-md-4 col-xl-3 col-xxl-3 text-center mb-4">
                <JewelleryProductCardVariantImage
                  data={data}
                  addToCartItem={addToCartItem}
                  getPartyName={getPartyName}
                  wishlistData={wishlistData}
                  isSuperAdmin={isSuperAdmin}
                  handleDeleteCatalogItem={handleDeleteCatalogItem}
                  handleShowCatalogModal={handleShowCatalogModal}
                  cartData={cartData}
                />
              </div>
            );
          })}
          <ReactPaginate
            previousLabel={'Prev'}
            nextLabel={'Next'}
            pageCount={Math.ceil(productListTotalCount / PRODUCT_COUNT_ON_PRODUCT_CATEGORY_PAGE)}
            pageRangeDisplayed={3}
            onPageChange={handlePageClick}
            containerClassName={`${paginationStyle.paginationBttns}`}
            previousLinkClassName={pageOffset === 0 ? 'd-none' : paginationStyle.previousBttn}
            disabledClassName={paginationStyle.paginationDisabled}
            nextLinkClassName={isNextButtonDisabled ? 'd-none' : `${paginationStyle.nextBttn}`}
            activeClassName={`${paginationStyle.paginationActive}`}
            forcePage={pageOffset}
          />
        </>
      );
    }

    if (productListingData?.length === 0) {
      return <NoDataFound title="No Record Found !!" message="We couldn't find what you searched for. Try searching again." />;
    }
  };
  return <>{handleDataRendering()}</>;
}

export default ProductListingWithLeftFilterDrawerMaster;
