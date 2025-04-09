import Image from 'next/image';
import useBanner from '../../../../hooks/HomePageHooks/useHomeBanners';
import HomeBannerLoading from './HomeBannersLoading';
import HomeBanners from './HomeBanners';
import ErrorImage from '../../../../public/assets/images/error-icon.png';

const HomeBannersMaster = () => {
  const { bannersList, isLoading, errorMessage } = useBanner();
  if (isLoading) {
    return <HomeBannerLoading />;
  } else if (bannersList?.length > 0) {
    return <HomeBanners bannersList={bannersList} />;
  } else if (errorMessage) {
    return (
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ fontSize: '40px' }}>
        <Image src={ErrorImage} width={250} height={250} alt="Error Image" />
      </div>
    );
  }
  return <></>;
};

export default HomeBannersMaster;
