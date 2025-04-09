import flattenComponentsList from '../../utils/handle-components-list';

//refer to components-interface.ts inside interface folder for home page components understanding

const HomePageMaster = ({ homePageComponents, bannerData }: any) => {
  const componentsListFlattenArray = flattenComponentsList(homePageComponents);
  if (Object.keys(homePageComponents)?.length === 0) {
    return <p>No components to display for the home page.</p>;
  }
  if (componentsListFlattenArray?.length === 0) return <p>No components to display for the home page.</p>;

  const componentsToRender = componentsListFlattenArray?.map((componentName: any) => {
    const Component = require(`./${componentName.section_name}/${componentName?.component_name}/MasterComponent`).default;
    if (componentName?.section_name === 'BannerSection') {
      return <Component key={componentName?.component_name} bannerData={bannerData} />;
    }
    if (componentName?.section_name === 'FeaturedCollections') {
      return <Component key={componentName?.component_name} componentProperties={JSON.parse(componentName?.properties)} />;
    }
    return <Component key={componentName?.component_name} />;
  });
  return <>{componentsToRender}</>;
};
export default HomePageMaster;
