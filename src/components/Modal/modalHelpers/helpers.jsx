export const toLowerCaseFirstLetter = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export const toTrim = (str) => {
    return str.trim().replace(/\s/g, '');
}