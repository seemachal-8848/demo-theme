import React from 'react';
import WebFooter from './WebFooter';
import MobileFooter from './MobileFooter';
import { FaFacebookF, FaPinterestP, FaTelegramPlane, FaEnvelope } from 'react-icons/fa';
import { FaXTwitter } from 'react-icons/fa6';
import securityLogo from '../../../public/assets/images/security_image.png';
import { FooterData } from '../../../interfaces/footer-interface';

// Data for list items
const footerData: FooterData = {
  socialLinks: [
    {
      href: '#',
      icon: <FaFacebookF style={{ color: '#6c757d' }} />,
    },
    {
      href: '#',
      icon: <FaXTwitter style={{ color: '#6c757d' }} />,
    },
    {
      href: '#',
      icon: <FaPinterestP style={{ color: '#6c757d' }} />,
    },
    {
      href: '#',
      icon: <FaTelegramPlane style={{ color: '#6c757d' }} />,
    },
    {
      href: '#',
      icon: <FaEnvelope style={{ color: '#6c757d' }} />,
    },
  ],
  categories: ['Men', 'Women', 'Decor', 'Dress', 'Denim', 'Wedding Decor'],
  information: ['About Us', 'Contact Us', 'Privacy Policy', 'Shipping & Delivery', 'Terms & Conditions', 'Returns & Exchanges'],
  usefulLinks: ['Store Location', 'Latest Posts', 'My Account', 'Size Guide', 'FAQs', 'FAQs 2'],
  bottomLinks: ['Shop', 'About Us', 'Contact Us', 'Blog'],
  securityLogos: [
    {
      src: securityLogo,
      alt: 'McAfee',
    },
  ],
};

const Footer = () => {
  return (
    <>
      <div className="d-none d-md-block ">
        <WebFooter footerData={footerData} />
      </div>
      <div className="d-block d-md-none">
        <MobileFooter footerData={footerData} />
      </div>
    </>
  );
};

export default Footer;
