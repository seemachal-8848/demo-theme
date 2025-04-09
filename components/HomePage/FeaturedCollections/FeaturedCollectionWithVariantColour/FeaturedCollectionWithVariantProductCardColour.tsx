import Link from 'next/link';
import styles from '../../../../styles/components/variantProductCards.module.scss';

interface ProductPropsTypes {
  data: any;
  handleRedirectToProductDetailPage: any;
  handleSelectVariant: (variant: any) => void;
  selectedItem: any;
}

interface AttributeTypes {
  field_name: string;
  label: string;
  values: string[];
  default_value: string;
  hex_value: string[];
  display_thumbnail: boolean;
}

const FeaturedCollectionWithVariantProductCardColour = ({
  data,
  handleRedirectToProductDetailPage,
  handleSelectVariant,
  selectedItem,
}: ProductPropsTypes) => {
  const colourAttribute = data?.attributes?.find((attr: AttributeTypes) => attr.field_name === 'Colour');
  return (
    <>
      <div className="d-flex">
        {colourAttribute?.hex_value?.map((colour: string, index: number) => (
          <Link
            href={handleRedirectToProductDetailPage()}
            key={index}
            className={`${styles.tabProductColor} ${
              selectedItem?.colour_attr_colour === colour ? styles?.borderActive : styles?.borderInactive
            }`}
            style={{ backgroundColor: colour }}
            onMouseEnter={() => handleSelectVariant(colour)}
          >
            {colour}
          </Link>
        ))}
      </div>
    </>
  );
};

export default FeaturedCollectionWithVariantProductCardColour;
