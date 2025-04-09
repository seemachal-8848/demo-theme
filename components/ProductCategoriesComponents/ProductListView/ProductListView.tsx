import WebFilter from '../FilterComponents/WebFilter';
import ProductListViewMaster from './ProductListViewMaster';

function ProductListView({
  isLoading,
  productListingData,
  handlePaginationBtn,
  pageOffset,
  handlePageClick,
  productListTotalCount,
  wishlistData,
  isSuperAdmin,
  handleShowCatalogModal,
  handleDeleteCatalogItem,
  cartData,
}: any) {
  return (
    <div className="row">
      <div className="col-12 col-md-2  web-filter d-none d-sm-block ">
        <WebFilter />
      </div>
      <div className="container-md col-md-10">
        <div className=" mt-2 product-listing-row">
          <ProductListViewMaster
            productListingData={productListingData}
            handlePaginationBtn={handlePaginationBtn}
            productListTotalCount={productListTotalCount}
            pageOffset={pageOffset}
            handlePageClick={handlePageClick}
            wishlistData={wishlistData}
            isLoading={isLoading}
            isSuperAdmin={isSuperAdmin}
            handleShowCatalogModal={handleShowCatalogModal}
            handleDeleteCatalogItem={handleDeleteCatalogItem}
            cartData={cartData}
          />
        </div>
      </div>
    </div>
  );
}

export default ProductListView;
