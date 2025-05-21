import crypto from "crypto";

const base62Alphabet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';

const generateShortId = (length = 6) => {
    const bytes = crypto.randomBytes(length);
    let shortId = '';

    for (let i = 0; i < length; i++) {
        const index = bytes[i] % base62Alphabet.length;
        shortId += base62Alphabet[index];
    }

    return shortId;
};

export {
    generateShortId
};
