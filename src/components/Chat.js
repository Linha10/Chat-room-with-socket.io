import React, { useState , useEffect} from "react";
import ScrollToBottom from "react-scroll-to-bottom";

const Chat = ({ socket, userName, room }) => {
  const [currMesg, setCurrMesg] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currMesg !== "") {
      const messageData = {
        room: room,
        author: userName,
        message: currMesg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrMesg("");
    }
  };
  
  useEffect(() => {
    socket.on("receive_message", (data) => {
        setMessageList((arr) => [...arr, data]);
    });
  }, [socket]);

  // useEffect(()=>{
  //   console.log('second useEffect')
  // },[socket])

  return (
    <div className="chatRoom">
      <div className="chatWindow">
        <div className="chat-header">
          <span>Live Chat</span>
        </div>
        <div className="chat-body">
          <ScrollToBottom className="chatTextArea">
            {messageList.map((item) => {
              return (
                //比對id套用css
                <div
                  className="message"
                  id={userName === item.author ? "you" : "other"}
                >
                  <div id='oneMessage'>
                    <div className="userMessage">
                      {item.message}
                    </div>
                    <div id="userData">
                      <span id="author">{item.author}</span>-
                      <span id="time">{item.time}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </ScrollToBottom>
        </div>
        <div className="chat-footer">
          <input
            type="text"
            value={currMesg}
            placeholder="說點什麼"
            onChange={(e) => {
              setCurrMesg(e.target.value);
            }}
            //綁定enter發送訊息
            onKeyPress={(e) => {
              e.key === "Enter" && sendMessage();
            }}
          />
          <button className="sendMesg" onClick={sendMessage}>送出</button>
        </div>
      </div>
    </div>
  );
};

export default Chat;