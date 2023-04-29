import {io, Socket} from "socket.io-client";


const CHAT_API_URL = `http://${process.env.REACT_APP_CHAT_API_URL}`;

export type ChatUserType = {
    connected: boolean,
    messages: Array<{ content: string, from: string, to: string }>,
    userID: string,
    username: string
}

class ChatService {
    public socket: Socket;
    public userID: string;

    constructor() {
        this.socket = io(CHAT_API_URL, {
            autoConnect: false
        });
        this.socket.onAny((event, ...args) => {
            console.log(event, args);
        });
        this.userID = '';
    }

    private listenersInitialized = false;

    public initListeners(privMes: any, users: any) {
        if (this.listenersInitialized) {
            return;
        }
        console.log('init listeners');

        this.listenersInitialized = true;
        this.socket.on("users", users);
        this.socket.on('private message', privMes);
    }
}

export default new ChatService();
