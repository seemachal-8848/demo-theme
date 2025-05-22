import { useEffect, useState } from 'react';
import Select from 'react-select';
import useWebsiteUserList from '../../../../hooks/WebsiteUserList/useWebsiteUserList';
import { useRouter } from 'next/router';
import MechanicSelect from '../../../MechanicListComponent/MechanicSelect';

const DealerCustomerList = () => {
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const router = useRouter();
  // Read roles from localStorage and parse them
  const userRoles = JSON.parse(localStorage.getItem('user_role') || '[]');

  const isB2BSalesPerson = userRoles.includes('Sales Person');
  const isB2CSalesPerson = userRoles.includes('POS Sales Person');

  const type = isB2BSalesPerson ? 'B2B' : isB2CSalesPerson ? 'B2C' : null;

  // If not a B2B or B2C sales person, return null to skip rendering
  if (!type) return null;

  const { websiteUserList, isLoading, errorMessage } = useWebsiteUserList(type)

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
              <div><strong>Outstanding:</strong> ₹{selectedOption?.outstanding_amount || 0}</div>
              <div><strong>CR. Limit:</strong> ₹{selectedOption?.credit_limit || 0}</div>
            </div>
          ) : (
            <div><strong>Loyalty Points:</strong> {selectedOption?.collection_factor || 0}</div>
          )}
        </div>
      )}

      {/* Mechanic Dropdown */}
      {isB2CSalesPerson && (
        <MechanicSelect
          selectedOption={selectedOption}
        />
      )}
    </>
  );
};

export default DealerCustomerList;
