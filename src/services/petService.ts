import {API_URL} from './userService';


export interface createPetCardParameters {
    petTypeID: number;
    petName: string;
    breedID: number;
    photo?: string;
    birthDate: string;
    male: boolean;
    color?: string;
    care?: string;
    petCharacter?: string;
    pedigree?: string;
    sterilization?: boolean;
    vaccinations?: boolean
}

export interface updatePetCardParameters {
    petTypeID?: number,
    petName?: string,
    breedID?: number,
    photo?: string,
    birthDate?: string,
    male?: boolean,
    color?: string,
    care?: string,
    petCharacter?: string
    pedigree?: string,
    sterilization?: boolean,
    vaccinations?: boolean
}

class PetService {
    public async getPetTypes() {
        return fetch(API_URL + '/petTypes', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async getBreedByPetTypeId(petTypeID: string) {
        return fetch(API_URL + `/breeds?petTypeID=${petTypeID}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async getFullPetCard(userID: string, petID: string) {
        return fetch(API_URL + `/petCards?userID=${userID}&id=${petID}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async getShortPetCards(userID: string) {
        return fetch(API_URL + `/petCards/main?userID=${userID}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        });
    }

    public async createPetCard(params: createPetCardParameters, accessToken: string) {
        return fetch(API_URL + '/petCards/new', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }

    public async editPetCard(petCardID: string, params: updatePetCardParameters, accessToken: string) {
        return fetch(API_URL + `/petCards/update/${petCardID}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }

    public async deletePetCard(petCardID: string, accessToken: string) {
        return fetch(API_URL + `/petCards/delete/${petCardID}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            }
        });
    }
}

export default new PetService();
