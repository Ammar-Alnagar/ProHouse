
const catchAsyncErrors = require('../middlewares/helpers/asyncErrorHandler');

// Get about us page
exports.getAboutUs = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'About Us Page',
    });
});

// Get developers page
exports.getDevelopers = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Developers Page',
    });
});

// Get partners page
exports.getPartners = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Partners Page',
    });
});

// Get properties page
exports.getProperties = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Properties Page',
    });
});

// Get join page
exports.getJoin = catchAsyncErrors(async (req, res, next) => {
    res.status(200).json({
        success: true,
        message: 'Join Page',
    });
});
