import { useEffect, useState } from 'react';
import Select from 'react-select';
import useWebsiteUserList from '../../../../hooks/WebsiteUserList/useWebsiteUserList';
import { useRouter } from 'next/router';
import MechanicSelect from '../../../MechanicListComponent/MechanicSelect';
import { getUserType } from '../../../../utils/get-user-role';

const DealerCustomerList = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [selectedMechanicData, setSelectedMechanicData] = useState<any>({});
  const router = useRouter();
  // get roles
  const userType = getUserType();

  // If not a B2B or B2C sales person, return null to skip rendering
  if (!userType) return null;

  const { websiteUserList, isLoading, errorMessage } = useWebsiteUserList(userType)

  const handleChange = (option: any) => {
    setSelectedOption(option);

    const currentQuery = { ...router.query };

    if (option) {
      // Add or update email in the URL
      currentQuery.email = option?.email;
      // Set mechanic data in the format expected by react-select
      if (option?.mechanic) {
        setSelectedMechanicData({
          value: option.mechanic,
          label: option.mechanic
        });
      } else {
        setSelectedMechanicData({});
      }
    } else {
      // Remove email from the URL
      delete currentQuery.email;
      setSelectedMechanicData({});
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
        // Also set the mechanic if it exists
        if (matchedUser.mechanic) {
          setSelectedMechanicData({
            value: matchedUser.mechanic,
            label: matchedUser.mechanic
          });
        }
      }
    }
  }, [router.query.email, websiteUserList]);

  if (isLoading) {
    return (
      <>
        <p>...Loading</p>
      </>
    );
  }

  return (
    <>
      {/* Dealer/Customer Dropdown */}
      <div className="mb-3">
        <label className="fw-semibold">
          {userType === 'B2B' ? 'Dealer:' : 'Customer:'}
        </label>
        <Select
          options={websiteUserList.length > 0 && websiteUserList.map((user: any) => ({
            ...user,
            value: user?.email,
            label: user?.customer_name
          }))}
          onChange={handleChange}
          placeholder={userType === 'B2B' ? 'Select a Dealer' : 'Select a Customer'}
          isClearable
          value={selectedOption}
          noOptionsMessage={({ inputValue }) => (
            inputValue ? (
              <div className="text-center">
                No {userType === 'B2B' ? 'dealer' : 'customer'} found.
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
          {userType === 'B2B' ? (
            <div className='d-flex wrap gap-3'>
              <div><strong>Outstanding:</strong> ₹{selectedOption?.outstanding_amount || 0}</div>
              <div><strong>CR. Limit:</strong> ₹{selectedOption?.credit_limit || 0}</div>
            </div>
          ) : (
            <div><strong>Loyalty Points:</strong> {selectedOption?.collection_factor || 0}</div>
          )}
        </div>
      )}
      {/* Mechanic Dropdown */}
      {userType === 'B2C' && (
        <MechanicSelect
          selectedOption={selectedOption}
          setSelectedMechanicData={setSelectedMechanicData}
          selectedMechanicData={selectedMechanicData}
        />
      )}
    </>
  );
};

export default DealerCustomerList;
