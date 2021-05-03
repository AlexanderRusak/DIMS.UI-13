export const toLowerCaseFirstLetter = (str) => {
    return str.charAt(0).toLowerCase() + str.slice(1);
}

export const toTrim = (str) => {
    return str.trim().replace(/\s/g, '');
}

export const isFormValid = (formControls) => {
    let isValid = true;
    Object.keys(formControls).forEach((name) => {
        isValid = formControls[name].valid && isValid;
    });
    return isValid; 
}

export const isValidFormCreateNewUsers = (fields) => {

    return Object.values(fields).every(field => !!field)
}