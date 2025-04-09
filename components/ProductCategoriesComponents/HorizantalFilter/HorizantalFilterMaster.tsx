import React from 'react';
import { THEME_CONSTANTS } from '../../../services/config/theme-config';
import useProductListPageHandlers from '../../../hooks/ProductListPageHooks/useProductListPageHandlers';
import CustomDropdown from './CustomDropdown';

function HorizantalFilterMaster() {
  const { sortBy, handleSortBy } = useProductListPageHandlers();
  return (
    <div className="row list-toggle-rtl">
      {THEME_CONSTANTS.ENABLE_TOGGLE_PRODUCT_LISTING_VIEW && (
        <>
          <CustomDropdown sortBy={sortBy} handleSortBy={handleSortBy} />
        </>
      )}
    </div>
  );
}

export default HorizantalFilterMaster;
