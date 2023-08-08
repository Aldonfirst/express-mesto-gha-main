const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

const {
  validateUpdateProfile, validateUpdateAvatar, validateUserId,
} = require('../middlewares/validateCelebrate');

router.get('/users/me', getUserInfo);
router.get('/users', getUsers);
router.get('/users/:userId', validateUserId, getUserById);
router.patch('/users/me', validateUpdateProfile, updateUser);
router.patch('/users/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
