import React, {useState} from 'react';
import './how-to-use.css';

const HowToUse = () => {
    const [clickedToOpen, setClickedToOpen] = useState(false);

    return (
        <>
        <div className="how-to-use-wrapper">
            <h1 className="qm-holder">З чим це їсти <div className="qm" onClick={() => setClickedToOpen((state) => !state)}/></h1>
            <p/>
            {clickedToOpen ?
            <>
            <h3>Кольори/значення</h3>
            <p/>
            <div className="cell-color-wrapper">
                <p className="color-cell number">Число</p>
                <p className="color-cell string">Строка</p>
                <p className="color-cell money">Гроші</p>
                <p className="color-cell function">Формула</p>
                <p className="color-cell hyperlink">Гіперпосилання</p>
            </div>
            <p/>
            <h3>Формули</h3>
            <p/>
            <div className="functions-wrapper">
                <p>=SUM(A1;A2) - <strong>Сума</strong></p>
                <p>=CONCAT(A1;A2) - <strong>Конкатенація</strong></p>
                <p>=AVERAGE(A1;A2) - <strong>Середнє арифметичне</strong></p>
                <p>=HYPERLINK(http://example.com) - <strong>Гіперпосилання</strong></p>
            </div>
            <p/>
            <h3>Деталі</h3>
            <p/>
            <div className="functions-wrapper">
                <p><strong>Основне поле спрацьовує після натискання Enter-a</strong></p>
                <p><strong>Клітинки спрацьовують після втрати фокусу</strong></p>
                <p><strong>Прев'ю з'являється після наведення на валідне посилання</strong></p>
            </div>
            </>
            : null}
        </div>
        </>
    )
};

export default HowToUse;