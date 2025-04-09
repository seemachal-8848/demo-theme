import dynamic from 'next/dynamic';
import { Button } from 'react-bootstrap';
import ReviewList from './ReviewList';
import ReviewRatingBar from './ReviewRatingBar';
import useCustomerReview from '../../hooks/ProductDetailPageHooks/useCustomerReview';
const CustomerReviewModal = dynamic(() => import('./CustomerReviewModal'));

const ReviewMaster = ({ selectedMultiLangData }: any) => {
  const {
    uploadReviewImage,
    reviewPhotos,
    reviewList,
    isLoading,
    handleRating,
    handleFormSubmit,
    handleToggleReviewForm,
    showForm,
    initialValues,
    handleClose,
  } = useCustomerReview();

  return (
    <>
      {reviewList?.length > 0 && (
        <div className="container-fluid w-100 ps-lg-5 pe-lg-5">
          <div className="row">
            <div className="col-md-4">
              <ReviewRatingBar reviewList={reviewList} selectedMultiLangData={selectedMultiLangData} />
              {localStorage.getItem('party_name') && (
                <>
                  <h5>Review this product</h5>
                  <p>Share your thoughts with other customers</p>
                  <Button variant="outline-primary" onClick={handleToggleReviewForm}>
                    {selectedMultiLangData?.write_a_review}
                  </Button>
                </>
              )}
            </div>
            <div className="col-md-8">
              <ReviewList reviewList={reviewList} isLoading={isLoading} />
            </div>
          </div>
          <CustomerReviewModal
            showForm={showForm}
            reviewPhotos={reviewPhotos}
            uploadReviewImage={uploadReviewImage}
            handleRating={handleRating}
            handleFormSubmit={handleFormSubmit}
            handleToggleReviewForm={handleToggleReviewForm}
            initialValues={initialValues}
            handleClose={handleClose}
          />
        </div>
      )}
    </>
  );
};

export default ReviewMaster;
