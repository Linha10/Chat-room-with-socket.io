import React, { useState } from 'react';
import io from 'socket.io-client';
import Chat from './Chat';
// import './myStyling.scss';

const socket = io.connect('http://localhost:3001');

const ChatRoom = () => {
    const [userName, setUserName] = useState('');
    const [room, setRoom] = useState('');
    const [showRoom ,setShowRoom] = useState(false);

    const joinRoom = () => {
        if (userName !== '' && room !== '') {
            //傳房號至後端的join_room
            socket.emit('join_room', room);
            setShowRoom(true);
        }
    }

    return (
        <div>
           {!showRoom? 
           <div className='talkContainer'>
            <h2>試作聊天室</h2>
            <div className='btns'>
            <input type='text' placeholder='使用者名稱... 例:欸比' className='inputName'
                onChange={(name) => { setUserName(name.target.value) }} />
            <input type='text' placeholder='輸入房號... 例:123' className='inputRoom'
                onChange={(roomNum) => { setRoom(roomNum.target.value) }} />
            <button onClick={joinRoom} className='checkIn'>加入聊天室</button>
            </div>
            </div>:
            <Chat socket={socket} userName={userName} room={room}/>}
        </div>
    )
}

export default ChatRoom;
