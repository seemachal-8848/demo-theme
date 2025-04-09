import 'react-multi-carousel/lib/styles.css';
import JewelleryProductCardVariantImage from '../../../../cards/JewelleryProductCardVariantImage';
import {
  default as FeaturedCollectionProductTypes,
  default as FeaturedCollectionTypes,
} from '../../../../interfaces/featured-collection-interface';
import style from '../../../../styles/components/home.module.scss';

interface featuredCardContainerPropsTypes {
  allTagsData: FeaturedCollectionTypes[];
  cartData: any;
  addToCartItem: (item: any, props: any) => void;
  getPartyName: string | null;
  wishlistData: any;
}

const JewelleryFeaturedCollectionWithVariantImageCardContainer = ({
  allTagsData,
  cartData,
  addToCartItem,
  getPartyName,
  wishlistData,
}: featuredCardContainerPropsTypes) => {
  return (
    <div className="custom-container-xl slider-container p-0 px-4 ">
      {allTagsData?.length > 0 &&
        allTagsData.map((item: FeaturedCollectionTypes, i: number) => (
          <div key={i} className="mt-5 pt-md-3">
            <h3 className={`${style.featuredCollectionTitle} text-center m-0 my-2 fw-bold`}>
              <span className="px-2"> {item?.tag_name}</span>
            </h3>
            <h6 className={`${style.featured_collection_description} text-secondary text-center mb-2 px-2`}>{item?.description}</h6>
            {item?.value?.length > 0 && (
              <div className="slider-container p-0 ">
                <div className="row">
                  {item.value.map((val: FeaturedCollectionProductTypes, index: number) => (
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3 gap-2 px-2 px-md-3 mt-3" key={index}>
                      <div className={'h-100'}>
                        <JewelleryProductCardVariantImage
                          data={val}
                          cartData={cartData}
                          addToCartItem={addToCartItem}
                          getPartyName={getPartyName}
                          wishlistData={wishlistData}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
    </div>
  );
};
export default JewelleryFeaturedCollectionWithVariantImageCardContainer;
