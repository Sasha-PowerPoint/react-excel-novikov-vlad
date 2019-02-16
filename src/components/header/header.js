import React , { useContext, useEffect, useRef }from 'react';
import {chooseType} from '../../utils/type-setter';
import AppContext from '../../context';

import './header.css';

const Header = () => {

    const {state, dispatch} = useContext(AppContext);
    const headerInput = useRef();

    useEffect(() => {
        if(state.focusedCell && state.cells[state.focusedCell]){  //Чи вже був здійнений вибір клітинки і чи вона не пуста
            headerInput.current.value = state.cells[state.focusedCell].value;
        }else{
            headerInput.current.value = ' ';
        }
    }, [state.focusedCell]);

    const formSubmit = (e) => {
        e.preventDefault();
        chooseType(headerInput.current.value, state.focusedCell, dispatch);
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">ReactEcxelNV</a>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => formSubmit(e)}>
                <input ref={headerInput} className="form-control mr-sm-2" type="text" placeholder="Виберіть клітинку"/>
            </form>
        </nav>
    )
};

export default Header;