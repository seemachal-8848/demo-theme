import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useRegisterUser from '../../hooks/AuthHooks/useRegisterUser';
import useCustomerGroupList from '../../hooks/CustomerGroupHook/useCustomerGroupList';

const getGstinInfo = async (data: any) => {
  if (data.gstin) {
    let gstinUrl = `https://yatish-testing-v15.frappe.cloud/api/method/india_compliance.gst_india.utils.gstin_info.get_gstin_info?gstin=${data.gstin}`;
    const response = await fetch(gstinUrl, {
      method: 'POST',
      headers: { Authorization: data?.token },
    });
    return response.json();
  } else {
    return { error: 'Invalid Request. Pls Enter GSTIN' };
  }
}



const RegisterComponentWithGST = () => {
  const {
    isLoading,
    errorMessage,
    handleRegistrationFormValueChanges,
    submitRegistrationForm,
    registrationFormData,
    resetRegistrationForm,
  } = useRegisterUser();

  const [formData, setFormData] = useState({
    salutation: '',
    name: '',
    email: '',
    password: '',
    contact_no: '',
    gst_number: '',
    state: '',
    city: '',
    address_line_1: '',
    address_line_2: '',
    addressType: '',
    pincode: '',
    role: 'Customer',
    gst_category: '',
    customer_group: ''
  });

  const [errors, setErrors] = useState<any>({});
  const [isGSTValid, setIsGSTValid] = useState(false);
  const token = 'token e582dd50060542f:2ad96b6ca90bfe3'
  const { customerGroupList } = useCustomerGroupList()

  const validate = () => {
    const newErrors: any = {};
    if (!formData.salutation) newErrors.salutation = 'Salutation is required';
    if (!formData.name) newErrors.name = 'Name is required';
    if (!formData.role) newErrors.role = 'User Type is required';
    if (!formData.customer_group) newErrors.customer_group = 'Customer group is required';
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email address';
    if (!formData.password) newErrors.password = 'Password is required';
    else if (formData.password.length < 6) newErrors.password = 'Password must be at least 6 characters';
    if (!formData.contact_no) newErrors.contact_no = 'Contact is required';
    else if (!/^[0-9]{10}$/.test(formData.contact_no)) newErrors.contact_no = 'Contact must be a 10-digit number';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.address_line_1) newErrors.address_line_1 = 'Address Line 1 is required';
    if (!formData.pincode) newErrors.pincode = 'Pincode is required';
    else if (!/^[0-9]{6}$/.test(formData.pincode)) newErrors.pincode = 'Pincode must be a 6-digit number';

    if (!formData.gst_category) {
      newErrors.gst_category = 'GST Category is required';
    } else if (
      formData.gst_category === 'Registered Regular' ||
      formData.gst_category === 'Registered Composition'
    ) {
      if (!formData.gst_number) {
        newErrors.gst_number = 'GST Number is required for registered GST categories';
      }
    }
    return newErrors;
  };

  const handleGSTNumberChange = async (value: string) => {
    if (value.length >= 15) {
      try {
        const gstData = await getGstinInfo({ gstin: value, token });
        if (gstData.message && Object.keys(gstData.message)?.length > 0) {
          const { gst_category } = gstData.message;
          setFormData((prev) => ({
            ...prev,
            gst_number: value,
            gst_category: gst_category === 'Registered Composition' ? 'Registered Composition' : 'Registered Regular',
          }));
          setIsGSTValid(true);
        } else {
          setFormData((prev) => ({
            ...prev,
            gst_number: value,
            gst_category: 'Unregistered',
          }));
          setIsGSTValid(false);
        }
      } catch (error) {
        setFormData((prev) => ({
          ...prev,
          gst_number: value,
          gst_category: 'Unregistered',
        }));
        setIsGSTValid(false);
      }
    } else {
      // If less than 15 characters
      setFormData((prev) => ({
        ...prev,
        gst_number: value,
        gst_category: 'Unregistered',
      }));
      setIsGSTValid(false);
    }
  };


  const handleChange = async (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === 'gst_number') {
      handleGSTNumberChange(value);
    }
  };


  const handleSubmit = (e: any) => {
    e.preventDefault();
    const validationErrors = validate();

    if (
      formData.gst_category === 'Unregistered' &&
      formData.gst_number.trim().length > 0
    ) {
      toast.error('Invalid GST number. Please remove it or provide a valid GST number');
      return;
    }

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      setErrors({});
      submitRegistrationForm(formData);
    }
  };
  console.log("formData", formData)
  return (
    <div className="registration-form">
      <div className="row mt-5">
        <div className="d-flex justify-content-center">
          <div className="col-12 col-lg-8">
            <div className="card p-4">
              <h2 className="text-center">Create Your Account</h2>
              <div className="px-md-5">
                <form onSubmit={handleSubmit}>
                  <div className="d-flex py-2">
                    <div className="input-group">
                      <select
                        name="salutation"
                        value={formData.salutation}
                        onChange={handleChange}
                        className="input-group-field form-control-sm border"
                      >
                        <option value="">Select</option>
                        <option value="Mr">Mr</option>
                        <option value="Ms">Ms</option>
                        <option value="Mrs">Mrs</option>
                      </select>
                      <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="input-group-field form-control"
                      />
                    </div>
                  </div>
                  {errors?.salutation && <div className="text-danger">{errors?.salutation}</div>}
                  {errors.name && <div className="text-danger">{errors.name}</div>}

                  <div className="row py-md-2">
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <select name="role" value={formData.role} onChange={handleChange} className="form-control" disabled={true}>
                        {/* <option value="" className='text-secondary'>User Types</option> */}
                        <option value="Customer">Customer</option>
                        {/* <option value="Salesperson">Salesperson</option>
                        <option value="Dealer">Dealer</option> */}
                      </select>
                      {errors.role && <div className="text-danger">{errors.role}</div>}
                    </div>

                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <select
                        name="customer_group"
                        value={formData.customer_group}
                        onChange={handleChange}
                        className="form-control"
                      >
                        <option value="" className="text-secondary">Customer Groups</option>
                        {customerGroupList.length > 0 && customerGroupList.map((group: any, index: number) => (
                          <option key={index} value={group?.name}>
                            {group?.name}
                          </option>
                        ))}
                      </select>
                      {errors.customer_group && <div className="text-danger">{errors.customer_group}</div>}
                    </div>
                  </div>

                  {/* kljdflkjdl */}
                  <div className="row py-md-2">
                    <input
                      type="text"
                      name="contact_no"
                      placeholder="Contact Number"
                      value={formData.contact_no}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.contact_no && <div className="text-danger">{errors.contact_no}</div>}
                  </div>
                  {/* kljflkfl */}

                  <div className="row py-md-2">
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.email && <div className="text-danger">{errors.email}</div>}
                    </div>
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <input
                        type="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.password && <div className="text-danger">{errors.password}</div>}
                    </div>
                  </div>

                  <div className="row py-md-2">
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <input
                        type="text"
                        name="gst_number"
                        placeholder="GST Number"
                        value={formData.gst_number}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.gst_number && <div className="text-danger">{errors.gst_number}</div>}
                    </div>
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <select name="gst_category"
                        value={formData.gst_category}
                        onChange={handleChange}
                        className="form-control text-secondary"
                        disabled={
                          (formData.gst_category === 'Registered Regular' || formData.gst_category === 'Registered Composition') &&
                          isGSTValid
                        }
                      >
                        <option value="" className='text-secondary'>GST Category</option>
                        <option value="Registered Regular">Registered Regular</option>
                        <option value="Registered Composition">Registered Composition</option>
                        <option value="Unregistered">Unregistered</option>
                      </select>
                      {errors.userType && <div className="text-danger">{errors.userType}</div>}
                    </div>
                  </div>

                  <div className="row py-md-2">
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <input
                        type="text"
                        name="state"
                        placeholder="State"
                        value={formData.state}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.state && <div className="text-danger">{errors.state}</div>}
                    </div>
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <input
                        type="text"
                        name="city"
                        placeholder="City"
                        value={formData.city}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.city && <div className="text-danger">{errors.city}</div>}
                    </div>
                  </div>

                  <div className="py-2">
                    <input
                      type="text"
                      name="address_line_1"
                      placeholder="Address Line 1"
                      value={formData.address_line_1}
                      onChange={handleChange}
                      className="form-control"
                    />
                    {errors.address_line_1 && <div className="text-danger">{errors.address_line_1}</div>}
                  </div>

                  <div className="py-2">
                    <input
                      type="text"
                      name="address_line_2"
                      placeholder="Address Line 2"
                      value={formData.address_line_2}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>

                  <div className="row py-md-2">
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <select name="addressType" value={formData.addressType} onChange={handleChange} className="form-control">
                        <option value="">Select Address Type</option>
                        <option value="Home">Home</option>
                        <option value="Office">Office</option>
                      </select>
                      {errors.addressType && <div className="text-danger">{errors.addressType}</div>}
                    </div>
                    <div className="col-12 col-md-6 py-2 py-md-0">
                      <input
                        type="text"
                        name="pincode"
                        placeholder="Pincode"
                        value={formData.pincode}
                        onChange={handleChange}
                        className="form-control"
                      />
                      {errors.pincode && <div className="text-danger">{errors.pincode}</div>}
                    </div>
                  </div>

                  <div className="d-flex justify-content-center py-3">
                    <button
                      type="button"
                      className="btn btn-secondary me-4"
                      onClick={() => {
                        setFormData({
                          salutation: '',
                          name: '',
                          email: '',
                          password: '',
                          contact_no: '',
                          gst_number: '',
                          state: '',
                          city: '',
                          address_line_1: '',
                          address_line_2: '',
                          addressType: '',
                          pincode: '',
                          role: 'Customer',
                          gst_category: '',
                          customer_group: ''
                        });
                        setErrors({});
                      }}
                    >
                      Reset
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {isLoading ? 'Loading...' : 'Register'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterComponentWithGST;
