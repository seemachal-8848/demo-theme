import useDropDownFilterHook from "../../../../hooks/ProductListPageHooks/useDropDownFilterHook";
import FilterColour from "../../FilterComponents/ColorSectionUI";
import FilterLoadingLayout from "../../FilterComponents/FilterLoadingLayout";

const RenderCheckboxFilters = () => {
    const { filtersData, checkBoxfiltersData, isLoadingDropDown, isLoading, errorMessageDropDown, errorMessage, handleFilterSelectDropDown, handleFilterCheckFun, selectedFilters, clearFilters } = useDropDownFilterHook();
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

  export default RenderCheckboxFilters;