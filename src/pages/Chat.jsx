import { use, useEffect } from "react";
import useFormatDate from "../hooks/useFormatDate";
import UsersContext from "../context/UsersContext";
import ChatsContext from "../context/ChatsContext";
import MessageContext from "../context/MessageContext";
import Sidebar from "../components/sidebar/Sidebar";
import Messages from "../components/messages/Messages";
import styles from "../styles/components/pages/Chat.module.scss";

const Chat = () => {
  const { formatDate } = useFormatDate();
  const { users, currentUser } = use(UsersContext);
  const { setSavedChat, selectedChat, setSelectedChat, chats, setChats } =
    use(ChatsContext);
  const { message, setMessage } = use(MessageContext);

  useEffect(() => {
    document.title = "Сообщения";
  }, []);

  useEffect(() => {
    const saved = sessionStorage.getItem("saved_chat");
    if (saved) {
      const parsedChat = JSON.parse(saved);
      setSavedChat(parsedChat);
      setSelectedChat(parsedChat.id);
    }
  }, [setSavedChat, setSelectedChat]);

  const handleCreateMessage = async (event) => {
    event.preventDefault();

    if (message.length === 0 || !selectedChat) return;

    const updatedChats = chats.map((chat) => {
      if (chat.id === selectedChat) {
        return {
          ...chat,
          messages: [
            ...(chat.messages || []),
            {
              userId: currentUser.id,
              message: message.trim(),
              time: formatDate(),
            },
          ],
        };
      }
      return chat;
    });

    setChats(updatedChats);
    localStorage.setItem("chats", JSON.stringify(updatedChats));
    setMessage("");
  };

  return (
    <div className={styles.chat}>
      <Sidebar />
      <Messages
        users={users}
        currentUser={currentUser}
        handleCreateMessage={handleCreateMessage}
      />
    </div>
  );
};

export default Chat;
