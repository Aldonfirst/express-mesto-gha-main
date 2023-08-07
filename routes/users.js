const router = require('express').Router();

const {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

const {
  validateUpdateProfile, validateUpdateAvatar, validateUserId,
} = require('../middlewares/validateCelebrate');

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:userId', validateUserId, getUserById);

router.patch('/me', validateUpdateProfile, updateUser);
router.patch('/me/avatar', validateUpdateAvatar, updateAvatar);

module.exports = router;
