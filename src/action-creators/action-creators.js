export const CellMoneySet = (obj) => ({type: "CELL_MONEY_SET", payload: obj});
export const CellNumberSet = (obj) => ({type: "CELL_NUMBER_SET", payload: obj});
export const CellStringSet = (obj) => ({type: "CELL_STRING_SET", payload: obj});
export const CellFunctionSet = (obj) => ({type: "CELL_FUNCTION_SET", payload: obj});
export const CellHyperlinkSet = (obj) => ({type: "CELL_HYPERLINK_SET", payload: obj});

export const RefreshFunctions = () => ({type: "REFRESH_FUNCTIONS"});
export const CellFocusOn = (cell_id) => ({type: "CELL_FOCUS_ON", payload: {cell_id}});

export const FetchSnap = (link) => ({type: "FETCH_SNAP", payload: {link}});
export const HideSnap = () => ({type: "HIDE_SNAP"});

export const HeaderFieldChange = (obj) => ({type: "HEADER_FIELD_CHANGE", payload: {...obj}});