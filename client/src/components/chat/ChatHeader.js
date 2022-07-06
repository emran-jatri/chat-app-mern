const ChatHeader = (props) => {
  const { room, username, rooms} = props;
  return (
    <div className="flex justify-between items-center bg-[#F0F2F5] px-5 py-2">
      <div className="flex justify-center items-center space-x-3">
        <div
          className="flex justify-center items-center w-[50px] h-[50px] rounded-full bg-red-500 text-4xl font-bold text-white"
        >
          <p>{username[0].toUpperCase()}</p>
        </div>
        <div>
          <h1>Room Name: {room}</h1>
					<h1 className="text-[#927781]">{Object.keys(rooms).length > 0 && rooms[room].join(', ')}</h1>
        </div>
      </div>

      {/* 2nd side */}
      <div className="flex space-x-3">
        <div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
            fill="#927781"
          >
            <path fill="none" d="M0 0h24v24H0z" />
            <path d="M18.031 16.617l4.283 4.282-1.415 1.415-4.282-4.283A8.96 8.96 0 0 1 11 20c-4.968 0-9-4.032-9-9s4.032-9 9-9 9 4.032 9 9a8.96 8.96 0 0 1-1.969 5.617zm-2.006-.742A6.977 6.977 0 0 0 18 11c0-3.868-3.133-7-7-7-3.868 0-7 3.132-7 7 0 3.867 3.132 7 7 7a6.977 6.977 0 0 0 4.875-1.975l.15-.15z" />
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
            <path d="M18 18v2H6v-2h12zm3-7v2H3v-2h18zm-3-7v2H6V4h12z" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
