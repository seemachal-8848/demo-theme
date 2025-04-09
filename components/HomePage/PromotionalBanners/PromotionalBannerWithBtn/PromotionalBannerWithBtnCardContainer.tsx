import PromotionalBannerWithBtnCard from './PromotionalBannerWithBtnCard';

function PromotionalBannerWithBtnCardContainer({ data }: any) {
  return (
    <div className="custom-container-xl px-4 h-100">
      <div className="py-5">
        <div className="row">
          {data?.map((item: any, index: any) => (
            <div key={index} className="col-md-6 mb-2 mb-md-0 px-3">
              <PromotionalBannerWithBtnCard data={item} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PromotionalBannerWithBtnCardContainer;
