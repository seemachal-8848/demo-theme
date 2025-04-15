import { useRouter } from 'next/router';
import layoutData from '../summit-settings.json';

interface LayoutProps {
  children: React.ReactNode;
  componentProps?: any; // Define this properly if you know the structure
}
function Layout({ children, componentProps }: LayoutProps) {
  const router = useRouter();
  const toShowHeader =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;

  const toShowFooter =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;

  const HeaderRenderer = () => {
    if ('header_component' in layoutData?.data) {
      const Component = require(`./Navbar/${layoutData?.data.header_component}/MasterComponent`).default;
      return <Component key="navbar-component" />;
    }
    return null;
  };
  const FooterRenderer = () => {
    if ('footer_component' in layoutData?.data) {
      const Component = require(`./Footer/${layoutData?.data.footer_component}/MasterComponent`).default;
      return <Component key="footer-component" />;
    }
    return null;
  };

  return (
    <>
      {toShowHeader && <HeaderRenderer />}
      {children}
      {toShowFooter && <FooterRenderer />}
    </>
  );
}
export default Layout;
