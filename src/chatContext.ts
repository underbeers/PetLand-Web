import {createContext, useContext} from 'react';
import {io, Socket} from 'socket.io-client';


const CHAT_API_URL = `http://${process.env.REACT_APP_CHAT_API_URL}`;

export type ChatUserType = {
    connected: boolean,
    messages: Array<{ content: string, from: string, to: string, time: string }>,
    userID: string,
    username: string
}

export type ChatContext = {
    socket: Socket;
    userID: string;
    users: Array<ChatUserType>;
    initialised: boolean;
}

export const initialChatContextState: ChatContext = {
    socket: io(CHAT_API_URL, {autoConnect: false}),
    userID: '',
    users: [],
    initialised: false

};
export const ChatContext = createContext<ChatContext>(initialChatContextState);
export const useChatContext = () => useContext(ChatContext);
