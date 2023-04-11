import {API_URL} from "./userService";
import {iUser} from "../userContext";

const CHAT_API_URL = `http://${process.env.REACT_APP_CHAT_API_URL}`;

class ChatService {
    private async createUser(firstName: string, lastName: string) {
        return fetch(API_URL + '/users', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName,
                lastName,
                type: 'consumer'
            })
        });
    }

    public async registerUser(firstName: string, lastName: string, user: iUser) {
        this.createUser(firstName, lastName).then(response => {
            switch (response.status) {
                case 200:
                    console.log('registered');
                    break;
                default:
                    console.log('Неизвестная ошибка, код ' + response.status);
                    break;
            }
            // @ts-ignore
        }).then((body: { success: string, user: { firstName: string, lastName: string, type: string, _id: string, createdAt: string, updatedAt: string, __v: number } }) => {
            console.log(body);
            user.chatID = body.user._id;
        });
    }
}

export default new ChatService();
