import { useStateValue } from "../contexts/context";
import { SocketService } from "../services";
import { useEffect, useState, useReducer } from "react";
import { actionTypes } from "..";
import { generate } from "random-words";
import { labelCases } from "../utils";

export const useLiveChat = () => {
  const [{ token }, dispatch] = useStateValue();
  const [message, setMessage] = useState("");
  const [rooms, setRooms]: any = useState([]);
  const [chat, setChat]: any = useState([]);
  const [currentRoom, setCurrentRoom]: any = useState(null);
  const kind = token ? "host" : "guest";
  const alias: any = generate({ minLength: 5 });

  const register = () => {
    SocketService.sendMessage({
      core: {
        register: [
          {
            id: SocketService.id,
            alias: labelCases(alias).CS,
            kind,
          },
        ],
      },
    });
    if (token) {
      SocketService.sendMessage({ core: { isOnline: [Boolean(token)] } });
    }
  };

  useEffect(() => {
    register();
    SocketService.onConnectionEvent = () => {
      register();
    };
  }, [token]);

  useEffect(() => {
    if (rooms.length > 0) setCurrentRoom(rooms[0]);
  }, [rooms]);

  useEffect(() => {
    SocketService.receiveMessage({
      core: { message: async (_message: any) => console.log({ _message }) },
    });
    SocketService.receiveMessage({
      core: {
        isOnline: ({ isOnline }: any) => {
          dispatch({ type: actionTypes.setIsOnline, payload: isOnline });
        },
      },
    });
    SocketService.receiveMessage({
      core: {
        rooms: (rooms: any) => {
          setRooms(rooms);
        },
      },
    });
  }, []);
  useEffect(() => {
    SocketService.receiveMessage({
      core: {
        response: ({ message, room }: any) => {
          setChat([...chat, { by: "party", message }]);
        },
      },
    });
  }, [chat]);

  const onSubmit = (e: any) => {
    e.preventDefault();
    SocketService.sendMessage({
      core: {
        message: [
          {
            message,
            room: currentRoom,
          },
        ],
      },
    });
    setMessage("");
    setChat([...chat, { by: "self", message }]);
  };
  return {
    onSubmit,
    message,
    setMessage,
    rooms,
    currentRoom,
    setCurrentRoom,
    chat,
  };
};
