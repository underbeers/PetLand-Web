import {API_URL} from "./userService";

class PetService {
    public async getPetTypes() {
        return fetch(API_URL + '/petTypes', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async getBreedByPetTypeId(petTypeID: string) {
        return fetch(API_URL + `/breeds?pet_type_id=${petTypeID}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async getFullPetCards(userID: string) {
        return fetch(API_URL + `/petCards?userID=${userID}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async getShortPetCards(userID: string) {
        return fetch(API_URL + `/petCards/main?userID=${userID}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async editPetCard(petCardId: string, petTypeID: number, userID: number, petName: string,
                             breedID: number, photo: string, birthDate: string, male: boolean, color: string,
                             care: string, petCharacter: string, pedigree: string, sterilization: true, vaccinations: true) {
        return fetch(API_URL + `/petCards/update/${petCardId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                petTypeID,
                userID,
                petName,
                breedID,
                photo,
                birthDate,
                male,
                color,
                care,
                petCharacter,
                pedigree,
                sterilization,
                vaccinations
            })
        })
    }

    public async deletePetCard(petCardId: string) {
        return fetch(API_URL + `/petCards/delete/${petCardId}`, {
            method: 'DELETE',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async createPetCard(petTypeID: number, petName: string, breedID: number,
                               photo: string, birthDate: string, male: boolean, color: string,
                               care: string, petCharacter: string, pedigree: string, sterilization: boolean,
                               vaccinations: boolean) {
        return fetch(API_URL + '/petCards/new', {

            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('accessToken')}`
            },
            body: JSON.stringify({
                petTypeID,
                petName,
                breedID,
                photo,
                birthDate,
                male,
                color,
                care,
                petCharacter,
                pedigree,
                sterilization,
                vaccinations
            })
        })
    }
}

export default new PetService();
