import {API_URL} from "./userService";


class AdvertService {
    public async getCities() {
        return fetch(API_URL + '/location/city', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async getDistricts() {
        return fetch(API_URL + '/location/district', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async getAdverts() {
        return fetch(API_URL + '/adverts', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    }
}

export default new AdvertService();
