import React, {useState, useEffect, useRef, memo} from 'react';
import {chooseType} from '../../utils/type-setter';

import {
    CellFunctionSet,
    FetchSnap,
    HideSnap,
    CellFocusOn
} from "../../action-creators/action-creators";

import {
    NumberCell,
    FunctionCell,
    HyperlinkCell,
    MoneyCell,
    StringCell,
    UntypifiedCell
} from './cell-types';

import './cell.css';


const Cell = (props) => {

    const {isntEmpty, cell_id, dispatch, focusedCell} = props;

    const [focused, setFocused] = useState(false);
    const [opened, setOpened] = useState(false);

    const cellInput = useRef();

    useEffect(() => {
        if (props.focusedCell === cell_id) {
            chooseType(props.value)
        }
        if (props.type === "function") {
            dispatch(CellFunctionSet({text: props.value, cell_id}));
        }
        if (isntEmpty) {
            cellInput.current.value = !focused ? props.refactored : props.value;
        } else {
            cellInput.current.value = "";
        }
    });

    const withProps = (jsx) => {
        return jsx(
            {
                ref : cellInput,
                onFocus : onFocus,
                onDoubleClick: onDoubleClick,
                onBlur : blurOnCell,
                error: props.error,
                currency : props.currency,
                focused : focused,
                focusedCell : focusedCell,
                onMouseOver : () => dispatch(FetchSnap(props.refactored)),
                onMouseLeave : () => dispatch(HideSnap()),

            }
        )
    };

    const onDoubleClick = () => {
        setOpened(true);
        setFocused(true);
    };

    const onFocus = () => {
        setFocused(true);
        dispatch(CellFocusOn(cell_id))
    };

    const blurOnCell = () => {

        setFocused(false);
        if(props.type === "" || props.type === "number" || props.type === "string"){
            console.log(cellInput.current.value);
            chooseType(cellInput.current.value, cell_id, dispatch)
        }else{
            if(opened){
                console.log("hhhhhhhhhhhh2");
                chooseType(cellInput.current.value, cell_id, dispatch)
            }
        }

        setOpened(false);
    };

    const TypifiedCell = () => {

        let cellToReturn;

        if (isntEmpty) {
            switch (props.type) {
                case "number":
                    cellToReturn = withProps(NumberCell);
                    break;
                case "money":
                    cellToReturn = withProps(MoneyCell);
                    break;
                case "string":
                    cellToReturn = withProps(StringCell);
                    break;
                case "function":
                    cellToReturn = withProps(FunctionCell);
                    break;
                case "hyperlink":
                    cellToReturn = withProps(HyperlinkCell);
                    break;
                default:
                    cellToReturn = withProps(UntypifiedCell);
                    break;
            }
        } else {
            cellToReturn = withProps(UntypifiedCell);
        }
        return cellToReturn;

    };

    return (
        <div className="input-wrapper">
            {TypifiedCell()}
        </div>
    );
};


export default memo(Cell);