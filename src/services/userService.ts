const API_URL = 'http://79.137.198.139:6002/api/v1';


class AuthService {
    async authenticate(email: string, password: string) {
        return fetch(API_URL + '/login/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                login: email,
                password
            })
        });
    }

    async getUser(token: string) {
        return fetch(API_URL + '/user/info/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`}
        });
    }

    async authorize() {
        // @ts-ignore
        return this.getUser(localStorage.getItem('accessToken'));
    }

    logout() {
        localStorage.removeItem('accessToken');
    }

    async register(firstName: string, surName: string, email: string, password: string) {
        return fetch(API_URL + '/registration/new/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                firstName,
                surName,
                email,
                password
            })
        });
    }
}

export default new AuthService();
