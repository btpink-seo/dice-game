require('dotenv').config();
const app = require('express')();
const bodyParser = require('body-parser');
const http = require('http');
const server = http.Server(app);
const socketServer = http.Server(app);
const io = require('socket.io')(socketServer);
const port = process.env.PORT || 3000;
const socketPort = process.env.SOCKET_PORT || 3001;
const api = require('./routes/api');
const mongoose = require('mongoose');
const Message = require('./models/Message');
const commonFnc = require('./socketFunctions/common');
const waitFnc = require('./socketFunctions/wait');
const playingFnc = require('./socketFunctions/playing');
const endFnc = require('./socketFunctions/end');
const Player = require('./models/Player');
const Room = require('./models/Room');

// ==================== DB ====================
const username = process.env.MONGO_INITDB_ROOT_USERNAME
const pwd = process.env.MONGO_INITDB_ROOT_PASSWORD

const options = {
	useUnifiedTopology : true,
  useNewUrlParser : true,
  useFindAndModify: false
}

mongoose.connect(`mongodb://${username}:${pwd}@db/dice_db?authSource=admin`, options);

const db = mongoose.connection;

db.on('error', console.error.bind(console, 'DB connection error:'));
db.once('open', () => console.log('DB connection successful'));

// ==================== Server ====================
app.use(bodyParser.json());
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*'); // 편의상 *로 했지만 보안상 문제 있음
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});
app.use('/api', api);

server.listen(port, async () => {
  console.log(`started on port: ${port}`);
  if(process.env.NODE_ENV === 'production') {
    await Room.deleteMany({})
    await Player.deleteMany({})
    await Message.deleteMany({})
  }
});

socketServer.listen(socketPort, () => {
  console.log(`started on port: ${socketPort}`);
});

// ==================== socket connect ====================
io.of('/dice-map-room').on('connection', (socket) => {
  console.log(`[${new Date().toISOString()}]: user socket connected`);

  socket.on('join-room', async (player) => {
    try {
      await waitFnc.joinRoom(io, socket, player)
    } catch (e) {
      console.error(`error: ${e}`);
    } finally {
      commonFnc.refreshRooms(socket)
    }
  });

  socket.on('shuffle-map', async (shuffledRoom) => {
    try {
      await waitFnc.shuffleMap(io, shuffledRoom)
    } catch (e) {
      console.error(`error: ${e}`);
    }
  });

  socket.on('select-piece', async (player) => {
    try {
      await waitFnc.selectPiece(io, player)
    } catch (e) {
      console.error(`error: ${e}`);
    }
  });

  socket.on('game-start', async (room) => {
    try {
      await waitFnc.gameStart(io, socket, room)
    } catch (e) {
      console.error(`error: ${e}`);
    } finally {
      commonFnc.refreshRooms(socket)
    }
  });

  socket.on('change-turn', async (value) => {
    try {
      await playingFnc.changeTurn(io, socket, value)
    } catch (e) {
      console.error(`error: ${e}`);
    }
  });

  socket.on('catch-player', async (player) => {
    try {
      await playingFnc.catchPlayer(io, player)
    } catch (e) {
      console.error(`error: ${e}`);
    }
  });

  socket.on('end-game', async (value) => {
    try {
      console.log(`[${new Date()}]: end-game`);
      const player = value.player;
      const room = value.room;

      // DB room 갱신
      await Room.updateOne({ _id: room._id }, { $set: room });
      await Player.updateOne({ _id: player._id }, { $set: player });

      broadcastRoomWithoutMe(socket, room._id);
      broadcastSystemMessage(player._roomId, 'success', 'gameEndMessage');
    } catch (e) {
      console.error(`error: ${e}`);
    }
  });

  socket.on('replay', async (value) => {
    try {
      console.log(`[${new Date()}]: replay`);
      const room = value.room;

      await Room.updateOne({ _id: room._id }, { $set: room });
      await Player.updateMany({ _roomId: room._id }, { $set: {
        coordinates: null,
        initialCoordinates: null,
        cards: [],
        piece: {icon: []},
        life: 3,
        killedPlayer: 0
      }});
      broadcastRoom(room._id)
    } catch (e) {
      console.error(`error: ${e}`);
    }
  });

  socket.on('leave', async (player) => {
    try {
      await endFnc.leave(io, player)
    } catch (e) {
      console.error(`error: ${e}`);
    } finally {
      // 웹소켓 룸에서 나옴
      socket.leave(`room-${player._roomId}`);
      commonFnc.refreshRooms(socket)
      // socket.disconnect(true);
    }
  });

  socket.on('send-message', async (message) => {
    try {
      await commonFnc.sendMessage(io, message)
    } catch (e) {
      console.error(`error: ${e}`);
    }
  });

  socket.on('disconnect', () => {
    console.log(`[${new Date().toISOString()}]: user socket disconnected`);
  });

  socket.on('error', () => {
    console.log(`[${new Date().toISOString()}]: error`);
  });
});
