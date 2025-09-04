
const Developer = require('../models/Developer');
const catchAsyncErrors = require('../middlewares/helpers/asyncErrorHandler');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');

// Create Developer
exports.createDeveloper = catchAsyncErrors(async (req, res, next) => {
    let logo = {};
    if (req.body.logo) {
        const result = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: 'developers',
        });

        logo = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    const developer = await Developer.create({
        name: req.body.name,
        logo,
    });

    res.status(201).json({
        success: true,
        developer,
    });
});

// Get all developers
exports.getAllDevelopers = catchAsyncErrors(async (req, res, next) => {
    const developers = await Developer.find();

    res.status(200).json({
        success: true,
        developers,
    });
});

// Get single developer
exports.getDeveloperDetails = catchAsyncErrors(async (req, res, next) => {
    const developer = await Developer.findById(req.params.id);

    if (!developer) {
        return next(new ErrorHandler('Developer not found', 404));
    }

    res.status(200).json({
        success: true,
        developer,
    });
});

// Update developer
exports.updateDeveloper = catchAsyncErrors(async (req, res, next) => {
    let developer = await Developer.findById(req.params.id);

    if (!developer) {
        return next(new ErrorHandler('Developer not found', 404));
    }

    let logo = {};
    if (req.body.logo) {
        await cloudinary.v2.uploader.destroy(developer.logo.public_id);

        const result = await cloudinary.v2.uploader.upload(req.body.logo, {
            folder: 'developers',
        });

        logo = {
            public_id: result.public_id,
            url: result.secure_url,
        };
    }

    developer = await Developer.findByIdAndUpdate(req.params.id, {
        name: req.body.name,
        logo,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        developer,
    });
});

// Delete developer
exports.deleteDeveloper = catchAsyncErrors(async (req, res, next) => {
    const developer = await Developer.findById(req.params.id);

    if (!developer) {
        return next(new ErrorHandler('Developer not found', 404));
    }

    await cloudinary.v2.uploader.destroy(developer.logo.public_id);

    await developer.remove();

    res.status(200).json({
        success: true,
        message: 'Developer deleted',
    });
});
