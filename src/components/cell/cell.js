import React, {useState, useEffect, useContext, useRef, useReducer} from 'react';
import AppContext from '../../context';
import {CellSubmit} from "../../action-creators/action-creators";
import './cell.css';

const Cell = ({cell_id, cell_state}) => {
    const [valueType, setValueType] = useState("empty");
    const [value, setValue] = useState("");
    const [refactoredValue, setRefactoredValue] = useState(null);
    const [visibleValue, setVisibleValue] = useState(value);
    const [payload, setPayload] = useState({});
    const {dispatch} = useContext(AppContext);
    const [focused, setFocused] = useState(false);

    const cellInput = useRef();

    // /(\d)(?=(\d{3})+(\D|$))/g - ділення на три числа
    const setType = (text) => {
        console.log(focused);
        setValue(text);

        if (text) {
            if(text[0] === "="){
                setValueType("function");
                return true;
            }
            if (text.match(/[+-]?([0-9]*[.])?[0-9]+ [а-я]/)) {
                setValueType("money");
                return true;
            }
            if (text.match(/^\d+$/)) {
                setValueType("number");
                return true;
            }
            if (text.match(/^(?:http(s)?:\/\/)?[\w.]+(?:\.[\w\.]+)+[\w\\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)) {
                setValueType("hyperlink");
                return true;
            }
            if (text.match(/\w+/)) {
                setValueType("string");
                return true;
            }


        }
    };

    // =СУММ(A1; A2)

    const EvaluateString = (text) => {
        setFocused(false);
        switch (valueType) {
            case "function" :
                const funcName = text.substring(1, text.indexOf("("));
                const funcArgs = text.substring(text.indexOf("(")+1, text.indexOf(")")).replace(" ", "").split(";");
                console.log(funcName);
                console.log(funcArgs);

                return true;
            case "money":
                const getMoneyType = text.replace(/[+-]?([0-9]*[.])?[0-9]+ /g, "");
                const parsed = text.replace(/[ а-я]/g, "");
                const pointPosition = parsed.indexOf(".");

                const intPart = parseInt(parsed) + "";
                const intPartRefactored = intPart.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');

                let floatPartRefactored = '';
                if (pointPosition !== -1) {
                    const floatPart = parsed.substring(pointPosition, parsed.length);
                    floatPartRefactored = `.${floatPart[1] ? floatPart[1] : 0}${floatPart[2] ? floatPart[2] : 0}`
                } else {
                    floatPartRefactored = ".00";
                }
                console.log(getMoneyType);
                setVisibleValue(intPartRefactored + floatPartRefactored);
                setPayload({currency: getMoneyType});
                console.log("Money");
               // dispatch(CellSubmit({text, cell_id, cell_payload: getMoneyType, type: "money"}));
                return true;
            case "string" :
                console.log(`Строка`);
                console.log(parseInt(text.replace(" ", "")));
                setVisibleValue(text);
                return true;
            case "hyperlink" :
                console.log(`Гіперпосилання`);
                console.log(parseInt(text.replace(" ", "")));
                setVisibleValue(text);
                return true;
            case "number" :
                console.log(`Число`);
                console.log(parseInt(text.replace(" ", "")));
                setVisibleValue(text);
                return true;
        }


    };

    const Focused = () => {
            setFocused(true);
    };

    return (
        <>
        {payload.currency && !focused ? <p className="currency-shower">{payload.currency}</p> : null}
        <input
            ref={cellInput}
            onFocus={Focused}
            onChange={() => {setType(cellInput.current.value)}}
            onBlur={() => EvaluateString(cellInput.current.value)}
            value = {focused ? value : visibleValue}
            />
        </>
    )
};

export default Cell;