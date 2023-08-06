const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');
const {
  validateUpdateProfile, validateUpdateAvatar,
} = require('../middlewares/validateCelebrate');

router.get('/me', getUserInfo);
router.get('/', getUsers);
router.get('/:userId', getUserById);

router.patch('/me', authMiddleware, validateUpdateProfile, updateUser);
router.patch('/me/avatar', authMiddleware, validateUpdateAvatar, updateAvatar);

module.exports = router;
