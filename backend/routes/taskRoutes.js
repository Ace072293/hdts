
const express = require('express');
const { getTasks } = require('../controllers/taskController');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/tasks', getTasks);
// router.post('/login', loginUser);
// router.get('/profile', protect, getProfile);
// router.put('/profile', protect, updateUserProfile);

module.exports = router;
