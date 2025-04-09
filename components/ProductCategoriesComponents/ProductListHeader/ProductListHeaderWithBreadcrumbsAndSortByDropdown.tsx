import useProductListPageHandlers from '../../../hooks/ProductListPageHooks/useProductListPageHandlers';
import BreadCrumbs from '../../BreadCrumbs';
import HorizantalFilterMaster from '../HorizantalFilter/HorizantalFilterMaster';

const ProductListHeaderWithBreadcrumbsAndSortByDropdown = () => {
  const { sortBy, handleSortBy } = useProductListPageHandlers();
  return (
    <div className="row ps-lg-5 pe-lg-4 px-md-3 px-3 ">
      <div className="col-12 col-sm-6  ">
        <div className="list-toggle-rtl">
          <BreadCrumbs />
        </div>
      </div>
      <div className="col-12 col-sm-6  d-flex justify-content-start justify-content-sm-end ">
        <HorizantalFilterMaster />
      </div>
    </div>
  );
};

export default ProductListHeaderWithBreadcrumbsAndSortByDropdown;
