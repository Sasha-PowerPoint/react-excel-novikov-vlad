import React, {useContext, useRef} from 'react';
import AppContext from '../../context';

const Header = () => {

    const {state} = useContext(AppContext);
    const input = useRef();
    const OnSubmit = (e) => {
        e.preventDefault();
        alert(input.current.value);
    };

    return (
        <>
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
            <a className="navbar-brand" href="#">ReactEcxelNV</a>
            <form className="form-inline my-2 my-lg-0" onSubmit={(e) => OnSubmit(e)}>
                <input className="form-control mr-sm-2" type="text" ref={input}/>
            </form>
        </nav>
        <div className="header-fixer"/>
        </>
    )
};

export default Header;