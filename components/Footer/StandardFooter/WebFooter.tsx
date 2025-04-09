import Image from 'next/image';
import Link from 'next/link';
import { IoLocationOutline, IoCallOutline } from 'react-icons/io5';
import { TfiEmail } from 'react-icons/tfi';
import { FooterData } from '../../../interfaces/footer-interface';
import securityLogo from '../../../public/assets/images/security_image.png';
import ProGearHub from '../../../public/assets/images/logo.png';
import style from '../../../styles/components/footer.module.scss';

interface WebFooterProps {
  footerData: FooterData;
}

const WebFooter: React.FC<WebFooterProps> = ({ footerData }) => {
  return (
    <footer className={`bg-light text-dark web_footer_container ${style.footer_container}`}>
      <div className={`${style.footer_list_container}`}>
        <div className="container-fuild custom-container-xl">
          <div className="row">
            {/* Company Info */}
            <div className="col-xl-3 col-md-6 col-lg-6 mb-4">
              <div className="mb-4">
                <Image className={``} src={ProGearHub} alt="logo" loading="eager" width={200} height={50} />
              </div>
              <p className="d-flex px-1">
                <IoLocationOutline className="me-2 fs-1" />
                <span>184 Main Rd E, St Albans VIC 3021, Australia</span>
              </p>
              <p className="text-secondary d-flex px-2">
                <TfiEmail className="me-2 fs-3" />
                <span>contact@company.com</span>
              </p>
              <p className="d-flex px-2">
                <IoCallOutline className="me-2 fs-3" />
                <span>+001 2233 456</span>
              </p>
              <div className="d-flex px-2">
                {footerData.socialLinks.map((link, index) => (
                  <Link key={index} href={link.href} className="text-dark me-3">
                    {link.icon}
                  </Link>
                ))}
              </div>
            </div>

            {/* Categories */}
            <div className="col-xl-2 col-md-6 col-lg-6 mb-4 pt-2">
              <h5 className={`mb-4 ${style.footer_list_heading}`}>Categories</h5>
              <ul className="list-unstyled text-secondary">
                {footerData.categories.map((item, index) => (
                  <Link href="#" className="text-decoration-none text-secondary">
                    <li className="mb-2" key={index}>
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            {/* Information */}
            <div className="col-xl-2 col-md-6 col-lg-6 mb-4 pt-2">
              <h5 className={`mb-4 ${style.footer_list_heading}`}>Information</h5>
              <ul className="list-unstyled text-secondary">
                {footerData.information.map((item, index) => (
                  <Link href="#" className="text-decoration-none text-secondary">
                    <li className="mb-2" key={index}>
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            {/* Useful Links */}
            <div className="col-xl-2 col-md-6 col-lg-6 mb-4 pt-2">
              <h5 className={`mb-4 ${style.footer_list_heading}`}>Useful Links</h5>
              <ul className="list-unstyled text-secondary">
                {footerData.usefulLinks.map((item, index) => (
                  <Link href="#" className="text-decoration-none text-secondary">
                    <li className="mb-2" key={index}>
                      {item}
                    </li>
                  </Link>
                ))}
              </ul>
            </div>

            {/* Newsletter Signup */}
            <div className="col-xl-3 col-md-6 col-lg-6 mb-4 pt-2">
              <h5 className={`mb-4 ${style.footer_list_heading}`}>Newsletter Signup</h5>
              <p>Subscribe to our newsletter and get 10% off your first purchase</p>
              <div className="input-group mb-3">
                <input type="email" className="form-control" placeholder="Your email address" />
                <button className={`btn btn-dark ${style.subscribe_btn}`} type="button">
                  Subscribe
                </button>
              </div>
              <div className="d-flex">
                {footerData.securityLogos.map((logo, index) => (
                  <Image key={index} src={securityLogo} alt={logo.alt || ''} width={250} height={35} style={{ width: '100%' }} />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className={`py-3 text-center ${style.footer_bottom}`}>
        <div className={`d-flex justify-content-between align-items-center mx-auto`} style={{ maxWidth: '1200px' }}>
          <p className="mb-0 ps-md-5 ps-xl-0">
            <span className="text-secondary">All Rights Reserved © 2025</span> <span className="fw-bold text-danger">ProGearHub</span>{' '}
            store - Developed by <span style={{ fontWeight: '600' }}>8848 Digital</span>
          </p>
          {/* links  */}
          <div className="pe-md-5 pe-xl-0">
            <ul className="list-unstyled d-flex mb-0">
              {footerData.bottomLinks.map((item, index) => (
                <li key={index}>
                  <Link href="#" className="text-decoration-none text-secondary me-2">
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default WebFooter;
