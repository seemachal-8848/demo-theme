import { ProductSlideshowImages } from '../../../interfaces/product-slideshow-images';
import ImageGalleryWithLeftThumbnails from './ImageGalleryWithLeftThumbnails';
import ImageGalleryWithRightThumbnails from './ImageGalleryWithRightThumbnails';
import ImageGalleryWithBottomThumbnails from './ImageGalleryWithBottomThumbnails';
const ImageGalleryMaster = ({ slideShowImages }: ProductSlideshowImages) => {
  return (
    <>
      <ImageGalleryWithLeftThumbnails slideShowImages={slideShowImages} />
      {/* <ImageGalleryWithRightThumbnails slideShowImages={slideShowImages} /> */}
      {/* <ImageGalleryWithBottomThumbnails slideShowImages={slideShowImages} /> */}
    </>
  );
};

export default ImageGalleryMaster;
