
const cloudinary = require('cloudinary');

const imageUpload = async (images, folder) => {
    const imagesLink = [];

    if (typeof images === "string") {
        const result = await cloudinary.v2.uploader.upload(images, {
            folder,
        });
        imagesLink.push({
            public_id: result.public_id,
            url: result.secure_url,
        });
    } else {
        for (let i = 0; i < images.length; i++) {
            const result = await cloudinary.v2.uploader.upload(images[i], {
                folder,
            });

            imagesLink.push({
                public_id: result.public_id,
                url: result.secure_url,
            });
        }
    }

    return imagesLink;
};

module.exports = imageUpload;
