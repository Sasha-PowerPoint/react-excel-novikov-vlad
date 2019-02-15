import React, {useEffect, useState, useRef, useContext} from 'react';
import AppContext from '../../context';
import Spinner from '../spinner';
import './snapshot-container.css';

const SnapshotContainer = () => {
    const {state, dispatch} = useContext(AppContext);
    const [coords, setCoords] = useState({x: 0, y: 0});

    const container = useRef();

    useEffect(() => {
        window.addEventListener("mousemove", (e) => setCoords({x: e.clientX + 15, y: e.clientY + 15}));
        setTimeout(() => dispatch({type: "STOP_LOAD"}), 1500);
        return window.removeEventListener("mousemove", (e) => setCoords({x: e.clientX + 15, y: e.clientY + 15}));

    },[state.linkSnap]);

    return (
        state.linkSnap
            ?
            <div ref={container}
                 className="card text-white bg-primary mb-3"
                 style={{
                     left: ((window.innerWidth - coords.x) > 425 ? coords.x : (coords.x - 430)) + "px",
                     top: ((window.innerHeight - coords.y) > 425 ? coords.y : (coords.y - 430)) + "px"
                 }}>
                {!state.loading ?
                    <>
                    <div className="card-header">{state.linkSnap}</div>
                    < div className="card-body"
                    style={{backgroundImage: `url('http://mini.s-shot.ru/1024x768/400/jpeg/?${state.linkSnap}')`}}/>
                    </>
                    :
                    <Spinner/>
                }
            </div>
            :
            null
    )
};

export default SnapshotContainer;