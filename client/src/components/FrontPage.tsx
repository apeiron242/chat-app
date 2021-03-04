import React, { useState } from "react";
import { Link } from "react-router-dom";

interface propTypes {
  url: string;
}

function FrontPage({ url }: propTypes) {
  const [username, setUsername] = useState<string>("");
  const [room, setRoom] = useState<string>("");

  return (
    <div className="flex flex-col justify-center items-center w-full bg-blue-600 h-screen text-gray-100">
      <h1>Chat App</h1>
      <div className="flex flex-col justify-center items-center border-2 border-black p-2 m-4 w-3/4">
        <h1>Join Chat</h1>
        <div className="flex justify-evenly items-center w-full my-2">
          <h3 className="w-2/5 md:w-1/4 text-center">Username</h3>
          <h3 className="w-2/5 md:w-1/4 text-center">Room Name</h3>
        </div>
        <div className="flex justify-evenly items-center w-full my-2">
          <input
            type="text"
            className="rounded-3xl text-black p-1 w-2/5 md:w-1/4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(e.target.value)
            }
          />
          <input
            type="text"
            className="rounded-3xl text-black p-1 w-2/5 md:w-1/4"
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setRoom(e.target.value)
            }
          />
        </div>
        <Link to={`/chat?&username=${username}&room=${room}`}>
          <button className="rounded-2xl p-1 px-2 bg-green-600 m-2">
            Submit
          </button>
        </Link>
      </div>
    </div>
  );
}

export default FrontPage;
