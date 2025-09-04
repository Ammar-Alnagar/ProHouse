const Product = require('../models/productModel');
const Category = require('../models/Category');
const asyncErrorHandler = require('../middlewares/helpers/asyncErrorHandler');
const SearchFeatures = require('../utils/searchFeatures');
const ErrorHandler = require('../utils/errorHandler');
const cloudinary = require('cloudinary');
const imageUpload = require('../utils/imageUpload');
const { PRODUCT_NOT_FOUND, PLEASE_ENTER_ALL_FIELDS } = require('../utils/constants');

// Get All Products
exports.getAllProducts = asyncErrorHandler(async (req, res, next) => {

    const resultPerPage = 12;
    const productsCount = await Product.countDocuments();
    // console.log(req.query);

    const searchFeature = new SearchFeatures(Product.find(), req.query)
        .search()
        .filter();

    let products = await searchFeature.query;
    let filteredProductsCount = products.length;

    searchFeature.pagination(resultPerPage);

    products = await searchFeature.query.clone();

    res.status(200).json({
        success: true,
        products,
        productsCount,
        resultPerPage,
        filteredProductsCount,
    });
});

// Get All Products ---Product Sliders
exports.getProducts = asyncErrorHandler(async (req, res, next) => {
    const products = await Product.find();

    res.status(200).json({
        success: true,
        products,
    });
});

// Get Product Details
exports.getProductDetails = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND, 404));
    }

    res.status(200).json({
        success: true,
        product,
    });
});



// Create Product ---ADMIN
exports.createProduct = asyncErrorHandler(async (req, res, next) => {
    const { name, description, price, category, stock, brandname, specifications, images, logo } = req.body;

    if (!name || !description || !price || !category || !stock || !brandname || !specifications || !images || !logo) {
        return next(new ErrorHandler(PLEASE_ENTER_ALL_FIELDS, 400));
    }

    const imagesLink = await imageUpload(images, "products");
    const brandLogo = await imageUpload(logo, "brands");

    const brand = {
        name: brandname,
        logo: brandLogo[0],
    }

    let specs = [];
    specifications.forEach((s) => {
        specs.push(JSON.parse(s))
    });

    const product = await Product.create({
        name,
        description,
        price,
        category,
        stock,
        brand,
        specifications: specs,
        images: imagesLink,
        user: req.user.id,
    });

    res.status(201).json({
        success: true,
        product
    });
});

// Update Product ---ADMIN
exports.updateProduct = asyncErrorHandler(async (req, res, next) => {

    let product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND, 404));
    }

    if (req.body.images !== undefined) {
        for (let i = 0; i < product.images.length; i++) {
            await cloudinary.v2.uploader.destroy(product.images[i].public_id);
        }

        const imagesLink = await imageUpload(req.body.images, "products");
        req.body.images = imagesLink;
    }

    if (req.body.logo) {
        await cloudinary.v2.uploader.destroy(product.brand.logo.public_id);
        const brandLogo = await imageUpload(req.body.logo, "brands");
        req.body.brand = {
            name: req.body.brandname,
            logo: brandLogo[0]
        }
    }

    let specs = [];
    if (req.body.specifications) {
        req.body.specifications.forEach((s) => {
            specs.push(JSON.parse(s))
        });
        req.body.specifications = specs;
    }

    req.body.user = req.user.id;

    product = await Product.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(201).json({
        success: true,
        product
    });
});

// Delete Product ---ADMIN
exports.deleteProduct = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.params.id);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND, 404));
    }

    for (let i = 0; i < product.images.length; i++) {
        await cloudinary.v2.uploader.destroy(product.images[i].public_id);
    }

    await product.remove();

    res.status(201).json({
        success: true
    });
});

// Create OR Update Reviews
exports.createProductReview = asyncErrorHandler(async (req, res, next) => {

    const { rating, comment, productId } = req.body;

    const review = {
        user: req.user._id,
        name: req.user.name,
        rating: Number(rating),
        comment,
    }

    const product = await Product.findById(productId);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND, 404));
    }

    const isReviewed = product.reviews.find(review => review.user.toString() === req.user._id.toString());

    if (isReviewed) {

        product.reviews.forEach((rev) => { 
            if (rev.user.toString() === req.user._id.toString())
                (rev.rating = rating, rev.comment = comment);
        });
    } else {
        product.reviews.push(review);
        product.numOfReviews = product.reviews.length;
    }

    let avg = 0;

    product.reviews.forEach((rev) => {
        avg += rev.rating;
    });

    product.ratings = avg / product.reviews.length;

    await product.save({ validateBeforeSave: false });

    res.status(200).json({
        success: true
    });
});

// Get All Reviews of Product
exports.getProductReviews = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.id);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND, 404));
    }

    res.status(200).json({
        success: true,
        reviews: product.reviews
    });
});

// Delete Reveiws
exports.deleteReview = asyncErrorHandler(async (req, res, next) => {

    const product = await Product.findById(req.query.productId);

    if (!product) {
        return next(new ErrorHandler(PRODUCT_NOT_FOUND, 404));
    }

    const reviews = product.reviews.filter((rev) => rev._id.toString() !== req.query.id.toString());

    let avg = 0;

    reviews.forEach((rev) => {
        avg += rev.rating;
    });

    let ratings = 0;

    if (reviews.length === 0) {
        ratings = 0;
    } else {
        ratings = avg / reviews.length;
    }

    const numOfReviews = reviews.length;

    await Product.findByIdAndUpdate(req.query.productId, {
        reviews,
        ratings: Number(ratings),
        numOfReviews,
    }, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
    });
});

// Get all categories
exports.getProductCategories = asyncErrorHandler(async (req, res, next) => {
    const categories = await Category.find();

    res.status(200).json({
        success: true,
        categories,
    });
});