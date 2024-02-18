import { twosCompliment as binaryTwosCompliment, fourBitSpacer as binaryFourBitSpacer, make32Bits as binaryMake32Bits } from './binary.mjs';

function decimalInput(decimal = null) {
    return decimal === null ? prompt('Enter Decimal -> ') : decimal;
}

function isDecimal(decimal) {
    return !isNaN(parseFloat(decimal)) && isFinite(decimal);
}

export function decimalToBinary(decimal = null) {
    decimal = decimalInput(decimal);
    let negative = false;

    if (!isDecimal(decimal)) {
        console.log('Input Error');
        return null;
    }

    function inner(decimalIn, divisor, isFraction, maxCap = null) {
        let out = '';
        let i = 0;

        while (true) {
            i += 1;
            let bit = (!isFraction ? decimalIn % divisor : (decimalIn / divisor >= 1 ? 1 : 0));
            decimalIn = (!isFraction ? Math.floor(decimalIn / 2) : (decimalIn / divisor) - bit);
            out += String(bit);

            if (decimalIn === 0) {
                break;
            }
            if (maxCap !== null && i === maxCap) {
                break;
            }
        }

        out = !isFraction ? out.split('').reverse().join('') : out;
        return out;
    }

    if (decimal.includes('-')) {
        decimal = decimal.replace('-', '');
        negative = true;
    }

    let whole = parseInt(decimal.split('.')[0]);
    let fraction = parseFloat('0.' + (decimal.split('.')[1] || '0'));
    let binary = inner(whole, 2, false);

    if (fraction !== 0.0) {
        binary += '.' + inner(fraction, 0.5, true, 10);
    }

    binary = negative ? binaryTwosCompliment(binary) : binaryMake32Bits(binary);
    return binary;
}