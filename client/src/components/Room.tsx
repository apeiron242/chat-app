import React, { useEffect, useRef, useState } from "react";
import queryString from "querystring";
import io from "socket.io-client";
import { v4 as uuidv4 } from "uuid";
import Axios from "axios";

interface Chat {
  username: string;
  text: string;
  time: string;
}

interface propTypes {
  url: string;
  socketUrl: string;
}

function Room({ url, socketUrl }: propTypes) {
  const [chat, setChat] = useState<any>([]);
  const [newChat, setNewChat] = useState<string>("");
  const ENDPOINT: string = socketUrl;
  const { room, username } = queryString.parse(window.location.search);
  const inputValue: any = useRef(null);
  const chatScroll: any = useRef(null);

  let socket: any;

  const checkUser = (user: string): string => {
    const botUsernameStyle: string =
      "text-sm bg-blue-500 text-white px-3 py-2 break-all ml-2 font-bold";
    const myUsernameStyle: string =
      "text-sm bg-green-600 text-white px-3 py-2 break-all ml-2 font-bold";
    const usernameStyle: string =
      "text-sm bg-red-200 text-blue-700 px-3 py-2 break-all ml-2 font-bold";

    if (user === "Chat Bot") {
      return botUsernameStyle;
    } else if (user === username) {
      return myUsernameStyle;
    } else {
      return usernameStyle;
    }
  };

  const post = (): void => {
    socket = io.connect(socketUrl, { secure: true });
    socket.emit("sendChat", { room, username, newChat });
    inputValue.current.value = "";
    inputValue.current.focus();
  };

  useEffect(() => {
    socket = io.connect(socketUrl, { secure: true });
    socket.on("message", (msg: Chat) => {
      setChat((chat: any) => [...chat, msg]);
      chatScroll.current.scrollTo(0, chatScroll.current.scrollHeight);
    });
  }, []);

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("joinRoom", { room, username });
    window.scrollTo(0, document.body.scrollHeight);
    Axios.get(`${url}/getchat/${room}`).then((res) => {
      setChat(res.data);
    });
  }, []);
  return (
    <div className="flex flex-col items-center bg-blue-600 h-screen text-gray-100">
      <h1 className="p-4 text-xl text-gray-200 font-bold">{room}</h1>
      <input
        type="text"
        className="border-2 border-black text-black px-1 mb-2"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setNewChat(e.target.value)
        }
        onKeyPress={(e) => {
          if (e.key === "Enter") {
            post();
          }
        }}
        ref={inputValue}
      />
      <button onClick={post} className="bg-red-500 px-6 py-1 mt-2 text-xl">
        ➡
      </button>
      <div className="overflow-scroll my-4 px-4 md:w-2/5" ref={chatScroll}>
        {chat
          ? chat.map((elem: any) => {
              return (
                <div className="mb-3">
                  <div
                    className="flex flex-row justify-between items-center flex-wrap bg-gray-600 p-2 border-2 border-black m-1"
                    key={uuidv4()}
                  >
                    <h1 className={checkUser(elem.username)}>
                      {elem.username}
                    </h1>
                    <h1 className="bg-yellow-300 px-2 py-1 break-all mr-2 w-2/4 text-black">
                      {elem.text}
                    </h1>
                  </div>
                  <h3 className="text-sm text-right">{elem.time}</h3>
                </div>
              );
            })
          : null}
      </div>
    </div>
  );
}

export default Room;
