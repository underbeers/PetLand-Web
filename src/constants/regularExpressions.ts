export type RegExpPair = { regExp: RegExp, error: string };

const name: RegExpPair = {regExp: RegExp(/^[a-zA-Zа-яА-Я \-'‘’]+$/), error: 'Неподдерживаемый символ'};

const moreThan = (than: number): RegExpPair => {
    return {regExp: RegExp(`^.{${than},100000}$`), error: `Не меньше ${than} символов`};
}

const lessThan = (than: number): RegExpPair => {
    return {regExp: RegExp(`^.{0,${than}}$`), error: `Не больше ${than} символов`};
}

const email = {regExp: RegExp(/^[A-Za-z0-9._%+-]+@(?:[A-Za-z0-9-]+\.)+[A-Za-z]{2,}$/), error: 'Некорректный формат'};

const characterOrSymbol: RegExpPair = {
    regExp: RegExp(/^[a-zA-Z0-9`'‘’".,:;!?@#$%^&*()\[\]\{\}<>\-+=_\\\/]*$/),
    error: 'Неподдерживаемый символ'
};

const specialCharacter: RegExpPair = {
    regExp: RegExp(/[`'‘’".,:;!?@#$%^&*()\[\]\{\}<>\-_+=\\\/]+/),
    error: 'Как минимум 1 специальный символ'
};

const upperCase: RegExpPair = {regExp: RegExp(/^.*[A-Z]+.*$/), error: 'Как минимум 1 заглавная буква'};

const digit: RegExpPair = {regExp: RegExp(/^.*[0-9]+.*$/), error: 'Как минимум 1 цифра'};


export const emailRegExp = [email];

export const nameRegExp = [name];

export const passwordRegExp = [moreThan(8), characterOrSymbol, upperCase, digit, specialCharacter];
