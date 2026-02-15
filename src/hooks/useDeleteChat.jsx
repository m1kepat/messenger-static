import { useState, useContext } from "react";
import { ChatsContext } from "../context/ChatsContext";
import { UsersContext } from "../context/UsersContext";

export const useDeleteChat = () => {
  const { chats, setChats, setSavedChat, setSelectedChat } =
    useContext(ChatsContext);
  const { currentUser } = useContext(UsersContext);
  const [loading, setLoading] = useState(false);

  const handleDeleteChat = async (chatId) => {
    setLoading(true);

    try {
      const currentChat = chats.find((chat) => chat.id === chatId);
      const isAdmin = currentChat?.participants.find(
        (participant) => participant.id === currentUser?.id,
      )?.isAdmin;

      let updatedChats;

      if (isAdmin) {
        updatedChats = chats.filter((chat) => chat.id !== chatId);
      } else {
        updatedChats = chats.map((chat) => {
          if (chat.id === chatId) {
            return {
              ...chat,
              participants: chat.participants.filter(
                (participant) => participant.id !== currentUser?.id,
              ),
            };
          }
          return chat;
        });
      }

      setChats(updatedChats);
      localStorage.setItem("chats", JSON.stringify(updatedChats));

      setSavedChat(null);
      setSelectedChat(null);
      sessionStorage.removeItem("saved_chat");
    } catch (error) {
      console.error("Ошибка удаления чата:", error);
    } finally {
      setLoading(false);
    }
  };

  return { handleDeleteChat, loading };
};

export default useDeleteChat;
