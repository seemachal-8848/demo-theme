import React, { useState, useEffect } from 'react';
import FilterLoadingLayout from '../../FilterComponents/FilterLoadingLayout';
import useDropDownFilterHook from '../../../../hooks/ProductListPageHooks/useDropDownFilterHook';
import { FaSearch } from 'react-icons/fa';

function WebFilter() {
  const {
    filtersData,
    isLoadingDropDown,
    handleFilterSelectDropDown,
    selectedFilters,
    clearFilters
  } = useDropDownFilterHook();

  const [expandedSections, setExpandedSections] = useState<{ [key: string]: boolean }>({});
  const [searchTerms, setSearchTerms] = useState<{ [key: string]: string }>({});
  const [showSearchInput, setShowSearchInput] = useState<{ [key: string]: boolean }>({});
  const [selectionOrder, setSelectionOrder] = useState<{ [key: string]: string[] }>({});
  const [pendingSelections, setPendingSelections] = useState<{ [key: string]: string[] }>({});

  const toggleSection = (section: string) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleSearchInput = (section: string) => {
    setShowSearchInput(prev => ({ ...prev, [section]: !prev[section] }));
    setSearchTerms(prev => ({ ...prev, [section]: '' }));
  };

  const handleSearchChange = (section: string, value: string) => {
    setSearchTerms(prev => ({ ...prev, [section]: value }));
  };

  // Initialize selectionOrder and sync pendingSelections with selectedFilters
  useEffect(() => {
    // Update selectionOrder based on selectedFilters
    setSelectionOrder(prev => {
      const newOrder = { ...prev };

      selectedFilters?.forEach((filter: any) => {
        const section = filter.name;
        const values = filter.value || [];

        if (!newOrder[section]) {
          newOrder[section] = [...values];
        }
      });

      return newOrder;
    });

    // Sync pendingSelections with selectedFilters
    setPendingSelections(prev => {
      const updatedPending = { ...prev };

      Object.keys(updatedPending).forEach(section => {
        const selectedInSection =
          selectedFilters.find((f: any) => f.name === section)?.value || [];
        const pendingInSection = updatedPending[section] || [];

        // Keep only the pending selections that are not yet in selectedFilters
        updatedPending[section] = pendingInSection.filter(val => !selectedInSection.includes(val));

        // If no pending selections remain for this section, remove it
        if (updatedPending[section].length === 0) {
          delete updatedPending[section];
        }
      });

      return updatedPending;
    });
  }, [selectedFilters]);

  const renderFilters = () => {
    if (isLoadingDropDown) {
      return (
        <div className="row justify-content-center">
          <div className="col-lg-12 mx-3">
            <FilterLoadingLayout />
          </div>
        </div>
      );
    }

    if (filtersData?.filters?.length > 0) {
      return filtersData.filters.map((filter: any, index: number) => {
        const section = filter.section;
        const isExpanded = expandedSections[section];
        const showSearch = showSearchInput[section];
        const searchTerm = searchTerms[section] || '';
        const allValues = filter?.values || [];
        const isVehicleSection = section === "Vehicle";

        // Extract display values (vehicle_name for Vehicle section, raw value for others)
        let displayValues = allValues.map((val: any) =>
          isVehicleSection ? val.vehicle_name : val
        );

        // Filter values based on search term
        let filteredValues = allValues;
        if (searchTerm) {
          filteredValues = allValues.filter((val: any) => {
            const displayValue = isVehicleSection ? val.vehicle_name : val;
            return displayValue.toLowerCase().includes(searchTerm.toLowerCase());
          });
        }

        // Extract display values for filtered results
        displayValues = filteredValues.map((val: any) =>
          isVehicleSection ? val.vehicle_name : val
        );

        const selectedInSection =
          selectedFilters.find((f: any) => f.name === section)?.value || [];
        const pendingInSection = pendingSelections[section] || [];

        const selectionPriority = selectionOrder[section] || [];

        // Filter selectionPriority to only include currently selected values
        const selectedSorted = selectionPriority.filter(val =>
          selectedInSection.includes(val) || pendingInSection.includes(val)
        );

        // Unselected values (compare with display values for Vehicle section)
        const unselected = filteredValues.filter((val: any) => {
          const displayValue = isVehicleSection ? val.vehicle_name : val;
          return !selectedSorted.includes(displayValue);
        });

        // Combine selected and unselected values
        const finalValues = [
          ...selectedSorted,
          ...unselected.map((val: any) => (isVehicleSection ? val.vehicle_name : val))
        ];

        const visibleValues = isExpanded ? finalValues : finalValues.slice(0, 6);
        const hiddenCount = finalValues.length - 6;

        return (
          <div key={index}>
            <div className="d-flex justify-content-between align-items-center mb-2">
              {showSearch ? (
                <input
                  type="text"
                  className="form-control me-2"
                  placeholder="Search..."
                  value={searchTerm}
                  autoFocus
                  onChange={e => handleSearchChange(section, e.target.value)}
                  style={{ flex: 1 }}
                />
              ) : (
                <div className="filter-name flex-grow-1">{section}</div>
              )}
              <div style={{ cursor: 'pointer' }} onClick={() => toggleSearchInput(section)}>
                <FaSearch size={14} />
              </div>
            </div>

            <div
              className="row gap-2 p-2 mb-2 border rounded"
              style={{
                maxHeight: isExpanded ? '200px' : 'auto',
                overflowY: isExpanded ? 'auto' : 'visible'
              }}
            >
              {Array.isArray(visibleValues) &&
                visibleValues.map((val: any, idx: number) => {
                  const isSelected =
                    selectedInSection.includes(val) || pendingInSection.includes(val);

                  // For the Vehicle section, we need the original object for handleFilterSelectDropDown
                  const originalValue = isVehicleSection
                    ? filteredValues.find((v: any) => v.vehicle_name === val)
                    : val;

                  return (
                    <div
                      key={`${val}-${idx}`}
                      className={`col-5 badge rounded-pill px-3 py-2 ${isSelected ? 'text-white' : 'text-dark'}`}
                      style={{
                        cursor: 'pointer',
                        backgroundColor: isSelected ? '#7b189f' : '#f0f0f0'
                      }}
                      onClick={() => {
                        const valueToPass = isVehicleSection
                          ? { label: val, value: val, section: section }
                          : { label: val, value: val, section: section };

                        // Update pendingSelections to reflect the selection immediately
                        setPendingSelections(prev => {
                          const currentPending = prev[section] || [];
                          const newPending = isSelected
                            ? currentPending.filter(v => v !== val)
                            : [...currentPending, val];
                          return { ...prev, [section]: newPending };
                        });

                        // Handle primary selection for the current section
                        handleFilterSelectDropDown([valueToPass], { name: section });

                        // Update selection order for the current section
                        setSelectionOrder(prev => {
                          const current = prev[section] || [];
                          const alreadySelected = current.includes(val);
                          const newSelection = alreadySelected
                            ? current.filter(v => v !== val)
                            : [val, ...current.filter(v => v !== val)];
                          return { ...prev, [section]: newSelection };
                        });

                        // If this is the Vehicle section and a new selection is made, auto-select the vehicle_company
                        if (isVehicleSection && !isSelected) {
                          const vehicleCompany = originalValue.vehicle_company; // e.g., "HONDA"
                          const vehicleCompanySection = "Vehicle Company";
                          const selectedInVehicleCompany =
                            selectedFilters.find((f: any) => f.name === vehicleCompanySection)?.value || [];
                          const pendingInVehicleCompany = pendingSelections[vehicleCompanySection] || [];

                          // If the vehicle_company is not already selected, select it
                          if (
                            !selectedInVehicleCompany.includes(vehicleCompany) &&
                            !pendingInVehicleCompany.includes(vehicleCompany)
                          ) {
                            // Add to pendingSelections for Vehicle Company
                            setPendingSelections(prev => {
                              const currentPending = prev[vehicleCompanySection] || [];
                              return {
                                ...prev,
                                [vehicleCompanySection]: [...currentPending, vehicleCompany]
                              };
                            });

                            // Auto-select the vehicle company
                            handleFilterSelectDropDown(
                              [{ label: vehicleCompany, value: vehicleCompany, section: vehicleCompanySection }],
                              { name: vehicleCompanySection }
                            );

                            // Update selection order for Vehicle Company section
                            setSelectionOrder(prev => {
                              const current = prev[vehicleCompanySection] || [];
                              const newSelection = [vehicleCompany, ...current.filter(v => v !== vehicleCompany)];
                              return { ...prev, [vehicleCompanySection]: newSelection };
                            });
                          }
                        }
                      }}
                    >
                      {val}
                    </div>
                  );
                })}
            </div>

            {finalValues.length > 6 && (
              <div
                className="text-primary fs-14 cursor-pointer mb-3"
                onClick={() => toggleSection(section)}
              >
                {isExpanded ? 'Show Less' : `+ ${hiddenCount} more`}
              </div>
            )}

            <hr className="m-0 my-3" />
          </div>
        );
      });
    }
  };

  console.log('filtersData', filtersData);

  return (
    <div className="filter_section pt-3">
      <div className="filter_block">
        {selectedFilters?.length > 0 && (
          <div className="text-start pb-3">
            <button
              className="btn btn-link text-uppercase text-decoration-none fs-14 p-0"
              onClick={clearFilters}
            >
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





