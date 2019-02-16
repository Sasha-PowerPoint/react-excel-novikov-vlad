import {
    isFunction,
    isNumber,
    isHyperlink,
    isString,
    isMoney
} from '../utils/reg-exps';
import {
    CellMoneySet,
    CellNumberSet,
    CellStringSet,
    CellFunctionSet,
    CellHyperlinkSet,
    RefreshFunctions
} from "../action-creators/action-creators";

const setAs = (type, data, dispatch) => {


    switch (type) {
        case "string":
            dispatch(CellStringSet(data));
            break;
        case "number":
            dispatch(CellNumberSet(data));
            break;
        case "function":
            dispatch(CellFunctionSet(data));
            break;
        case "money":
            dispatch(CellMoneySet(data));
            break;
        case "hyperlink":
            dispatch(CellHyperlinkSet(data));
            break;
        default:
            break;
    }
    dispatch(RefreshFunctions());
};

export const chooseType = (text, cell_id, dispatch) => {

    if (text) {
        if (isFunction(text)) {
            console.log("f");
            setAs("function", {text, cell_id}, dispatch);
            return true;
        }
        if (isMoney(text)) {
            console.log("m");
            setAs("money", {text, cell_id}, dispatch);
            return true;
        }
        if (isNumber(text)) {
            console.log("n");
            setAs("number", {text, cell_id}, dispatch);
            return true;
        }
        if (isHyperlink(text)) {
            console.log("h");
            setAs("hyperlink", {text, cell_id}, dispatch);
            return true;
        }
        if (isString(text)) {
            console.log("s");
            setAs("string", {text, cell_id}, dispatch);
            return true;
        }
    }
};

