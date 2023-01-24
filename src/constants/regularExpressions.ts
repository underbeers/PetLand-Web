type regExpPair = { regExp: RegExp, error: string };

const name: regExpPair = {regExp: RegExp(/^[a-zA-Zа-яА-Я \-'‘’]+$/), error: 'Неподдерживаемый символ'};

const moreThan = (than: number): regExpPair => {
    return {regExp: RegExp(`^.{${than},100000}$`), error: `Не меньше ${than} символов`};
}

const lessThan = (than: number): regExpPair => {
    return {regExp: RegExp(`^.{0,${than}}$`), error: `Не больше ${than} символов`};
}

const email = {regExp: RegExp(/^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/), error: 'Некорректный формат'};

const characterOrSymbol: regExpPair = {
    regExp: RegExp(/^[a-zA-Z0-9`'‘’".,:;!?@#$%^&*()\[\]\{\}<>\-+=_\\\/]*$/),
    error: 'Неподдерживаемый символ'
};

const specialCharacter: regExpPair = {
    regExp: RegExp(/[`'‘’".,:;!?@#$%^&*()\[\]\{\}<>\-_+=\\\/]+/),
    error: 'Как минимум 1 специальный символ'
};

const upperCase: regExpPair = {regExp: RegExp(/^.*[A-Z]+.*$/), error: 'Как минимум 1 заглавная буква'};

const digit: regExpPair = {regExp: RegExp(/^.*[0-9]+.*$/), error: 'Как минимум 1 цифра'};


export const emailRegExp = [email];

export const nameRegExp = [name];

export const passwordRegExp = [moreThan(8), characterOrSymbol, upperCase, digit, specialCharacter];
