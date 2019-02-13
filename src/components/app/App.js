import React, {useReducer, useContext} from 'react';
import Header from '../header';
import CellsTable from '../cells-table';
import AppContext from '../../context';
import reducer from '../../reducers/reducer';

import './App.css';

const tableWidth = 5;
const tableHeight = 3;

const App = () => {

    const initialState = useContext(AppContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    return (
        <AppContext.Provider value={{state, dispatch, tableWidth, tableHeight}}>
            <div className="app-container">
                <Header/>
                <CellsTable/>
            </div>
        </AppContext.Provider>
    );

}

export default App;
