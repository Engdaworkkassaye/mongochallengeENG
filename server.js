// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

mongoose.connect('mongodb://localhost/socialmedia', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const User = require('./models/User');
const Thought = require('./models/Thought');


 app.use('/api/users', require('./routes/userRoutes'));

 app.use('/api/thoughts', require('./routes/thoughtRoutes'));

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
