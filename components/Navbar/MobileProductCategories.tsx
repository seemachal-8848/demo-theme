import Image from 'next/image';
import Link from 'next/link';
import { Accordion, Offcanvas } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import logo from '../../public/assets/images/logo.png';

const MobileProductCategories = ({
  show,
  handleClose,
  navbarData,
  setIsSidebarOpen,
  selectedLanguageData,
  setSearchTerm,
  searchTerm,
  handleSearch,
}: any) => {
  return (
    <Offcanvas show={show} onHide={handleClose}>
      <Offcanvas.Header closeButton>
        <div className={''}>
          <Link href="/" legacyBehavior>
            <a>
              <Image className="pb-2 mb-1" src={logo} alt="logo" width={250} />
            </a>
          </Link>
        </div>{' '}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex ">
          <input
            type="text"
            className="form-control "
            name="search"
            id="search"
            placeholder={selectedLanguageData?.search_in}
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            required
          />
          <button className="border-0 text-secondary" type="submit" onClick={handleSearch}>
            <FaSearch />
          </button>
        </div>
        <div className="nav-sidebar">
          <Accordion>
            {navbarData?.length > 0 &&
              navbarData?.map((itemL1: any, indexL1: number) => (
                <Accordion.Item eventKey={`${indexL1}`} className="border-0" key={indexL1}>
                  <Accordion.Header className=" border-bottom fs-16 ">
                    <div>
                      <b>{itemL1?.label}</b>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    {itemL1?.values?.length > 0 &&
                      itemL1?.values !== null &&
                      itemL1?.values.map((itemL2: any, indexL2: number) => {
                        return (
                          <div className="nav-sidebar2" key={indexL2}>
                            <Accordion>
                              <Accordion.Item eventKey={`${indexL2}`} className="border-0">
                                <Accordion.Header className="border-bottom">
                                  <span className="px-3 ">{itemL2?.label}</span>
                                </Accordion.Header>
                                <Accordion.Body>
                                  {itemL2?.values?.length > 0 &&
                                    itemL2?.values?.map((itemL3: any, indexL3: number) => (
                                      <Link
                                        key={indexL3}
                                        href={{ pathname: `${itemL3?.url}`, query: { page: '1', currency: 'INR' } }}
                                        className="text-decoration-none text-dark"
                                        onClick={() => setIsSidebarOpen(false)}
                                      >
                                        <p className="px-3  py-3  m-0 border-bottom">{itemL3?.label}</p>
                                      </Link>
                                    ))}
                                </Accordion.Body>
                              </Accordion.Item>
                            </Accordion>
                          </div>
                        );
                      })}
                  </Accordion.Body>
                </Accordion.Item>
              ))}
          </Accordion>
        </div>
      </Offcanvas.Body>
    </Offcanvas>
  );
};

export default MobileProductCategories;
