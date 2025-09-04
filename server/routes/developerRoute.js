
const express = require('express');
const {
    getAllDevelopers,
    createDeveloper,
    getDeveloperDetails,
    updateDeveloper,
    deleteDeveloper,
} = require('../controllers/developerController');
const { isAuthenticatedUser, authorizeRoles } = require('../middlewares/user_actions/auth');

const router = express.Router();

router.route('/developers').get(getAllDevelopers);

router
    .route('/admin/developer/new')
    .post(isAuthenticatedUser, authorizeRoles('admin'), createDeveloper);

router
    .route('/admin/developer/:id')
    .get(isAuthenticatedUser, authorizeRoles('admin'), getDeveloperDetails)
    .put(isAuthenticatedUser, authorizeRoles('admin'), updateDeveloper)
    .delete(isAuthenticatedUser, authorizeRoles('admin'), deleteDeveloper);

module.exports = router;
