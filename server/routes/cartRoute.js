
const express = require('express');
const { getCartItems, addItemToCart, removeItemFromCart } = require('../controllers/cartController');
const { isAuthenticatedUser } = require('../middlewares/user_actions/auth');

const router = express.Router();

router.route('/cart').get(isAuthenticatedUser, getCartItems);
router.route('/cart/new').post(isAuthenticatedUser, addItemToCart);
router.route('/cart/:id').delete(isAuthenticatedUser, removeItemFromCart);

module.exports = router;
