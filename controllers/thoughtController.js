const Thought = require('../models/Thought');
const Reaction = require('../models/Reaction'); 
const User = require('../models/User')

exports.getAllThoughts = async (req, res) => {
  try {
    const thoughts = await Thought.find().populate('reactions');
    res.json(thoughts);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


exports.createThought = async (req, res) => {
    try {
      const { username, thoughtText } = req.body;
  
      const thought = await Thought.create({ username, thoughtText });
  
      const user = await User.findOneAndUpdate(
        { username },
        { $push: { thoughts: thought._id } },
        { new: true }
      );
  
      res.json(thought);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  };
  

exports.getThoughtById = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId).populate('reactions');
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


exports.updateThought = async (req, res) => {
  try {
    const updatedThought = await Thought.findByIdAndUpdate(req.params.thoughtId, req.body, { new: true });
    if (!updatedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json(updatedThought);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

exports.deleteThought = async (req, res) => {
  try {
    const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
    if (!deletedThought) {
      return res.status(404).json({ message: 'Thought not found' });
    }
    res.json({ message: 'Thought deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.addReaction = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
  
      const newReaction = new Reaction({
        username: req.body.username,
        reactionBody: req.body.reactionBody
      });
  
      const savedReaction = await newReaction.save();
  
      thought.reactions.push(savedReaction._id);
  
      await thought.save();
  
      res.json(thought);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  };
  
  exports.deleteReaction = async (req, res) => {
    try {
      const thought = await Thought.findById(req.params.thoughtId);
      if (!thought) {
        return res.status(404).json({ message: 'Thought not found' });
      }
      thought.reactions.pull({ _id: req.body.reactionId });
      await thought.save();
      res.json(thought);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };


