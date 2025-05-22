import Select from 'react-select';
import { toast } from 'react-toastify';
import useMechanicList from '../../hooks/WebsiteUserList/useMechanicList';
import useAddMechanic from '../../hooks/WebsiteUserList/useAddMechanic';

const MechanicSelect = ({ selectedOption, setSelectedMechanicData, selectedMechanicData }: any) => {
  const { mechanicList, isLoading } = useMechanicList();
  const { handleAddMechanic, isLoading: isMechanicLoading } = useAddMechanic();

  const handleMechanicChange = (option: any) => {
    if (!selectedOption) {
      toast.warn('Please select a customer before selecting a mechanic.');
      return;
    }

    if (selectedMechanicData?.value === option?.value) return;

    setSelectedMechanicData(option);

    const userData = {
      email_id: selectedOption?.email,
      mechanic: option?.value,
    };

    handleAddMechanic(userData);
  };

  if (isLoading) {
    return (
      <>
        <p>...Loading</p>
      </>
    );
  }

  return (
    <div className="mb-3">
      <label className="fw-semibold">Mechanic Name</label>
      <Select
        options={
          mechanicList.length > 0 &&
          mechanicList.map((mechanic: any) => ({
            ...mechanic,
            value: mechanic?.name,
            label: mechanic?.name,
          }))
        }
        onChange={handleMechanicChange}
        placeholder="Select a Mechanic"
        isClearable
        isDisabled={isMechanicLoading}
        value={selectedMechanicData}
        noOptionsMessage={({ inputValue }) =>
          inputValue ? (
            <div className="text-center">No Mechanic found.</div>
          ) : (
            'Type to search'
          )
        }
      />
    </div>
  );
};

export default MechanicSelect;
