import React from 'react';

export const NumberCell = ({ref, onFocus, onBlur, onDoubleClick, focusedCell}) => {
    return (
        <input className={`number-back ${focusedCell ? "focused-cell" : ''}`}
               ref={ref}
               onDoubleClick={onDoubleClick}
               onFocus={onFocus}
               onBlur={onBlur}
        />
    )
};

export const MoneyCell = ({focused, currency, ref, onFocus, onBlur, onDoubleClick, focusedCell}) => {
    return (
        <>
        {!focused ? <p className="currency-shower">{currency}</p> : null}
        <input className={`money-back + ${focusedCell ? " focused-cell " : ""}`}
               ref={ref}
               onDoubleClick={onDoubleClick}
               onFocus={onFocus}
               onBlur={onBlur}
        />
        </>
    )
};

export const StringCell = ({ref, onFocus, onBlur, onDoubleClick, focusedCell}) => {
    return (
        <input className={`string-back + ${focusedCell ? " focused-cell " : ''}`}
               onDoubleClick={onDoubleClick}
               onFocus={onFocus}
               ref={ref}
               onBlur={onBlur}
        />
    )
};

export const FunctionCell = ({error, currency, focused, onFocus, ref, onBlur, onDoubleClick, focusedCell}) => {
    return (
        <>
        {!focused ? <p className="currency-shower">{currency}</p> : null}
        <input className={`${error && !focused ? "formula-error" : "formula-back"}  ${focusedCell ? " focused-cell " : ''}`}
               onDoubleClick={onDoubleClick}
               onFocus={onFocus}
               ref={ref}
               onBlur={onBlur}
        />
        </>
    )
};

export const HyperlinkCell = ({focused, ref, onFocus, onBlur, onMouseOver, onMouseLeave, onDoubleClick, focusedCell}) => {
    return (
        <input className={focusedCell ? "focused-cell" : ''}
               style={!focused ? {color: "blue", textDecoration: "underline"} : null}
               onDoubleClick={onDoubleClick}
               ref={ref}
               onFocus={onFocus}
               onBlur={onBlur}
               onMouseOver={onMouseOver}
               onMouseLeave={onMouseLeave}
        />
    );
};

export const UntypifiedCell = ({ref,onFocus,onBlur, onDoubleClick, focusedCell}) => {

    return (
        <input className={focusedCell ? "focused-cell" : ''}
            onDoubleClick={onDoubleClick}
            ref={ref}
            onFocus={onFocus}
            onBlur={onBlur}
        />
    );
};