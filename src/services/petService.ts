const API_URL = 'http://79.137.198.139:6002/api/v1';


class PetService {
    public async getPetTypes() {
        return fetch(API_URL + '/petTypes/', {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async getBreedByPetTypeId(petTypeId: string) {
        return fetch(API_URL + `/breeds/?pet_type_id=${petTypeId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async getFullPetCard(userId: string) {
        return fetch(API_URL + `/petCards/?user_id=${userId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async getShortPetCard(userId: string) {
        return fetch(API_URL + `/petCards/main/?user_id=${userId}`, {
            method: 'GET',
            headers: {'Content-Type': 'application/json'}
        })
    }

    public async editPetCard(petCardId: string, pet_type_id: number, user_id: number, pet_name: string,
                             breed_id: number, photo: string, birth_date: string, male: boolean, color: string,
                             care: string, pet_character: string, pedigree: string, sterilization: true, vaccinations: true) {
        return fetch(API_URL + `/petCards/update/${petCardId}`, {
            method: 'PUT',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pet_type_id,
                user_id,
                pet_name,
                breed_id,
                photo,
                birth_date,
                male,
                color,
                care,
                pet_character,
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

    public async createPetCard(pet_type_id: number, user_id: number, pet_name: string, breed_id: number,
                               photo: string, birth_date: string, male: boolean, color: string,
                               care: string, pet_character: string, pedigree: string, sterilization: boolean,
                               vaccinations: boolean) {
        return fetch(API_URL + '/petCards/new/', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                pet_type_id,
                user_id,
                pet_name,
                breed_id,
                photo,
                birth_date,
                male,
                color,
                care,
                pet_character,
                pedigree,
                sterilization,
                vaccinations
            })
        })
    }
}

export default new PetService();
