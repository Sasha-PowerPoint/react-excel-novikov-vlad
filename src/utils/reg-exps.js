export const isFunction = (text) => {
    if(text.match(/=\w+\([A-Z0-9; ]{0,}\){1}/g)){
        return (text.indexOf("=HYPERLINK(") === -1)
    }

};

export const isMoney = (text) => {
    return text.match(/[+-]?([0-9]*[.])?[0-9]+ [а-я]/)
};

export const isNumber = (text) => {
    return text.match(/^\d*\.?\d*$/gm);
};

export const isHyperlink = (text) => {
    if (text.indexOf("=HYPERLINK(") !== -1){
        const link = text.replace("=HYPERLINK(", "").replace(")", "");
        return link.match(/^(?:http(s)?:\/\/)?[\w.]+(?:\.[\w\.]+)+[\w\\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)
    }else{
        return false
    }
};

export const isString = (text) => {
    return true
};


