import { WebSocket, WebSocketServer } from "ws";
let roomId: number = 0;
const wss = new WebSocketServer({ port: 8000 });
interface User {
    socket: WebSocket,
    name: string
}

interface room {
    roomId: number,
    user1: User,
    user2: User
}

let queue: User[] = []

let room: room[] = []

wss.on('connection', (socket: WebSocket) => {
    try {
        socket.on('message', (data: string) => {
            console.log("USER_CONNECTED");
            const message = JSON.parse(data);
            if (message.type === 'JOIN') {
    
                queue.push({
                    socket,
                    name: message.name
                })
    
                if (queue.length >= 2) {
                    let user1 = queue.shift();
                    let user2 = queue.shift();
                    if (user1 && user2) {
                        const newRoom = {
                            roomId: roomId++,
                            user1: user1,
                            user2: user2
                        }
                        room.push(newRoom);
    
                        const roomInfo = JSON.stringify({ type: "ROOM_JOINED", roomId: newRoom.roomId, peer: user2?.name })
                        user1?.socket.send(roomInfo);
                        user2?.socket.send(JSON.stringify({ type: "ROOM_JOINED", roomId: newRoom.roomId, peer: user1?.name }))
                    }
                }
    
            }
            else if (message.type === 'MESSAGE') {
                const roomId = message.roomId
                const senderName = message.name
                const data = message.data
                const roomData = room.find(u => u.roomId === roomId);
                if (!roomData) return;
                const reciever = roomData.user1?.name === senderName ? roomData.user2 : roomData.user1;
                reciever?.socket.send(JSON.stringify({
                    type: "MESSAGE",
                    from: senderName,
                    data: data
    
                }))
            }
            else if(message.type==='TYPING'){
                const roomData = room.find(u=>u.roomId===message.roomId);
                if(!roomData)return;
                const senderName = message.name;
                const recipent = roomData.user1.name===senderName?roomData.user2: roomData.user1
                recipent.socket.send(JSON.stringify({type: "USER_TYPING" , name: senderName}));
              
    
            }
            else if(message.type ==='FA'){
                wss.clients.forEach((client)=>{
                    if(client.readyState===WebSocket.OPEN){
                        client.send(message.data);
                    }
                })
            }
    
        })
    } catch (error) {
        console.log(error);
    }
    socket.on('close', () => {
        queue = queue.filter(u => u.socket !== socket);
        room = room.filter(u => {
            if (u.user1?.socket === socket || u.user2?.socket === socket) {
                const remainingUser = u.user1?.socket === socket ? u.user2 : u.user1;

                remainingUser?.socket.send(JSON.stringify(
                    { type: "Partner disconnected" }
                ))
                queue.push(remainingUser);
                return false;
            }
            return true;
        })
    })


})