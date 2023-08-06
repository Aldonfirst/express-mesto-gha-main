const router = require('express').Router();
const { authMiddleware } = require('../middlewares/auth');
const {
  getUsers, getUserById, updateUser, updateAvatar, getUserInfo,
} = require('../controllers/users');

router.get('/me', authMiddleware, getUserInfo);
router.get('/', authMiddleware, getUsers);
router.get('/:userId', authMiddleware, getUserById);

router.patch('/me', authMiddleware, updateUser);
router.patch('/me/avatar', authMiddleware, updateAvatar);

module.exports = router;
