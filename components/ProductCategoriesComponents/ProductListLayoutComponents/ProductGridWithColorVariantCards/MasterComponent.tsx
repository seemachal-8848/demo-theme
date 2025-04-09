import ReactPaginate from 'react-paginate';
import useAddToCartHook from '../../../../hooks/CartPageHook/useAddToCart';
import ProductCardSkeleton from '../../../../cards/ProductCardSkeleton';
import ProductCardVariantColour from '../../../../cards/ProductCardVariantColour';
import { CONSTANTS } from '../../../../services/config/app-config';
import NoDataFound from '../../../NoRecordFound';
import paginationStyle from '../../../../styles/components/pagination.module.scss';

function ProductlistingGridViewMaster({
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
          {[...Array(20)].map((_, index) => (
            <div key={index} className="col-6 col-md-4 col-lg-3 gap-2 p-0 p-md-2 text-center mb-4">
              <ProductCardSkeleton />
            </div>
          ))}
        </div>
      );
    }

    if (productListingData?.length > 0) {
      return (
        <>
          <div className="row h-100">
            {productListingData?.map((data: any, i: any) => {
              return (
                <div key={innerHeight * i} className="col-6 col-md-4 col-lg-3 gap-2 px-2 p-md-2 text-start mb-3 mb-md-0 ">
                  <ProductCardVariantColour
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
          </div>
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

export default ProductlistingGridViewMaster;
