import { useStateValue } from "../context";
import { SocketService } from "../services";
import { useEffect, useState } from "react";
import { generate } from "random-words";
import { labelCases } from "../utils";
import { useDebounce } from "./useDebounce";

export const useLiveChat = () => {
  const [{ token, isOnline: globalIsOnline }, dispatch]: any = useStateValue();
  const [message, setMessage] = useState("");
  const debouncedMessage = useDebounce(message, 600);
  const [rooms, setRooms]: any = useState([]);
  const [chats, setChats]: any = useState({});
  const [isTyping, setIsTyping]: any = useState(false);
  const [counterpartyIsTyping, setCounterpartyIsTyping] = useState(false);
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
    if ((isTyping !== message) !== debouncedMessage && message)
      setIsTyping(!(message === debouncedMessage));
  }, [message, debouncedMessage]);

  useEffect(() => {
    SocketService.sendMessage({
      core: {
        message: [
          {
            message: isTyping ? "$START_TYPING" : "$STOP_TYPING",
            room: currentRoom,
          },
        ],
      },
    });
  }, [isTyping]);

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
          dispatch({ isOnline });
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
          if (message === "$START_TYPING") {
            setCounterpartyIsTyping(true);
            return;
          }
          if (message === "$STOP_TYPING") {
            setCounterpartyIsTyping(false);
            return;
          }
          const history = chats[room.id] || [];
          setChats({
            ...chats,
            [room?.id]: [...history, { by: "party", message }],
          });
        },
      },
    });
  }, [chats, currentRoom]);

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
    setIsTyping(false);
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
    counterpartyIsTyping,
  };
};
