const reducer = (state, action) => {
  switch (action.type){
      case "CELL_SUBMIT":
          console.log(action.payload);
          const newCells = Object.assign({...state.cells},{ [action.payload.cell_id] :{
                                                                                        text : action.payload.text,
                                                                                        type: action.payload.type,
                                                                                        cell_payload: action.payload.cell_payload,
                                                                                        refactored: action.payload.refactored
                                                                                        }});
          console.log(newCells);
          return Object.assign({...state},{cells:{...newCells}});
      case "CELL_FOCUS":
          return Object.assign({...state},{focusedCell: action.payload.cell_Id });
      default:
          return state;
  }
};

export default reducer;