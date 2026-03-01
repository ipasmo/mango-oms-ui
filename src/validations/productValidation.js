import * as Yup from 'yup';

/**
 * Product review validation schema
 */
export const productReviewSchema = Yup.object().shape({
  rating: Yup.number()
    .min(1, 'Rating must be at least 1')
    .max(5, 'Rating must be at most 5')
    .required('Rating is required'),
  title: Yup.string()
    .min(3, 'Title must be at least 3 characters')
    .max(100, 'Title must be at most 100 characters')
    .required('Title is required'),
  comment: Yup.string()
    .min(10, 'Comment must be at least 10 characters')
    .max(500, 'Comment must be at most 500 characters')
    .required('Comment is required'),
});

/**
 * Product search validation schema
 */
export const productSearchSchema = Yup.object().shape({
  query: Yup.string()
    .min(2, 'Search query must be at least 2 characters')
    .max(100, 'Search query must be at most 100 characters'),
  minPrice: Yup.number()
    .min(0, 'Minimum price must be positive'),
  maxPrice: Yup.number()
    .min(0, 'Maximum price must be positive')
    .test('max-greater-than-min', 'Maximum price must be greater than minimum price', function(value) {
      const { minPrice } = this.parent;
      return !minPrice || !value || value > minPrice;
    }),
});
