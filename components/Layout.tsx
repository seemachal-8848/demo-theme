import { useRouter } from 'next/router';
import layoutData from '../summit-settings.json';

interface LayoutProps {
  children: React.ReactNode;
  componentProps?: any; // Define this properly if you know the structure
}
function Layout({ children, componentProps }: LayoutProps) {
  console.log('props', componentProps);
  console.log('sasa');
  const router = useRouter();
  const toShowHeader =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;

  const toShowFooter =
    router.pathname === '/login' || router.pathname === '/register' || router.pathname === '/forgot_password' ? false : true;

  const HeaderRenderer = () => {
    const Component = require(`./Navbar/${layoutData?.data.header_component}/MasterComponent`).default;
    return <Component key="navbar-component" />;
  };
  const FooterRenderer = () => {
    const Component = require(`./Footer/${layoutData?.data.footer_component}/MasterComponent`).default;
    return <Component key="navbar-component" />;
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
