import dynamic from 'next/dynamic';
const DefaultLayout = dynamic(() => import('./DefaultLayout'));
const CollapsibleLayout = dynamic(() => import('./CollapsibleLayout'));
const TopFiltersLayout = dynamic(() => import('./TopFiltersLayout'));

const LayoutRenderer = (props: any) => {
  const renderLayouts = () => {
    switch (props.layoutName) {
      case 'Default Layout':
        return (
          <DefaultLayout
            filterComponent={props.filterComponentInLayout}
            CardsComponent={props.productCardsInLayout}
            productsGridData={props.productsGridProps}
          />
        );
      case 'Collapsible Layout':
        return <CollapsibleLayout {...props.productsGridProps} />;
      case 'Top Filters Layout':
        return <TopFiltersLayout />;
    }
  };
  return <>{renderLayouts()}</>;
};

export default LayoutRenderer;
