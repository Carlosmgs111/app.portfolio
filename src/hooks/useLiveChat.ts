import { useStateValue } from "../contexts/context";
import { SocketService } from "../services";
import { useEffect, useState } from "react";
import { actionTypes } from "..";
import { generate } from "random-words";
import { labelCases } from "../utils";

export const useLiveChat = () => {
  const [{ token }, dispatch] = useStateValue();
  const [message, setMessage] = useState("");
  const [rooms, setRooms]: any = useState([]);
  const [chats, setChats]: any = useState({});
  const [currentRoom, setCurrentRoom]: any = useState(null);
  const [alias, setAlias] = useState("");
  const kind = token ? "host" : "guest";

  const register = () => {
    SocketService.sendMessage({
      core: {
        register: [
          {
            id: SocketService.id,
            alias: labelCases(
              alias || ((): any => generate({ minLength: 5 }))()
            ).CS,
            kind,
          },
        ],
      },
    });
    if (token) {
      setAlias("Carlos Muñoz");
      SocketService.sendMessage({ core: { isOnline: [Boolean(token)] } });
      SocketService.sendMessage({
        core: {
          updateAlias: [{ id: SocketService.id, alias: "Carlos Muñoz" }],
        },
      });
    }
  };

  useEffect(() => {
    register();
    SocketService.onConnectionEvent = () => {
      register();
    };
    SocketService.onDisconnectionEvent = () => {
      token &&
        SocketService.sendMessage({
          core: { isOnline: [false] },
        });
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
    if (alias && !token) {
      const history = chats[currentRoom.id] || [];
      setChats({
        ...chats,
        [currentRoom.id]: [
          ...history,
          {
            by: "advice",
            message: `¡Hola ${alias} 👋, ya puedes chatear conmigo!`,
          },
        ],
      });
    }
  }, []);
  useEffect(() => {
    if (alias && !token) {
      const history = chats[currentRoom.id] || [];
      SocketService.sendMessage({
        core: { updateAlias: [{ alias, id: SocketService.id }] },
      });
      setChats({
        ...chats,
        [currentRoom.id]: [
          ...history,
          {
            by: "advice",
            message: `¡Hola ${alias} 👋, ya puedes chatear conmigo!`,
          },
        ],
      });
    }
  }, [alias]);
  useEffect(() => {
    SocketService.receiveMessage({
      core: {
        response: ({ message, room }: any) => {
          const history = chats[room.id] || [];
          setChats({
            ...chats,
            [room?.id]: [...history, { by: "party", message }],
          });
        },
      },
    });
  }, [chats]);

  const onSubmit = (e: any) => {
    const history = chats[currentRoom.id] || [];
    e.preventDefault();
    if (alias) {
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
      setChats({
        ...chats,
        [currentRoom.id]: [...history, { by: "self", message }],
      });
    }
    if (!alias) {
      setAlias(message);
    }
    setMessage("");
  };
  return {
    onSubmit,
    message,
    setMessage,
    rooms,
    currentRoom,
    setCurrentRoom,
    chats,
    token,
    alias,
  };
};
