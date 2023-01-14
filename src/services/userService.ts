import axios from "axios";

const API_URL = "http://79.137.198.139:6001";
const REGISTRATION = "/registration";


class AuthService {
    login(email: string, password: string) {
        return axios
            .post(API_URL + "/signin", {
                email,
                password
            })
            .then(response => {
                if (response.data.accessToken) {
                    localStorage.setItem("user", JSON.stringify(response.data));
                }
                return response.data;
            });
    }

    logout() {
        localStorage.removeItem("user");
    }
    async register (firstName: string, surName: string, email: string, password: string) {
        return fetch(API_URL + REGISTRATION + "/new/", {
            method: "POST",
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                firstName,
                surName,
                email,
                password
            })
        });
    }

    getCurrentUser() {
        const userStr = localStorage.getItem("user");
        if (userStr) return JSON.parse(userStr);

        return null;
    }
}

export default new AuthService();