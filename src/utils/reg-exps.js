export const isFunction = (text) => {
    if(text.match(/=\s*\w+\([A-Z0-9; ]{0,}\){1}\s*/g)){
        return (text.indexOf("=HYPERLINK(") === -1)
    }

};

export const isMoney = (text) => {
    return text.match(/\s*[+-]?([0-9]*[.])?[0-9]+ [а-я]\s*/)
};

export const isNumber = (text) => {
    return text.match(/^-?\s*\d*\.?\d*\s*$/gm);
};

export const isHyperlink = (text) => {
    if (text.indexOf("=HYPERLINK(") !== -1){
        const link = text.replace("=HYPERLINK(", "").replace(")", "");
        return link.match(/^(https?|ftp|torrent|image|irc):\/\/(-?\.)?([^\s\/?\.#-?]+\.?)+(\/[^\s]*)?$/i)
    }else{
        return false
    }
};

export const isString = (text) => {
    return true
};


