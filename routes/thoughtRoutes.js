const express = require('express');
const router = express.Router();
const { 
  getAllThoughts, 
  createThought, 
  getThoughtById, 
  updateThought, 
  deleteThought, 
  addReaction,
  deleteReaction
 
} = require('../controllers/thoughtController');

router.get('/', getAllThoughts);

router.post('/', createThought);

router.get('/:thoughtId', getThoughtById);

router.put('/:thoughtId', updateThought);

router.delete('/:thoughtId', deleteThought);

router.post('/:thoughtId/reactions', addReaction);

router.delete('/:thoughtId/reactions', deleteReaction);

module.exports = router;
