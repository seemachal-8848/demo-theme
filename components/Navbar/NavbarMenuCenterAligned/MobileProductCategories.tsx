import Image from 'next/image';
import Link from 'next/link';
import { Accordion, Offcanvas } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';
import { FiCommand } from 'react-icons/fi';
import logo from '../../../public/assets/images/logo.png';

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
      <Offcanvas.Header closeButton className="py-0">
        <div className={''}>
          <Link href="/" legacyBehavior>
            <a>
              <Image className="pb-2 mt-2" src={logo} alt="logo" width={250} />
            </a>
          </Link>
        </div>{' '}
      </Offcanvas.Header>
      <Offcanvas.Body>
        <div className="d-flex align-items-center">
          <input
            type="text"
            className="form-control rounded-5 border-secondary position-relative"
            name="search"
            id="search"
            placeholder={selectedLanguageData?.search_in}
            value={searchTerm}
            onChange={(e: any) => setSearchTerm(e.target.value)}
            required
          />
          <button
            className="input-group-text border-0 bg-transparent text-secondary position-absolute"
            type="submit"
            onClick={handleSearch}
            style={{ right: '20px' }}
          >
            <FaSearch />
          </button>
        </div>

        <div className="nav-sidebar mt-3">
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
