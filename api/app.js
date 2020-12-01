require('dotenv/config');
const bodyParser = require('body-parser');
const Category = require('./routes/categories');
const Config = require('./routes/config');
const cors = require('cors');
const Courses = require('./routes/courses');
const Email = require('./routes/email');
const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const path = require('path');
const Products = require('./routes/product');
const PromoCodes = require('./routes/promocodes');
const socketio = require('socket.io');
const Subscribers = require('./routes/subscribers');
const Transactions = require('./routes/transaction');
const Users = require('./routes/users');
const Design = require('./routes/design');
const Filter = require('./routes/filters');
const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom
} = require('./routes/livechat/users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors({ credentials: true, origin: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// socket io
io.on('connect', (socket) => {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });
    console.log(socket.id);

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit('message', {
      user: 'Axions-Bot',
      text: `${user.name}, καλός ήρθες στο δωμάτιο ${user.room}.`
    });
    socket.broadcast
      .to(user.room)
      .emit('message', { user: 'Axions-Bot', text: `${user.name} συνδέθηκε!` });

    io.to(user.room).emit('roomData', {
      room: user.room,
      users: getUsersInRoom(user.room)
    });
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);

    io.to(user.room).emit('message', { user: user.name, text: message });
  });

  socket.on('disconnect', () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} έφυγε.` });
      io.to(user.room).emit('roomData', {
        room: user.room,
        users: getUsersInRoom(user.room)
      });
    }
  });
});

//  Mongoose Connection
mongoose.Promise = global.Promise;
mongoose
  .connect('mongodb://localhost:27017/axions', {
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true,
    useFindAndModify: false
  })
  .then(() => {
    console.log('Connection to database has been succesfully established...');
  })
  .catch((err) => {
    console.log(`There was an error ${err}`);
  });

//  routes
app.use('/categories', Category);
app.use('/config', Config);
app.use('/courses', Courses);
app.use('/design', Design);
app.use('/email', Email);
app.use('/filters', Filter);
app.use('/products', Products);
app.use('/promoCodes', PromoCodes);
app.use('/subscribers', Subscribers);
app.use('/transaction', Transactions);
app.use('/users', Users);

app.use(express.static(path.join(__dirname, 'public')));

if (process.env.NODE_ENV !== 'production') {
  process.on('uncaughtException', (err) => {
    console.error('FATAL: Uncaught exception.');
    console.error(err.stack || err);
  });
}

server.listen(4005, () => {
  console.log('Express server started on port:', server.address().port);
});

module.exports = app;
