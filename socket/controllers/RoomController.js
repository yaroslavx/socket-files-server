import Room from '../../models/Rooms.js';
import BaseController from './BaseController.js';

export default class RoomController extends BaseController {
  joinRoom = ({ roomId }) => {
    this.socket.join(roomId);
  };

  newRoomCreated = ({ roomId, userId }) => {
    const room = new Room({
      name: 'test',
      roomId,
    });
    room.save();
    this.socket.broadcast.emit('new-room-created', { room });
  };

  roomRemoved = async ({ roomId }) => {
    await Room.deleteOne({ roomId });
    this.socket.broadcast.emit('room-removed', { roomId });
  };
}
