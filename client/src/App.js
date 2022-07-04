import { useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

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
    socket.current = io("http://localhost:3001");
  }, []);

  useEffect(() => {
    socket.current.on("receive_message", (data) => {
      console.log("message received: ", data);
      setChat([...chat, data]);
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

    console.log("🚀 ~ file: App.js ~ line 37 ~ onChatHandler ~ data", data)
    socket.current.emit("send_message", data);
    setChat([...chat, data]);
    setMessage("");
  };

  return (
    <div className="w-screen h-screen bg-gray-50 flex justify-center items-center">
      <div className="bg-white p-7 shadow-lg rounded">
        <h1 className="text-4xl font-bold mb-5 text-center">
          Welcome to the chat app
        </h1>
        {!login ? (
          <form onSubmit={onSubmitHandler} className="space-x-3">
            <input
              type="text"
              placeholder="Enter your username"
              className="border-2 focus:outline-2 focus:outline-red-500 p-2 rounded"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
            <input
              type="number"
              placeholder="Enter your room"
              className="border-2 focus:outline-2 focus:outline-red-500 p-2 rounded"
              required
              onChange={(e) => setRoom(e.target.value)}
            />
            <input
              type="submit"
              className="bg-red-500 text-white py-2 px-6 rounded cursor-pointer"
            />
          </form>
        ) : (
          <div className="border-2 rounded mt-5">
            <div className="h-96 overflow-y-auto">
              {chat.length > 0 &&
                chat.map((item) => (
                  <div
                    key={Math.random()}
                    className={[
                      "flex flex-col my-2",
                      item.username === username
                        ? "items-end"
                        : "items-start",
                    ].join(" ")}
                  >
                    <p
                      className={[
                        "min-w-[150px] p-2 text-white rounded",
                        item.username === username
                          ? "bg-green-500 text-right mr-3"
                          : "bg-blue-500 ml-3",
                      ].join(" ")}
                    >
                      {item.message}
                    </p>
                    <p className={['text-xs',
                        item.username === username
                          ? "text-right mr-5"
                          : "text-left ml-5",
                      ].join(" ")}>
                      {new Date(item.date).toLocaleString("en-AU", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                        hour: "2-digit",
                        minute: "2-digit",
                      })} , {item.username === username ? 'you' : item.username}
                    </p>
                  </div>
                ))}
            </div>
            <form onSubmit={onChatHandler} className="w-full border-t-2">
              <input
                type="text"
                placeholder="Enter your message"
                className="w-4/5 focus:outline-none p-2 rounded"
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              />
              <input
                type="submit"
								className="w-1/5 bg-red-500 text-white py-2 rounded cursor-pointer"
								autoFocus
              />
            </form>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
