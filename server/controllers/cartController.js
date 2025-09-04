
const Cart = require('../models/Cart');
const catchAsyncErrors = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');

// Get all items in cart for a user
exports.getCartItems = catchAsyncErrors(async (req, res, next) => {
    const cartItems = await Cart.find({ user: req.user.id }).populate('product');

    res.status(200).json({
        success: true,
        cartItems,
    });
});

// Add item to cart
exports.addItemToCart = catchAsyncErrors(async (req, res, next) => {
    const { product, quantity, productAttributes } = req.body;

    const cartItem = await Cart.create({
        user: req.user.id,
        product,
        quantity,
        productAttributes,
    });

    res.status(201).json({
        success: true,
        cartItem,
    });
});

// Remove item from cart
exports.removeItemFromCart = catchAsyncErrors(async (req, res, next) => {
    const cartItem = await Cart.findById(req.params.id);

    if (!cartItem) {
        return next(new ErrorHandler('Cart item not found', 404));
    }

    await cartItem.remove();

    res.status(200).json({
        success: true,
        message: 'Cart item removed',
    });
});
