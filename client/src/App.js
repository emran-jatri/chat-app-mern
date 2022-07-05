import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";
import ChatHeader from "./components/chat/ChatHeader";
import ScrollToBottom from 'react-scroll-to-bottom';

function App() {
  //implement socket
  const socket = useRef();

  // states
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    socket.current = io("http://192.168.10.176:3001");
  }, []);

  useEffect(() => {
    socket.current.on("receive_message", (data) => {
      console.log("message received: ", data);
      setChat(data);
    });
  }, [chat]);

  const onSubmitHandler = (e) => {
    e.preventDefault();
    console.log("-------->", username, room);
    socket.current.emit("join_room", { username, room });
    setLogin(true);
  };

  const onChatHandler = (e) => {
    e.preventDefault();
    const data = { username, room, message, date: new Date() };

    console.log("🚀 ~ file: App.js ~ line 37 ~ onChatHandler ~ data", data);
    socket.current.emit("send_message", data);
    setChat([...chat, data]);
    setMessage("");
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
      {!login ? (
        <div className="bg-white shadow-lg rounded">
          <div className="p-7">
            <h1 className="mb-7 text-2xl">Join The Chat App</h1>
            <form
              onSubmit={onSubmitHandler}
              className="flex flex-col space-y-3 md:block md:space-x-3"
            >
              <input
                type="text"
                placeholder="Enter your username"
                className="block md:inline border-2 focus:outline-2 focus:outline-red-500 p-2 rounded"
                required
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                type="number"
                placeholder="Enter your room"
                className="block md:inline border-2 focus:outline-2 focus:outline-red-500 p-2 rounded"
                required
                onChange={(e) => setRoom(e.target.value)}
              />
              <input
                type="submit"
                className="block md:inline bg-red-500 text-white py-2 px-6 rounded cursor-pointer"
              />
            </form>
          </div>
        </div>
      ) : (
        <div className="w-3/5 h-4/5 bg-[#EFEAE2] shadow-lg rounded">
          <ChatHeader room={room} username={username}/>
          <div className="rounded">
            <ScrollToBottom className="h-[658px]">
              {chat.length > 0 &&
                chat.map((item) => (
                  <div
                    key={Math.random()}
                    className={[
                      "flex flex-col my-3",
                      item.username === username ? "items-end" : "items-start",
                    ].join(" ")}
                  >
                    <div
                      className={[
                        "min-w-[250px] p-2 rounded shadow relative before:w-2 before:h-2  before:absolute before:-top-1 before:rotate-45",
                        item.username === username
                          ? "bg-[#D9FDD3] mr-3 before:bg-[#D9FDD3] before:right-2"
                          : "bg-white ml-3 before:bg-white before:left-2",
                      ].join(" ")}
										>
											<p className={"text-blue-500 font-bold"}>{ item.username !== username ? item.username[0].toUpperCase() + item.username.slice(1): ""}</p>
                      <p>{item.message}</p>
                      <p className={["text-[9px] text-right text-[#927781]"].join(" ")}>
                        {new Date(item.date)
                          .toLocaleString("en-US", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })
                          .toUpperCase()}
                      </p>
                    </div>
                  </div>
                ))}
            </ScrollToBottom>
            <form
              onSubmit={onChatHandler}
              className="w-full flex items-center bg-[#F0F2F5] px-5 py-2 space-x-3"
            >
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#927781"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16zm-4-7h8a4 4 0 1 1-8 0zm0-2a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3zm8 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z" />
                </svg>
              </div>
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#927781"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M1 14.5a6.496 6.496 0 0 1 3.064-5.519 8.001 8.001 0 0 1 15.872 0 6.5 6.5 0 0 1-2.936 12L7 21c-3.356-.274-6-3.078-6-6.5zm15.848 4.487a4.5 4.5 0 0 0 2.03-8.309l-.807-.503-.12-.942a6.001 6.001 0 0 0-11.903 0l-.12.942-.805.503a4.5 4.5 0 0 0 2.029 8.309l.173.013h9.35l.173-.013zM13 13v4h-2v-4H8l4-5 4 5h-3z" />
                </svg>
              </div>
              <input
                type="text"
                placeholder="Type a message"
                className="w-full focus:outline-none p-2 rounded"
                required
                value={message}
                autoFocus
                onChange={(e) => setMessage(e.target.value)}
              />
              <div>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  fill="#927781"
                >
                  <path fill="none" d="M0 0h24v24H0z" />
                  <path d="M12 3a3 3 0 0 0-3 3v4a3 3 0 0 0 6 0V6a3 3 0 0 0-3-3zm0-2a5 5 0 0 1 5 5v4a5 5 0 0 1-10 0V6a5 5 0 0 1 5-5zM3.055 11H5.07a7.002 7.002 0 0 0 13.858 0h2.016A9.004 9.004 0 0 1 13 18.945V23h-2v-4.055A9.004 9.004 0 0 1 3.055 11z" />
                </svg>
              </div>
              {/* <input
                type="submit"
                className="w-1/5 bg-red-500 text-white py-2 rounded cursor-pointer"
              /> */}
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
