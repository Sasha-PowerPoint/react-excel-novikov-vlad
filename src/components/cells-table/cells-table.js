import React, {useContext} from 'react';
import AppContext from '../../context';
import Cell from '../cell';

import './cells-table.css';

const CellsTable = () => {

    const {tableWidth, tableHeight} = useContext(AppContext);

    const GenerateNumberColumn = () => {
        const GenerateCells = () => {
            let cells = [];
            for (let i = 0; i < tableHeight; i++) {
                cells[i] = <li key={`~${i + 1}`}>{i + 1}</li>;
            }

            return cells;
        };

        return (
            <ul className="numbers">
                <li/>
                {GenerateCells()}
            </ul>
        )
    };

    const GenerateCellsColumn = ({counter}) => {

        const alphabet = "ABCDEFGHYJKLMNOPQRSTUVWXYZ";

        const GenerateCells = (counter) => {
            let cells = [];
            for (let i = 0; i < tableHeight; i++) {
                cells[i] = <li style={{position : "relative"}} key={alphabet[counter] + "" + (i + 1) + ""}><Cell
                    cell_id={alphabet[counter] + "" + (i + 1) + ""}/></li>;
            }
            return cells;
        };

        return (
            <ul className="cells">
                <li>{alphabet[counter]}</li>
                {GenerateCells(counter)}
            </ul>
        )
    };

    const GenerateColumns = () => {
        const alphabet = "ABCDEFGHYJKLMNOPQRSTUVWXYZ";

        let columns = [];

        for (let i = 0; i < tableWidth; i++) {
            columns[i] = <GenerateCellsColumn counter={i} key={alphabet[i]}/>;
        }

        return columns;
    };

    return (
        <div className="table-container">
            <GenerateNumberColumn/>
            <GenerateColumns/>
        </div>
    )
};

export default CellsTable;