import {createContext, useContext} from 'react';
import {ChatUserType} from "./services/chatService";

export type ChatContext = {
    users: Array<ChatUserType>,
    setUsers: (users: Array<ChatUserType>) => void;
}

export const initialChatContextState: ChatContext = {
    users: [],
    setUsers: (users: Array<ChatUserType>) => {}
};
export const ChatContext = createContext<ChatContext>(initialChatContextState);
export const useChatContext = () => useContext(ChatContext);
