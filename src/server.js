require('dotenv').config();

const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const path = require('path');
const cors = require('cors');
const app = express();

app.use(cors());

const server = require('http').Server(app);
const io = require('socket.io')(server);

io.on('connection', socket => {
  socket.on('connectRoom', item => {
    socket.join(item);
  });
});

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true
});

app.use((req, res, next) => {
  req.io = io;
  return next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/files', express.static(path.resolve(__dirname, '..', 'tmp')));
app.use(routes);

server.listen(process.env.PORT || 3000);
