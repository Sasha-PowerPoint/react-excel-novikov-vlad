export const CellSubmit = (obj) => ({type: "CELL_SUBMIT", payload: obj});
export const CellFocus = (cell_id) => ({type: "CELL_FOCUS", payload: {cell_id}});