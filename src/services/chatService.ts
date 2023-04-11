import {iUser} from "../userContext";
import userService from "./userService";

const CHAT_API_URL = `http://${process.env.REACT_APP_CHAT_API_URL}`;

class ChatService {
    private async createUser(firstName: string, lastName: string) {
        return fetch(CHAT_API_URL + '/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName,
                lastName,
                type: 'consumer'
            })
        });
    }

    public async registerUser(user: iUser) {
        this.createUser(user.firstName, user.surName).then(response => {
            switch (response.status) {
                case 200:
                    console.log('registered');
                    return response.body;
                default:
                    console.log('Неизвестная ошибка, код ' + response.status);
            }
            // @ts-ignore
        }).then((body: { success: string, user: { firstName: string, lastName: string, type: string, _id: string, createdAt: string, updatedAt: string, __v: number } }) => {
            if (body) {
                console.log(body);
                user.chatID = body.user._id;
                userService.setChatID({chatID: user.chatID}, user.accessToken).then(response => {
                    console.log(response.status);
                });
            }
        });
    }
}

export default new ChatService();
