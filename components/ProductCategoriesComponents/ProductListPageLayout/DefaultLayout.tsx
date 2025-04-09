import filters from '../ProductListLayoutComponents/BasicFilters/MasterComponent';
import card from '../ProductListLayoutComponents/ProductGridWithImageVariantCards/MasterComponent';
const DefaultLayout = ({ filterComponent, CardsComponent, productsGridData }: any) => {
  const renderFilter = () => {
    switch (filterComponent) {
      case 'Standard Filters':
        const Component = require(`../ProductListLayoutComponents/BasicFilters/MasterComponent`).default;
        return <Component key={'Standard Filters'} />;
      default:
        return;
    }
  };
  const renderProducts = () => {
    switch (CardsComponent) {
      case 'Card with Color Variants':
        const ColorComponent = require(`../ProductListLayoutComponents/ProductGridWithImageVariantCards/MasterComponent`).default;
        return <ColorComponent key={'CardsWithColors'} {...productsGridData} />;
      case 'Card with Variant Images':
        const ImageComponent = require(`../ProductListLayoutComponents/ProductGridWithImageVariantCards/MasterComponent`).default;
        return <ImageComponent key={'CardsWithImgs'} {...productsGridData} />;
      default:
        return;
    }
  };
  return (
    <div className="ps-lg-5 pe-lg-4 px-md-3 px-3">
      <div className="row">
        <div className="col-12 col-md-2 web-filter d-none d-sm-block ">{renderFilter()}</div>
        <div className="container-md col-md-10">
          <div className=" mt-2 product-listing-row">{renderProducts()}</div>
        </div>
      </div>
    </div>
  );
};

export default DefaultLayout;
