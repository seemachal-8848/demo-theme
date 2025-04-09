import { useEffect, useState } from 'react';
import { CONSTANTS } from '../../../services/config/app-config';
import { callGetAPI } from '../../../utils/http-methods';

const FilterColour = ({ key, filter, handleFilterCheckFun, selectedFilters }: any) => {
  const [colorData, setColorData] = useState([]);

  const getColorData = async () => {
    const url = `${CONSTANTS.API_BASE_URL}/api/resource/Item Attribute/Colour`;
    const colorDataValues = await callGetAPI(url);
    return colorDataValues;
  };
  const fetchColorData = async () => {
    const colorDataValues = await getColorData();
    setColorData(colorDataValues?.data?.data?.item_attribute_values);
  };

  useEffect(() => {
    fetchColorData();
  }, []);

  return (
    <div key={key} className="filter-color">
      {filter?.values?.map((colour: string, index: number) => {
        // Find the matching attribute object based on attribute_colour
        const matchingAttribute: any = colorData.find((attr: any) => attr.attribute_colour.toLowerCase() === colour.toLowerCase());
        const isActive = selectedFilters.some(
          (selectedFilter: any) => selectedFilter.name === filter.section && selectedFilter.value.includes(colour)
        );
        return (
          <div
            className="d-flex align-items-center py-2 colorContainer"
            key={index}
            onClick={() => handleFilterCheckFun(null, true, !isActive, colour)}
          >
            <div className={`tabProductColor ${isActive ? 'borderActive' : 'borderInactive'}`} style={{ backgroundColor: colour }}></div>
            {/* Render attribute_value if match is found, otherwise fallback to colour */}
            <span className={`fs-14 ${isActive ? 'colorActive' : 'colorInactive'}`}>{matchingAttribute?.attribute_value || colour}</span>
          </div>
        );
      })}
    </div>
  );
};

export default FilterColour;
