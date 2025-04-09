import Image from 'next/image';
import usePromotionalBanner from '../../../../hooks/HomePageHooks/usePromotionalBanner';
import ErrorImage from '../../../../public/assets/images/error-icon.png';
import PromotionalBannerWithBtnCardContainer from './PromotionalBannerWithBtnCardContainer';
import PromotionalBannerWithBtnLoader from './PromotionalBannerWithBtnLoader';

function MasterComponent() {
  const { isLoading, promotionalBannerData, errorMessage } = usePromotionalBanner();
  if (isLoading) {
    return <PromotionalBannerWithBtnLoader />;
  } else if (promotionalBannerData?.length > 0) {
    return <PromotionalBannerWithBtnCardContainer data={promotionalBannerData} />;
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
