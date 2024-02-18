function binaryInput(binary = null) {
    return binary === null ? prompt('Enter Binary -> ') : binary;
}

function isBinary(binary) {
    const characters = "01.";
    if (!binary || (binary.match(/\./g) || []).length > 1) {
        return false;
    }
    for (let char of binary) {
        if (!characters.includes(char)) {
            return false;
        }
    }
    return true;
}

export function fourBitSpacer(binary = null) {
    binary = binaryInput(binary);

    if (!isBinary(binary)) {
        console.log('Input Error');
        return null;
    }

    if (binary.includes('.')) {
        let [whole, fraction] = binary.split('.');
        whole = whole.match(/.{1,4}/g).join(' ');
        fraction = fraction.match(/.{1,4}/g).join(' ');
        binary = whole + '.' + fraction;
    } else {
        binary = binary.match(/.{1,4}/g).join(' ');
    }

    return binary;
}

export function make32Bits(binary = null) {
    binary = binaryInput(binary);
    let bits = 32

    if (!isBinary(binary)) {
        console.log('Input Error');
        return null;
    }

    if (binary.includes('.')) {
        let [whole, fraction] = binary.split('.');
        binary = `${make32Bits(whole)}.${make32Bits(fraction.split('').reverse().join('')).split('').reverse().join('')}`;
    } else if (binary.replace(/ /g, '').length > bits) {
        console.log('Input binary is more than 16 bits');
        return null;
    }

    binary = binary.padStart(bits, '0');

    return binary;
}

export function binaryToDecimal(binary = null) {
    binary = binaryInput(binary);

    if (!isBinary(binary)) {
        console.log('Input Error');
        return null;
    }

    binary = make32Bits(binary);

    function inner(binIn, power, add, reverse) {
        let out = 0;
        binIn = reverse ? binIn.split('').reverse().join('') : binIn;

        for (let index = 0; index < binIn.length; index++) {
            let bit = binIn[index];
            if (add && index === binIn.length - 1) {
                out += parseInt(bit) * (-1 * (2**power));
            } else {
                out += parseInt(bit) * (2**power);
            }
            power = add ? power + 1 : power - 1;
        }
        return out;
    }

    let decimal;
    if (binary.includes('.')) {
        let [whole, fraction] = binary.split('.');
        decimal = inner(whole, 0, true, true);
        decimal += inner(fraction, -1, false, false);
    } else {
        decimal = inner(binary, 0, true, true);
    }

    return decimal;
}

export function twosCompliment(binary = '') {
    binary = binaryInput(binary);

    if (!isBinary(binary)) {
        console.log('Input Error');
        return null;
    }

    let hasFraction = binary.includes('.');

    if (!binary.includes('1')) {
        return make32Bits('0');
    }

    binary = make32Bits(binary);

    if (hasFraction) {
        let dot = binary.split('.')[0].length;
        binary = binary.replace('.', '');
        binary = binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
        binary = (parseInt(binary, 2) + 1).toString(2);
        binary = `${binary.slice(0, dot)}.${binary.slice(dot)}`;
    } else {
        binary = binary.split('').map(bit => bit === '0' ? '1' : '0').join('');
        binary = (parseInt(binary, 2) + 1).toString(2);
    }

    return binary;
}