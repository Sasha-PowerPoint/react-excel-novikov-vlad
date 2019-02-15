import React, {useContext, useReducer} from 'react';
import reducer from '../../reducers/reducer';
import AppContext from '../../context';
import Header from '../header';
import CellsTable from '../cells-table';
import SnapshotContainer from '../snapshot-container';

import './App.css';


const App = () => {

    const tableWidth = 5;
    const tableHeight = 5;

    const initialState = useContext(AppContext);

    const [state, dispatch] = useReducer(reducer, initialState);

    return (

        <div className="app-container">
            <AppContext.Provider value={{state, dispatch, tableWidth, tableHeight}}>
                <SnapshotContainer/>
                <Header/>
                <CellsTable/>
            </AppContext.Provider>
        </div>

    );

}

export default App;
