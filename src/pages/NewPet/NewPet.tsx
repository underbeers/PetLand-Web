import React, {useContext, useEffect, useState} from 'react';

import petService from '../../services/petService';
import {withOfferToSignIn} from '../../hoc/withOfferToSignIn';

import Input from '../../components/UIKit/Input';
import Checkbox from '../../components/UIKit/Checkbox';
import Button from '../../components/UIKit/Button';

import styles from './NewPet.module.css';


const NewPet: React.FC = () => {
    const initialInputState = {value: '', ok: false, edited: false};
    const [name, setName] = useState(initialInputState);
    const [type, setType] = useState(initialInputState);
    const [gender, setGender] = useState(initialInputState);
    const [breed, setBreed] = useState(initialInputState);

    const [color, setColor] = useState(initialInputState);
    const [care, setCare] = useState(initialInputState);

    const [sterilized, setSterilized] = useState(false);
    const [vaccinated, setVaccinated] = useState(false);

    const [pedigree, setPedigree] = useState(initialInputState);
    const [character, setCharacter] = useState(initialInputState);


    const initialTypesState: Array<{ id: number, pet_type: string }> = [];
    const [types, setTypes] = useState(initialTypesState);
    const getTypes: () => Array<string> = () => types.map(item => item.pet_type);

    const initialBreedsState: Array<{ id: number, pet_type_id: number, breed_name: string }> = [];
    const [breeds, setBreeds] = useState(initialBreedsState);
    const getBreeds: () => Array<string> = () => breeds.map(item => item.breed_name);

    const regExpTypes: { regExp: RegExp, error: string } = {
        regExp: RegExp('^(' + types.map(type => type.pet_type).toString().replaceAll(',', '|') + ')$'),
        error: 'Введите вид из списка'
    };

    const regExpBreeds: { regExp: RegExp, error: string } = {
        regExp: RegExp('^(' + breeds.map(breed => breed.breed_name).toString().replaceAll(',', '|') + ')$'),
        error: 'Введите породу из списка'
    }

    useEffect(() => {
        petService.getPetTypes().then(response => {
            if (response.ok) {
                return (response.json());
            } else {
                console.log(response);
            }
        }).then(body => {
            setTypes(body);
        });
    }, []);

    useEffect(() => {
        for (let i = 0; i < types.length; i++) {
            if (type.value == types[i].pet_type) {
                petService.getBreedByPetTypeId(types[i].id.toString()).then(response => {
                    console.log(response);
                    if (response.ok) {
                        return (response.json());
                    } else {
                        console.log(response);
                        return null;
                    }
                }).then(body => {
                    body ? setBreeds(body) : setBreeds([]);
                });
            }
        }

    }, [type]);

    return (
        <form id={''} className={styles.wrapper}>
            <h2>Добавление нового питомца</h2>
            <div className={styles.input__row}>
                <Input type={'text'} value={name} setValue={setName} label={'Кличка'}
                       placeholder={'Введите имя питомца'} required={true}/>
                <Input type={'dropdown'} value={type} setValue={setType} label={'Вид'} placeholder={'Выберите вид'}
                       dropdownItems={getTypes()} required={true} regularExpressions={[regExpTypes]}/>
            </div>
            <div className={styles.input__row}>
                <Input type={'dropdown'} value={gender} setValue={setGender} label={'Пол'} placeholder={'Выберите пол'}
                       dropdownItems={['Мальчик', 'Девочка']} required={true}/>
                <Input type={'dropdown'} value={breed} setValue={setBreed} label={'Порода'}
                       placeholder={'Выберите породу'} dropdownItems={getBreeds()}
                       required={true} disabled={!type.ok} regularExpressions={[regExpBreeds]}/>
            </div>
            <div className={styles.input__row}>
                <Input type={'date'} value={{value: '', ok: true, edited: true}} setValue={() => {
                }} label={'Дата рождения'} help={'Если вы не знаете точную дату, укажите примерную'}/>
                <Input type={'file'} value={{value: '', ok: true, edited: true}} setValue={() => {
                }} label={'Загрузите фотографию'} help={'Эта фотография будет на аватарке питомца'}/>
            </div>
            <div className={styles.input__row}>
                <Input type={'textarea'} value={color} setValue={setColor} label={'Окрас'}
                       placeholder={'Опишите окрас питомца'} className={styles.textarea}/>
                <Input type={'textarea'} value={care} setValue={setCare} label={'Особенности ухода'}
                       placeholder={'Расскажите про уход'} className={styles.textarea}/>
            </div>
            <p>Для кошек и собак Вы можете добавить дополнительную информацию</p>
            <div className={styles.input__row}>
                <Checkbox isChecked={sterilized} setChecked={setSterilized}>
                    Стерилизация
                </Checkbox>
                <Checkbox isChecked={vaccinated} setChecked={setVaccinated}>
                    Прививки
                </Checkbox>
            </div>
            <div className={styles.input__row}>
                <Input type={'textarea'} value={pedigree} setValue={setPedigree} label={'Родословная'}
                       placeholder={'Расскажите про родословную'} className={styles.textarea}/>
                <Input type={'textarea'} value={character} setValue={setCharacter} label={'Черты характера'}
                       placeholder={'Расскажите про поведение'} className={styles.textarea}/>
            </div>
            <Button type={'primary'} color={'orange'} text={'Сохранить'} onClick={() => {
            }}/>
        </form>
    );
};

export default withOfferToSignIn(NewPet);
