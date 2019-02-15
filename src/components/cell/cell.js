import React, {useState, useEffect,  useRef, memo} from 'react';
import {CellMoneySet,
        CellNumberSet,
        CellStringSet,
        CellFunctionSet,
        CellHyperlinkSet,
        RefreshFunctions,
        CellFocusOn,
        FetchSnap,
        HideSnap} from "../../action-creators/action-creators";

import './cell.css';


const Cell = (props) => {
    const {isntEmpty, cell_id, dispatch, type} = props;

    if(type === "function"){
        console.log(props);
    }

    const [focused, setFocused] = useState(false);
    const cellInput = useRef();

    const setType = (text) => {
        setFocused(false);
        if (text) {
            if(text.match(/=\w+\([A-Z0-9; ]{0,}\){1}/g)){
                if(text.indexOf("=HYPERLINK(") !== -1){
                    return true;
                }
                dispatch(CellFunctionSet({text,cell_id}));
                dispatch(RefreshFunctions());
                return true;
            }
            if (text.match(/[+-]?([0-9]*[.])?[0-9]+ [а-я]/)) {
                dispatch(CellMoneySet({text,cell_id}));
                dispatch(RefreshFunctions());
                return true;
            }
            if (text.match(/^\d+$/)) {
                dispatch(CellNumberSet({text,cell_id}));
                dispatch(RefreshFunctions());
                return true;
            }
            if(text.indexOf("=HYPERLINK(") !== -1){
                const link = text.replace("=HYPERLINK(", "").replace(")", "");
                if (link.match(/^(?:http(s)?:\/\/)?[\w.]+(?:\.[\w\.]+)+[\w\\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/gm)) {
                    dispatch(CellHyperlinkSet({text,cell_id}));
                    dispatch(RefreshFunctions());
                    return true;
                }else{
                    dispatch(CellStringSet({text,cell_id}));
                    dispatch(RefreshFunctions());
                }
                return true;
            }

                dispatch(CellStringSet({text,cell_id}));
                dispatch(RefreshFunctions());
                return true;



        }

    };

    const focusOnCell = () => {
        setFocused(true);
        dispatch(CellFocusOn(cell_id))
    };

    useEffect(() => {
        if(props.type === "function"){
                dispatch(CellFunctionSet({text : props.value, cell_id}));
        }
        if(isntEmpty){
            cellInput.current.value = !focused ? props.refactored : props.value;
        }else{
            cellInput.current.value = "";
        }
    });

    const renderCell = () => {
        if(isntEmpty){
            switch (props.type){
                case "number":
                    return(
                        <input  className="number-back"
                                ref={cellInput}
                                onFocus={focusOnCell}
                                onBlur={() => setType(cellInput.current.value)}
                        />
                    );
                case "money":
                    return(
                        <>
                        {!focused ? <p className="currency-shower">{props.currency}</p> : null}
                        <input className="money-back"
                            ref={cellInput}
                            onFocus={focusOnCell}
                            onBlur={() => setType(cellInput.current.value)}
                        />
                        </>
                    );
                case "string":
                    return(
                        <input className="string-back"
                               onFocus={focusOnCell}
                            ref={cellInput}
                            onBlur={() => setType(cellInput.current.value)}
                        />
                    );
                case "function":
                    return(
                        <>
                        {!focused ? <p className="currency-shower">{props.currency}</p> : null}
                        <input className={props.error && !focused ? "formula-error" : "formula-back"}
                               onFocus={focusOnCell}
                               ref={cellInput}
                               onBlur={() => setType(cellInput.current.value)}
                        />
                        </>
                    );
                case "hyperlink":
                    return(
                            <input style={!focused ? {color: "blue", textDecoration : "underline"} : null}
                                   ref={cellInput}
                                   onFocus={focusOnCell}
                                   onBlur={() => setType(cellInput.current.value)}
                                   onMouseOver={()=>dispatch(FetchSnap(props.refactored))}
                                   onMouseLeave={()=>dispatch(HideSnap())}
                            />
                    );
                default:
                    return(
                        <input
                            ref={cellInput}
                            onFocus={focusOnCell}
                            onBlur={() => setType(cellInput.current.value)}
                            style={{background : "red"}}
                        />
                    );
            }
        }else{
            return(
                <>
                <input
                    ref={cellInput}
                    onFocus={focusOnCell}
                    onBlur={() => setType(cellInput.current.value)}
                />
                </>
            );
        }

    };

    return (
        <div className="input-wrapper">
            {renderCell()}
        </div>
    );
};

export default memo(Cell);