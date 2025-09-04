
const express = require('express');
const { getAboutUs, getDevelopers, getPartners, getProperties, getJoin } = require('../controllers/pageController');

const router = express.Router();

router.route('/aboutus').get(getAboutUs);
router.route('/developers').get(getDevelopers);
router.route('/partners').get(getPartners);
router.route('/properties').get(getProperties);
router.route('/join').get(getJoin);

module.exports = router;
