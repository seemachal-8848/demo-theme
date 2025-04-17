import FilterLoadingLayout from '../../FilterComponents/FilterLoadingLayout';
import FilterColour from '../../FilterComponents/ColorSectionUI';
import Select from 'react-select';
import useDropDownFilterHook from '../../../../hooks/ProductListPageHooks/useDropDownFilterHook';
import { clippingParents } from '@popperjs/core';

function WebFilter() {
  const { filtersData, isLoading, errorMessage, handleFilterCheckFun, selectedFilters, clearFilters } = useDropDownFilterHook();
console.log("filtersData",filtersData)

const handleValueChange = (e:any)=>{
console.log("??",e)
}
  const renderFilters: any = () => {
    if (isLoading) {
      return (
        <div className="row justify-content-center">
          {[...Array(1)].map((_, index: number) => (
            <div key={index}>
              <div className="col-lg-12 mx-3">
                <FilterLoadingLayout />
              </div>
            </div>
          ))}
        </div>
      );
    }

    if (filtersData?.filters?.length > 0) {
      return filtersData.filters.map((filter: any, index: any) => {
        console.log("filter>>",filter)
        // Render FilterColour component for "color" section inside an Accordion
        if (filter.section === 'Color') {
          return (
            <div key={index}>
              <div className="p-0">{filter?.section}</div>
              <div className="horizontal-line"></div>
              <div className="filter-scrollable">
                <FilterColour key={index} filter={filter} handleFilterCheckFun={handleFilterCheckFun} selectedFilters={selectedFilters} />
              </div>
              <hr className="m-0 my-3" />
            </div>
          );
        }
        // Render default accordion for other filters
        
        return (
          <div key={index}>
            <div className="filter-name">{filter?.section}</div>
            <div className="horizontal-line"></div>
            <div className="">
            <Select
                placeholder={filter?.section || ''}
                options={Array.isArray(filter?.values) 
                  ? filter.values.map((val: any) => ({ label: val, value: val, section: filter?.section }))
                  : []
                }
                onChange={(option) => handleFilterCheckFun(option)}
                // value={makeOptions.find(opt => opt.value === filters.make) || null}
                isClearable
                isMulti
              />
            
            </div>
            <hr className="m-0 my-3" />
          </div>
        );
      });
    }
  };

  return (
    <div className="filter_section pt-3">
      <div className="filter_block">
        {selectedFilters?.length > 0 && (
          <div className="text-start pb-3">
            <button className="btn btn-link text-uppercase text-decoration-none fs-14 p-0" onClick={clearFilters}>
              Clear filters
            </button>
          </div>
        )}
        <div className="accordion accordion_custom" id="myAccordion">
          {renderFilters()}
        </div>
      </div>
    </div>
  );
}

export default WebFilter;



