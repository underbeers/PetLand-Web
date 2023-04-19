import {iUser} from "../userContext";
import userService from "./userService";

const CHAT_API_URL = `http://${process.env.REACT_APP_CHAT_API_URL}`;

class ChatService {
    private async createUser(firstName: string, lastName: string) {
        console.log('create user');
        const body = JSON.stringify({
            firstName: firstName,
            lastName: lastName,
            type: 'consumer'
        })
        //console.log(body)
        return fetch(CHAT_API_URL + '/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: body
        });
    }

    private async login(id: string) {
        //console.log('login');
        return fetch(CHAT_API_URL + `/login/${id}`, {
            method: 'POST',
            headers: {'Content-Type': 'application/json'}
        });
    }

    private async getRecentConversation(chatAccessToken: string) {
        //console.log('getRecentConversation, token: ', chatAccessToken);
        return fetch(CHAT_API_URL + '/room', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${chatAccessToken}`
            }
        });
    }

    private async getChatConversation(chatAccessToken: string, chatID: string) {
        return fetch(CHAT_API_URL + `/room/${chatID}?limit=100&page=0`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${chatAccessToken}`
            }
        });
    }

    private async postMessageToChat(chatAccessToken: string, chatID: string, message: string) {
        return fetch(CHAT_API_URL + `/room/${chatID}/message`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${chatAccessToken}`
            },
            body: JSON.stringify({
                messageText: message
            })
        });
    }

    public async registerUser(user: iUser) {
        return this.createUser(user.firstName, user.surName).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    //console.log('registered');
                    return response.json();
                default:
                    alert('Неизвестная ошибка, код ' + response.status);
                    return null;
            }
            // @ts-ignore
        }).then((body: { success: string, user: { firstName: string, lastName: string, type: string, _id: string, createdAt: string, updatedAt: string, __v: number } }) => {
            //console.log(body);
            if (body) {
                //console.log(body);
                user.chatID = body.user._id;
                userService.setChatID({chatID: user.chatID}, user.accessToken).then(response => {
                    //console.log(response);
                    switch (response.status) {
                        case 200:
                            return response.json();
                        default:
                            alert('Неизвестная ошибка, код ' + response.status);
                            return null;
                    }
                }).then(body => {
                    //console.log(body)
                });
            }
        });
    }

    public async auth(user: iUser) {
        return this.login(user.chatID).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    alert('Неизвестная ошибка, код ' + response.status);
                    return null;
            }
        }).then((body: { success: boolean, authorization: string }) => {
            //console.log(body);
            user.chatAccessToken = body.authorization;
        });
    }

    public async loadDialogs(user: iUser, setDialogs: (dialogs: any) => void) {
        return this.getRecentConversation(user.chatAccessToken).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    alert('Неизвестная ошибка, код ' + response.status);
                    return null;
            }
        }).then(body => {
            //console.log(body);
            setDialogs(body.conversation);
        })
    }

    public async loadMessages(user: iUser, chatID: string, setMessages: (messages: any) => void) {
        return this.getChatConversation(user.chatAccessToken, chatID).then(response => {
            //console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    alert('Неизвестная ошибка, код ' + response.status);
                    return null;
            }
        }).then(body => {
            //console.log(body);
            if (body) {
                body.conversation.reverse();
                setMessages(body);
            }
        });
    }

    public async sendMessage(user: iUser, chatID: string, message: string) {
        return this.postMessageToChat(user.chatAccessToken, chatID, message).then(response => {
            console.log(response);
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    alert('Неизвестная ошибка, код ' + response.status);
                    return null;
            }
        }).then(body => {
            console.log(body);
        })
    }
}

export default new ChatService();
