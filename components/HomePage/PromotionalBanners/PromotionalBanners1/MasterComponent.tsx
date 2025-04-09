import React from 'react';
import Image from 'next/image';
import ErrorImage from '../../../../public/assets/images/error-icon.png';
import PromotionalBanners1CardContainer from './PromotionalBanners1CardContainer';
import usePromotionalBanner from '../../../../hooks/HomePageHooks/usePromotionalBanner';
import PromotionalBannersLoder from './PromotionalBannersLoder';

function MasterComponent() {
  const { isLoading, promotionalBannerData, errorMessage } = usePromotionalBanner();
  if (isLoading) {
    return <PromotionalBannersLoder />;
  } else if (promotionalBannerData?.length > 0) {
    return (
      <div>
        <PromotionalBanners1CardContainer promotionalBannerData={promotionalBannerData} />
      </div>
    );
  } else if (errorMessage) {
    return (
      <div className="p-3 d-flex justify-content-center align-items-center" style={{ fontSize: '40px' }}>
        <Image src={ErrorImage} width={250} height={250} alt="Error Image" />
      </div>
    );
  } else {
    return <></>;
  }
}

export default MasterComponent;
