import React, {useContext, useEffect, useState} from 'react';

import petService, {createPetCardParameters} from '../../services/petService';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';

import Input from '../../components/UIKit/Input';
import Checkbox from '../../components/UIKit/Checkbox';
import Button from '../../components/UIKit/Button';
import TopBar from '../../components/TopBar/TopBar';

import styles from './NewPet.module.css';
import {UserContext} from '../../userContext';
import {useNavigate} from 'react-router-dom';


const NewPet: React.FC = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [name, setName] = useState(initialInputState);
    const [type, setType] = useState(initialInputState);
    const [gender, setGender] = useState(initialInputState);
    const [breed, setBreed] = useState(initialInputState);

    const [birthday, setBirthday] = useState(initialInputState);
    const [photo, setPhoto] = useState(initialInputState);

    const [color, setColor] = useState(initialInputState);
    const [care, setCare] = useState(initialInputState);

    const [sterilized, setSterilized] = useState(false);
    const [vaccinated, setVaccinated] = useState(false);

    const [pedigree, setPedigree] = useState(initialInputState);
    const [character, setCharacter] = useState(initialInputState);


    const initialTypesState: Array<{ id: number, petType: string }> = [];
    const [types, setTypes] = useState(initialTypesState);
    const getTypes: () => Array<string> = () => types.map(item => item.petType);

    const initialBreedsState: Array<{ id: number, petTypeID: number, breedName: string }> = [];
    const [breeds, setBreeds] = useState(initialBreedsState);
    const getBreeds: () => Array<string> = () => breeds.map(item => item.breedName);

    const navigate = useNavigate();

    const genders = ['Мальчик', 'Девочка'];

    const {user, setUser} = useContext(UserContext);

    const listRegExp: (elements: Array<string>, error: string) => { regExp: RegExp, error: string } = (elements, error) => {
        return {
            regExp: RegExp(
                '^(' + elements.toString()
                    .replaceAll(',', '|')
                    .replaceAll('(', '\\(')
                    .replaceAll(')', '\\)') + ')$'
            ),
            error: error
        };
    };

    useEffect(() => {
        petService.getPetTypes().then(response => {
            if (response.ok) {
                return (response.json());
            } else {
                //console.log(response);
            }
        }).then(body => {
            setTypes(body);
        });
    }, []);

    useEffect(() => {
        for (let i = 0; i < types.length; i++) {
            if (type.value == types[i].petType) {
                petService.getBreedByPetTypeId(types[i].id.toString()).then(response => {
                    //console.log(response);
                    if (response.ok) {
                        return (response.json());
                    } else {
                        //console.log(response);
                        return null;
                    }
                }).then(body => {
                    //console.log(body)
                    body ? setBreeds(body) : setBreeds([]);
                });
            }
        }

    }, [type]);

    const [submitLoading, setSubmitLoading] = useState(false);
    const submit = async () => {
        setSubmitLoading(true);
        document.querySelectorAll('#new_pet_form input').forEach(el => {
            // @ts-ignore
            el.focus();
        });
        document.querySelectorAll('#new_pet_form textarea').forEach(el => {
            // @ts-ignore
            el.focus();
        });
        let isOk: boolean = true;

        const inputs = [
            {state: name, setState: setName},
            {state: type, setState: setType},
            {state: gender, setState: setGender},
            {state: breed, setState: setBreed},
            {state: birthday, setState: setBirthday},
            {state: photo, setState: setPhoto},
            {state: color, setState: setColor},
            {state: care, setState: setCare},
            {state: pedigree, setState: setPedigree},
            {state: character, setState: setCharacter}
        ];

        inputs.forEach(({state, setState}) => {
            if (!state.ok) {
                isOk = false;
            }
        });
        let petTypeID: number = -1, breedID: number = -1;
        breeds.forEach(b => {
            if (b.breedName == breed.value) {
                petTypeID = b.petTypeID;
                breedID = b.id;
            }
        });

        if (petTypeID == -1 || petTypeID == undefined ||
            breedID == -1 || breedID == undefined) {
            isOk = false;
        }

        const birthDate = new Date(birthday.value).toISOString();

        if (!isOk) {
            setSubmitLoading(false);
            return;
        }

        const params: createPetCardParameters = {
            petTypeID,
            petName: name.value,
            breedID,
            birthDate,
            male: gender.value == genders[0]
        }
        color.value && (params.color = color.value);
        care.value && (params.care = care.value);
        character.value && (params.petCharacter = character.value);
        pedigree.value && (params.pedigree = pedigree.value);
        params.sterilization = sterilized;
        params.vaccinations = vaccinated;


        await petService.createPetCard(params, user.accessToken).then(response => {
            switch (response.status) {
                case 200:
                    return response.json();
                default:
                    alert(response.status);
                    return null;
            }
        }).then(body => {
            //console.log(body);
            setSubmitLoading(false);
            body && navigate('/profile/pets');
        });
    }

    return (
        <form id={'new_pet_form'} className={styles.wrapper}>
            <h2>Добавление нового питомца</h2>
            <div className={styles.input__row}>
                <Input type={'text'} value={name} setValue={setName} label={'Кличка'}
                       placeholder={'Введите имя питомца'} required={true}/>
                <Input type={'dropdown'} value={type} setValue={setType} label={'Вид'} placeholder={'Выберите вид'}
                       dropdownItems={getTypes()} required={true}
                       regularExpressions={[listRegExp(getTypes(), 'Введите вид из списка')]}/>
            </div>
            <div className={styles.input__row}>
                <Input type={'dropdown'} value={gender} setValue={setGender} label={'Пол'} placeholder={'Выберите пол'}
                       dropdownItems={genders} required={true}
                       regularExpressions={[listRegExp(genders, 'Выберите пол из списка')]}/>
                <Input type={'dropdown'} value={breed} setValue={setBreed} label={'Порода'}
                       placeholder={'Выберите породу'} dropdownItems={getBreeds()}
                       required={true} disabled={!type.ok}
                       regularExpressions={[listRegExp(getBreeds(), 'Введите породу из списка')]}/>
            </div>
            <div className={styles.input__row}>
                <Input type={'date'} value={birthday} setValue={setBirthday} label={'Дата рождения'}
                       help={'Если вы не знаете точную дату, укажите примерную'} required={true}/>
                <Input type={'file'} value={photo} setValue={setPhoto} label={'Загрузите фотографию'}
                       help={'Эта фотография будет на аватарке питомца'}/>
            </div>
            <div className={styles.input__row}>
                <Input type={'textarea'} value={color} setValue={setColor} label={'Окрас'}
                       placeholder={'Опишите окрас питомца'} className={styles.textarea}/>
                <Input type={'textarea'} value={care} setValue={setCare} label={'Особенности ухода'}
                       placeholder={'Расскажите про уход'} className={styles.textarea}/>
            </div>
            <div className={styles.additional__info}>
                <p>Для кошек и собак Вы можете добавить дополнительную информацию</p>
                <div className={styles.input__row}>
                    <Checkbox isChecked={sterilized} setChecked={setSterilized}>
                        Стерилизация
                    </Checkbox>
                    <Checkbox isChecked={vaccinated} setChecked={setVaccinated}>
                        Прививки
                    </Checkbox>
                </div>
            </div>

            <div className={styles.input__row}>
                <Input type={'textarea'} value={pedigree} setValue={setPedigree} label={'Родословная'}
                       placeholder={'Расскажите про родословную'} className={styles.textarea}/>
                <Input type={'textarea'} value={character} setValue={setCharacter} label={'Черты характера'}
                       placeholder={'Расскажите про поведение'} className={styles.textarea}/>
            </div>
            <Button type={'primary'} color={'orange'} text={'Сохранить'} onClick={submit} loading={submitLoading}/>
        </form>
    );
};

export default withOfferToSignIn(NewPet);
