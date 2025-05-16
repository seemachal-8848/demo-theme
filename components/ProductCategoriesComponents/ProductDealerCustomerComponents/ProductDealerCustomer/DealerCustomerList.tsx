import { useEffect, useState } from 'react';
import Select from 'react-select';
import useWebsiteUserList from '../../../../hooks/WebsiteUserList/useWebsiteUserList';
import useMechanicList from '../../../../hooks/WebsiteUserList/useMechanicList';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import useAddMechanic from '../../../../hooks/WebsiteUserList/useAddMechanic';
import ProductcategoryMaster from '../../Productcategory/ProductcategoryMaster';

const DealerCustomerList = () => {
  // const [isDealer, setIsDealer] = useState(true);
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedMechanicData, setSelectedMechanicData] = useState<any>(null);
  const router = useRouter();
  // Read roles from localStorage and parse them
  const userRoles = JSON.parse(localStorage.getItem('user_role') || '[]');

  const isB2BSalesPerson = userRoles.includes('Sales Person');
  const isB2CSalesPerson = userRoles.includes('POS Sales Person');

  const type = isB2BSalesPerson ? 'B2B' : isB2CSalesPerson ? 'B2C' : null;

  // If not a B2B or B2C sales person, return null to skip rendering
  if (!type) return null;

  const { websiteUserList, isLoading, errorMessage } = useWebsiteUserList(type)
  const { mechanicList } = useMechanicList();
  const { handleAddMechanic, isLoading: isMechanicLoading } = useAddMechanic()

  const handleChange = (option: any) => {
    setSelectedOption(option);

    const currentQuery = { ...router.query };

    if (option) {
      // Add or update email in the URL
      currentQuery.email = option.email;
    } else {
      // Remove email from the URL
      delete currentQuery.email;
    }

    router.push(
      {
        pathname: router.pathname,
        query: currentQuery,
      },
      undefined,
      { shallow: true }
    );
  };


  const handleMechanicChange = async (option: any) => {
    if (!selectedOption) {
      toast.warn("Please select a customer before selecting a mechanic.");
      return;
    }

    if (selectedMechanicData?.value === option?.value) {
      return; // Avoid duplicate API call for same mechanic
    }
    setSelectedMechanicData(option);

    const userData = {
      email_id: selectedOption?.email,
      mechanic: option?.value
    }

    handleAddMechanic(userData)
  }

  useEffect(() => {
    const emailFromUrl = router.query.email;

    if (emailFromUrl && websiteUserList.length > 0) {
      const matchedUser = websiteUserList.find(
        (user: any) => user.email === emailFromUrl
      );
      if (matchedUser) {
        setSelectedOption({
          ...matchedUser,
          value: matchedUser.email,
          label: matchedUser.customer_name
        });
      }
    }
  }, [router.query.email, websiteUserList]);

  return (
    <>
      <div className='container-fluid'>
        <div className="row border-bottom g-3 px-3 py-2 align-items-start flex-wrap">
          {/* Left Filter Section */}
          <div className="col-12 col-md-4 col-lg-3">
            {/* Dealer/Customer Dropdown */}
            <div className="mb-3">
              <label className="fw-semibold">
                {isB2BSalesPerson ? 'Dealer:' : 'Customer:'}
              </label>
              <Select
                options={websiteUserList.length > 0 && websiteUserList.map((user: any) => ({
                  ...user,
                  value: user?.email,
                  label: user?.customer_name
                }))}
                onChange={handleChange}
                placeholder={isB2BSalesPerson ? 'Select a Dealer' : 'Select a Customer'}
                isClearable
                value={selectedOption}
                noOptionsMessage={({ inputValue }) => (
                  inputValue ? (
                    <div className="text-center">
                      No {isB2BSalesPerson ? 'dealer' : 'customer'} found.
                      <div>
                        <a href="/register" className="btn btn-sm btn-primary mt-2">
                          Register
                        </a>
                      </div>
                    </div>
                  ) : 'Type to search'
                )}
              />
            </div>

            {/* Loyalty or Credit Info */}
            {selectedOption && (
              <div className="mb-2">
                {isB2BSalesPerson ? (
                  <div className='d-flex wrap gap-3'>
                    <div><strong>Outstanding:</strong> ₹{selectedOption?.outstanding_amount}</div>
                    <div><strong>CR. Limit:</strong> ₹{selectedOption?.credit_limit}</div>
                  </div>
                ) : (
                  <div><strong>Loyalty Points:</strong> {selectedOption?.collection_factor}</div>
                )}
              </div>
            )}

            {/* Mechanic Dropdown */}
            <div className="mb-3">
              <label className="fw-semibold">Mechanic Name</label>
              <Select
                options={mechanicList.length > 0 && mechanicList.map((mechanic: any) => ({
                  ...mechanic,
                  value: mechanic?.name,
                  label: mechanic?.name
                }))}
                onChange={handleMechanicChange}
                placeholder='Select a Mechanic'
                isClearable
                isDisabled={isMechanicLoading}
                value={selectedMechanicData}
                noOptionsMessage={({ inputValue }) => (
                  inputValue ? (
                    <div className="text-center">
                      No Mechanic found.
                    </div>
                  ) : 'Type to search'
                )}
              />
            </div>
          </div>

          {/* Right Category Section */}
          <div className="col-12 col-md-8 col-lg-9">
            <ProductcategoryMaster />
          </div>
        </div>
      </div>

    </>
  );
};

export default DealerCustomerList;
