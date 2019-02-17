import React, {useContext, useReducer} from 'react';

import Cell from '../cell';

import './cells-table.css';
import AppContext from "../../context/context";

const CellsTable = () => {

    const {state, dispatch, tableWidth, tableHeight} = useContext(AppContext);


    const GenerateLetterColumn = () => {
        const alphabet = "ABCDEFGHYJKLMNOPQRSTUVWXYZ";

        const GenerateCells = () => {
            let cells = [];
            for (let i = 0; i < tableWidth; i++) {
                cells[i] = <div key={`~${alphabet[i]}`}>{alphabet[i]}</div>;
            }

            return cells;
        };

        return (
            <div className="letters">
                <div/>
                {GenerateCells()}
            </div>
        )
    };

    const GenerateCells = (state, dispatch, tableWidth, tableHeight) => {
        const alphabet = "ABCDEFGHYJKLMNOPQRSTUVWXYZ";
        let rows = [];

        for (let i = 0; i < tableHeight; i++) {
            let row = [];
            for (let j = 0; j < tableWidth; j++) {
                const id = `${alphabet[j]}${i+1}`;

                const evalArgs = (arr) => {
                    if(!state.cells[id] || !arr){
                        return true;
                    }
                    const data =[];
                    for (let i = 0; i < arr.length; i++){
                        data[i] = state.cells[arr[i]] ? state.cells[arr[i]].refactored + "" : null;
                    }
                    for (let i = 0; i < arr.length; i++){
                        data[i + arr.length] = state.cells[arr[i]] ? state.cells[arr[i]].refactored + "" : null;
                    }
                    return data
                };

                const isFocused = (cell_id) =>{
                    return state.focusedCell === cell_id
                }

                row[j] = !!state.cells[id] ?
                         <Cell key={id}
                               cell_id={id}
                               type={state.cells[id].type}
                               refactored={state.cells[id].refactored}
                               value={state.cells[id].value}
                               currency={state.cells[id].currency}
                               isntEmpty={!!state.cells[id]}
                               {...evalArgs(state.cells[id].args)} // function cell re-rendering forcing
                               dispatch={dispatch}
                               error={state.cells[id].error}
                               resultType={!!state.cells[id].resultType ? state.cells[id].resultType : ""}
                               focusedCell={isFocused(id)}
                         />
                         :
                         <Cell key={id}
                               cell_id={id}
                               type={"empty"}
                               refactored={""}
                               currency={""}
                               value={""}
                               isntEmpty={false}
                               dispatch={dispatch}
                               error={false}
                               resultType=""
                               focusedCell={isFocused(id)}
                         />
            }
            rows[i] = <div key={"row" + (i+1)} className="table-row">
                        {row}
                      </div>;
            row = [];
        }
        return rows;
    };

    const GenerateNumberColumn = () => {

        let columns = [];

        for (let i = 0; i < tableHeight; i++) {
            columns[i] = <div key={"~" + (i+1)}>{i + 1}</div>;
        }

        return <div className="numbers">
            {columns}
        </div>;
    };

    return (
        <div className="table-container">
                <div className="table-display">
                    <GenerateLetterColumn/>
                    <div className="table-second">
                        <GenerateNumberColumn/>
                        <div className="table-rows">
                            {GenerateCells(state, dispatch, tableWidth, tableHeight)}
                        </div>
                    </div>
                </div>

        </div>
    )
};

export default CellsTable;