const express = require('express');
const router = express.Router();
const { 
  getAllUsers, 
  createUser, 
  getUserById, 
  updateUser, 
  deleteUser, 
 
} = require('../controllers/userController');

router.get('/', getAllUsers);

router.post('/', createUser);

router.get('/:userId', getUserById);

router.put('/:userId', updateUser);

router.delete('/:userId', deleteUser);



module.exports = router;
