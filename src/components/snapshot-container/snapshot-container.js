import React, {useEffect, useState, useRef, useContext} from 'react';
import AppContext from '../../context';
import Spinner from '../spinner';
import './snapshot-container.css';

const SnapshotContainer = () => {
    const {state, dispatch} = useContext(AppContext);
    const [coords, setCoords] = useState({x: 0, y: 0});
    const [loading, setLoading] = useState(true);

    const container = useRef();

    const fetchImage = async () => {

            setTimeout(() => setLoading(false), 700);

    };

    useEffect(() => {
        setLoading(true);
        window.addEventListener("mousemove", (e) => setCoords({x: e.clientX + 15, y: e.clientY + 15}));
        fetchImage();

        return window.removeEventListener("mousemove", (e) => setCoords({x: e.clientX + 15, y: e.clientY + 15}));

    }, [state.linkSnap]);

    return (
        state.linkSnap
            ?
            <div ref={container}
                 className="card text-white bg-primary mb-3"
                 style={{
                     left: ((window.innerWidth - coords.x) > 425 ? coords.x : (coords.x - 430)) + "px",
                     top: ((window.innerHeight - coords.y) > 425 ? coords.y : (coords.y - 430)) + "px"
                 }}>
                {loading ? <Spinner/> : null}

                <div className="card-header">{state.linkSnap}</div>
                <div className="card-body"
                      style={{backgroundImage: `url('http://mini.s-shot.ru/?${state.linkSnap}')` }}/>

            </div>
            :
            null
    )
};

export default SnapshotContainer;