import React from 'react';
import { Col, Nav, Row, Tab } from 'react-bootstrap';
import { FaUser, FaCalendarDays } from 'react-icons/fa6';
import useGetUserDetails from '../../hooks/UserProfileHook/useGetUserDetails';
import { useSelector } from 'react-redux';
import { SelectedFilterLangDataFromStore } from '../../store/slices/general_slices/selected-multilanguage-slice';
import EnquiryHistory from './EnquiryHistory';
import ProfilePageSkeleton from './ProfilePageSkeleton';

const ProfileMaster = () => {
  const { userData, isLoading, errorMessage } = useGetUserDetails();
  const { selectedLanguageData }: any = useSelector(SelectedFilterLangDataFromStore);

  const arrForPersonalDetails = [
    { label: selectedLanguageData?.user_name || 'User Name', value: userData?.profile_details?.customer_name || '' },
    // { label: selectedLanguageData?.customer_name || '', value: userData?.profile_details?.customer_name || '' },
    { label: selectedLanguageData?.mobile_number || 'Mobile No', value: userData?.profile_details?.contact_no || '' },
    { label: selectedLanguageData?.email || 'Email', value: userData?.profile_details?.email || '' },
  ];
  const arrForAddressDetails = [
    {
      label: selectedLanguageData?.shipping_addresses || 'Shipping Addresses',
      value: [
        { label: selectedLanguageData?.name || 'Name', value: userData?.shipping_address?.name || '' },
        { label: selectedLanguageData?.email || 'Email', value: userData?.shipping_address?.user_id?.email || '' },
        { label: selectedLanguageData?.mobile_number || 'Mobile No', value: userData?.shipping_address?.user_id?.mobile_no || '' },
        { label: selectedLanguageData?.address || 'Address', value: userData?.shipping_address?.full_address || '' },
        { label: selectedLanguageData?.postal_code || 'Postal Code', value: userData?.shipping_address?.postal_code || '' },
        { label: selectedLanguageData?.state || 'State', value: userData?.shipping_address?.state || '' },
        { label: selectedLanguageData?.city || 'City', value: userData?.shipping_address?.city || '' },
        { label: selectedLanguageData?.country || 'Country', value: userData?.shipping_address?.country || '' },
      ],
    },
    {
      label: selectedLanguageData?.billing_addresses || 'Billing Addresses',
      value: [
        { label: selectedLanguageData?.name || 'Name', value: userData?.billing_address?.name || '' },
        { label: selectedLanguageData?.email || 'Email', value: userData?.billing_address?.user_id?.email || '' },
        { label: selectedLanguageData?.mobile_number || 'Mobile No', value: userData?.billing_address?.user_id?.mobile_no || '' },
        { label: selectedLanguageData?.address || 'Address', value: userData?.billing_address?.full_address || '' },
        { label: selectedLanguageData?.postal_code || 'Postal Code', value: userData?.billing_address?.postal_code || '' },
        { label: selectedLanguageData?.state || 'State', value: userData?.billing_address?.state || '' },
        { label: selectedLanguageData?.city || 'City', value: userData?.billing_address?.city || '' },
        { label: selectedLanguageData?.country || 'Country', value: userData?.billing_address?.country || '' },
      ],
    },
  ];
  if (isLoading) {
    return (
      <div>
        <ProfilePageSkeleton />
      </div>
    );
  }
  if (userData && Object?.keys(userData)?.length > 0) {
    return (
      <div className="container-fluid">
        <div className="mx-md-5">
          <div className="row my-3">
            <div className="col-12">
              <h4 className="fs-3 fw-bold">{selectedLanguageData?.my_account}</h4>
            </div>
          </div>
          <Tab.Container id="left-tabs-example" defaultActiveKey="personalDetails">
            <Row className="">
              <Col lg={3} className="mb-2">
                <Nav variant="" className="flex-column" style={{ position: 'sticky', top: '64px', bottom: '0' }}>
                  <Nav.Item className="border">
                    <Nav.Link eventKey="personalDetails" className="fs-5 d-flex justify-content-center flex-column align-items-center">
                      <div>
                        <FaUser />
                      </div>
                      <div>{selectedLanguageData?.profile}</div>
                    </Nav.Link>
                  </Nav.Item>
                  <Nav.Item className="border">
                    <Nav.Link eventKey="enquiryHistory" className="fs-5 d-flex justify-content-center flex-column align-items-center">
                      <div>
                        <FaCalendarDays />
                      </div>
                      <div>{selectedLanguageData?.enquiry_history}</div>
                    </Nav.Link>
                  </Nav.Item>
                </Nav>
              </Col>
              <Col lg={9}>
                <Tab.Content>
                  <Tab.Pane eventKey="personalDetails">
                    <div className="">
                      <div className="row">
                        <div className="col-md-8">
                          <div className="card h-100">
                            <div className="row m-2">
                              <div className="col-12">
                                <h4 className="fw-bolder">{selectedLanguageData?.personal_details}</h4>
                              </div>
                              {arrForPersonalDetails.map((detail, index) => (
                                <>
                                  <div className="col-4 mb-1 fw-bolder" key={index}>
                                    <div>{detail.label}</div>
                                  </div>
                                  <div className="col-1"></div>
                                  <div className="col-7">
                                    <div>{detail.value}</div>
                                  </div>
                                </>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4">
                          <div className="card h-100">
                            <div className="row m-2">
                              <div className="col-12">
                                <h4 className="fw-bolder">{selectedLanguageData?.coupons}</h4>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className=" my-3">
                      <div className="row">
                        {arrForAddressDetails.map((address, index) => (
                          <div className="col-md-6" key={index}>
                            <div className="row mx-1 border">
                              <div className="col-12">
                                <h4 className="fw-bold my-2">{address.label}</h4>
                              </div>
                              {address.value.map((detail, i) => (
                                <React.Fragment key={i}>
                                  <div className="col-6 mb-2">{detail.label}:</div>
                                  <div className="col-6 fw-bold ">{detail.value}</div>
                                </React.Fragment>
                              ))}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Tab.Pane>
                  <Tab.Pane eventKey="address"></Tab.Pane>
                  <Tab.Pane eventKey="offers"></Tab.Pane>
                  <Tab.Pane eventKey="payment">Second tab content</Tab.Pane>
                  <Tab.Pane eventKey="enquiryHistory">
                    <div className="card">
                      <div className="row">
                        <div className="col-12">
                          <h4>Enquiry History</h4>
                        </div>
                      </div>
                      <EnquiryHistory />
                    </div>
                  </Tab.Pane>
                </Tab.Content>
              </Col>
            </Row>
          </Tab.Container>
        </div>
      </div>
    );
  }
  if (errorMessage) {
    return <div>{errorMessage}</div>;
  }
  return <></>;
};

export default ProfileMaster;
