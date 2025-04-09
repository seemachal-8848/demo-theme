import FilterLoadingLayout from '../FilterComponents/FilterLoadingLayout';

function LeftWebFilter({ filtersData, isLoading, errorMessage, handleFilterCheckFun, selectedFilters }: any) {
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
      return filtersData?.filters?.map((filter: any, index: any) => {
        return (
          <div key={index}>
            <div className="px-4">
              <p className="fs-16 fw-bold">
                {filter?.section} <div className=" fw-bold m-0 border-black mt-1 w-25"></div>
              </p>
              <div className="pb-3">
                {filter.values.map((filterValue: any, innerIndex: any) => (
                  <div className="d-flex align-items-center" key={innerIndex}>
                    <input
                      type="checkbox"
                      name={filter.section}
                      value={filterValue}
                      checked={selectedFilters.some(
                        (selectedFilter: any) => selectedFilter.name === filter.section && selectedFilter.value.includes(filterValue)
                      )}
                      onChange={handleFilterCheckFun}
                    />
                    <label className="ps-2 fs-16" htmlFor="flexCheckDefault">
                      {filterValue}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            <hr />
          </div>
        );
      });
    }
  };
  return (
    <div className="filter_section">
      <div className="filter_block">
        <div className="accordion accordion_custom" id="myAccordion">
          {renderFilters()}
        </div>
      </div>
    </div>
  );
}

export default LeftWebFilter;
