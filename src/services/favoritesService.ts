import {API_URL} from "./userService";

class FavoritesService {
    public async addToFavorites(params: {
        type: 'advert' | 'organization' | 'specialist' | 'event',
        id: number
    }, accessToken: string) {
        return fetch(API_URL + '/favorites/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }

    public async deleteFromFavorites(params: { id: number }, accessToken: string) {
        return fetch(API_URL + `/favorites/delete?id=${params.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }

    public async getFavorites(accessToken: string) {
        return fetch(API_URL + '/favorites', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }
}

export default new FavoritesService();
