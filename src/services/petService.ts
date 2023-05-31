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

    public async addPhoto(data: FormData) {
        return fetch(API_URL + '/filePet', {
            method: 'POST',
            body: data
        });
    }

    public async transferPet(params: {
        petCardID: number,
        newOwnerID: string
    }, accessToken: string) {
        return fetch(API_URL + '/petCards/transfer', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}`
            },
            body: JSON.stringify(params)
        });
    }
}

export default new PetService();
