import FilterLoadingLayout from '../../FilterComponents/FilterLoadingLayout';
import FilterColour from '../../FilterComponents/ColorSectionUI';
import Select from 'react-select';
import useDropDownFilterHook from '../../../../hooks/ProductListPageHooks/useDropDownFilterHook';
import { clippingParents } from '@popperjs/core';

function WebFilter() {
  const { filtersData, checkBoxfiltersData, isLoadingDropDown, isLoading, errorMessageDropDown, errorMessage, handleFilterSelectDropDown, handleFilterCheckFun, selectedFilters, clearFilters } = useDropDownFilterHook();
  // const { filtersData:checkBoxfiltersData, isLoading:checkBoxIsLoading, errorMessage:checkBoxErrorMessage, handleFilterCheckFun, selectedFilters:checkBoxselectedFilters, clearFilters:checkBoxclearFilters } = useProductListingFilterHook();
  console.log("filtersData>", filtersData)
  const renderFilters: any = () => {
    if (isLoadingDropDown) {
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
    console.log("filtersData", filtersData)
    if (filtersData?.filters?.length > 0) {
      return filtersData.filters.map((filter: any, index: any) => {
        // Render FilterColour component for "color" section inside an Accordion
        if (filter.section === 'Color') {
          return (
            <div key={index}>
              <div className="p-0">{filter?.section}</div>
              <div className="horizontal-line"></div>
              <div className="filter-scrollable">
                <FilterColour key={index} filter={filter} handleFilterSelectDropDown={handleFilterSelectDropDown} selectedFilters={selectedFilters} />
              </div>
              <hr className="m-0 my-3" />
            </div>
          );
        }
        // Render default accordion for other filters
        return (
          <div key={index}>
            <div className="filter-name mb-2">{filter?.section}</div>
            {/* <div className="horizontal-line"></div> */}
            <div className='drop_down_container'>
              <Select
                placeholder={filter?.section || ''}
                name={filter?.section} // Pass section name
                options={Array.isArray(filter?.values)
                  ? filter.values.map((val: any) => ({ label: val, value: val, section: filter?.section }))
                  : []
                }
                onChange={(selected, meta) => handleFilterSelectDropDown(selected, meta)}
                isClearable
                isMulti
                value={
                  selectedFilters?.length > 0 && selectedFilters.find((f: any) => f.name === filter.section)?.value.map((val: string) => ({
                    label: val,
                    value: val,
                    section: filter.section,
                  })) || []
                }
              />
            </div>
            <hr className="m-0 my-3" />
          </div>
        );
      });
    }
  };

  const renderCheckboxFilters: any = () => {
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

    if (checkBoxfiltersData?.filters?.length > 0) {
      return checkBoxfiltersData.filters.map((filter: any, index: any) => {
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
        if (Array.isArray(filter?.values) && filter.values.length > 0) {
          return (
            <div key={index}>
              <div className="filter-name">{filter?.section}</div>
              <div className="horizontal-line"></div>
              <div className="filter-scrollable">
                {filter.values.map((filterValue: any, innerIndex: any) => (
                  <div className="form_check_filter checkbox-line-height d-flex align-items-center" key={innerIndex}>
                    <input
                      type="checkbox"
                      name={filter.section}
                      value={filterValue}
                      checked={selectedFilters?.length > 0 && selectedFilters.some(
                        (selectedFilter: any) => selectedFilter.name === filter.section && selectedFilter.value.includes(filterValue)
                      )}
                      onChange={handleFilterCheckFun}
                    />
                    <label className="accordion-checkbox checkbox-margin fs-14" htmlFor="flexCheckDefault">
                      {filterValue}
                    </label>
                  </div>
                ))}
              </div>
              <hr className="m-0 my-3" />
            </div>
          );
        };
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
          {renderCheckboxFilters()}
        </div>
      </div>
    </div>
  );
}

export default WebFilter;




