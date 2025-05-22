import RenderCheckboxFilters from '../ProductListLayoutComponents/DropDownAndCheckBoxFilters/RenderCheckboxFilters';

const DualFiltersLayout = ({ filterComponent, CardsComponent, productsGridData }: any) => {
  const renderFilter = () => {
    switch (filterComponent) {
      case 'Dropdown Plus CheckBox':
        const DropDownComponent = require(`../ProductListLayoutComponents/DropDownAndCheckBoxFilters/MasterComponent`).default;
        return <DropDownComponent key={'Dropdown Plus CheckBox'} />;
      default:
        return;
    }
  };
  const renderProducts = () => {
    switch (CardsComponent) {
      case 'Cards With Quantity Editor':
        const ColorComponent = require(`../ProductListLayoutComponents/ProductGridWithEditableQtyCards/MasterComponent`).default;
        return <ColorComponent key={'CardsWithColors'} {...productsGridData} />;
      default:
        return;
    }
  };
  return (
    <div className="ps-lg-5 pe-lg-4 px-md-3 px-3">
      <div className="row">
        <div className="col-12 col-md-3 col-lg-2 col-xl-2 col-xxl-2 web-filter d-none d-sm-block">{renderFilter()}</div>
        <div className="container-md col-md-6 col-lg-9 col-xl-9 col-xxl-8">
          <div className=" mt-2 product-listing-row">{renderProducts()}</div>
        </div>
        <div className="col-12 col-md-2 col-lg-1 col-xl-1 col-xxl-2 mt-sm-3 web-filter d-none d-sm-block">
          <RenderCheckboxFilters />
        </div>
      </div>
    </div>
  );
};

export default DualFiltersLayout;




