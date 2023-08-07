// export function socket(socketIo:any){
//   // WebSocket event handler
//   socketIo.on('connection', (socket) => {
//     // This function is executed whenever a new client connects to the WebSocket server
//     console.log('Client connected:', socket.id);

//     // Handle disconnection 
//     socket.on('disconnect', () => {
//       console.log('Client disconnected:', socket.id);
//     });
//     // Handle 'notification' event
//     socket.on('notification', (data) => {
//       // Get the users from the data received
//       const users: any = data.users;

//       // Emit the notification event to the relevant users
//       users.forEach((user) => {
//         socket.to(user.id).emit('newNotification', 'You received a new note!');
//       });
//     });
//   });
// }