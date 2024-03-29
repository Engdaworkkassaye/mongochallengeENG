const mongoose = require('mongoose');

const thoughtSchema = new mongoose.Schema({
  thoughtText: { type: String, required: true, maxlength: 280 },
  createdAt: { type: Date, default: Date.now },
  username: { type: String, required: true },
  reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Reaction' }]
}, { toJSON: { virtuals: true }, toObject: { virtuals: true } });

thoughtSchema.virtual('reactionCount').get(function() {
  return this.reactions.length;
});

module.exports = mongoose.model('Thought', thoughtSchema);
