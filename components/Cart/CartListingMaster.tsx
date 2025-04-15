import React from 'react';

function CartListingMaster({ componentsList }: any) {
  if (componentsList?.associated_component?.length === 0) return;

  if (componentsList?.associated_component?.length > 0) {
    return componentsList?.associated_component?.map((componentName: any) => {
      const Component = require(`./${componentName.section_name}/${componentName?.component_name}/MasterComponent`).default;
      return <Component key={componentName?.component_name} />;
    });
  }
}

export default CartListingMaster;
