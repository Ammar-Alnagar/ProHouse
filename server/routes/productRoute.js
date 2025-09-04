const express = require('express');
const { getAllProducts, getProductDetails, updateProduct, deleteProduct, getProductReviews, deleteReview, createProductReview, createProduct, getProducts, getProductCategories } = require('../controllers/productController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user_actions/auth');
const router = express.Router();

router.route('/products').get(getAllProducts);
router.route('/products/all').get(getProducts);
router.route('/products/categories').get(getProductCategories);

router.route('/admin/products').get(isAuthenticatedUser, authorizeRoles("admin"), getProducts);
router.route('/admin/product/new').post(isAuthenticatedUser, authorizeRoles("admin"), createProduct);

router.route('/admin/product/:id')
    .put(isAuthenticatedUser, authorizeRoles("admin"), updateProduct)
    .delete(isAuthenticatedUser, authorizeRoles("admin"), deleteProduct);

router.route('/product/:id').get(getProductDetails);

router.route('/review').put(isAuthenticatedUser, createProductReview);

router.route('/admin/reviews')
    .get(getProductReviews)
    .delete(isAuthenticatedUser, deleteReview);

module.exports = router;