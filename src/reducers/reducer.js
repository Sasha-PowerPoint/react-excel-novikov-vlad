const reducer = (state, action) => {


    switch (action.type) {
        case "HIDE_SNAP":
            return Object.assign({...state}, {linkSnap: null,
                                              loading : true});
        case "STOP_LOAD":
            return Object.assign({...state}, {loading : false});
        case "FETCH_SNAP":
            return Object.assign({...state}, {linkSnap: action.payload.link,
                                              loading : true});
        case "CELL_FOCUS_ON" :
            return Object.assign({...state}, {focusedCell: action.payload.cell_id});
        case "CELL_STRING_SET" :

            const newStringCells = Object.assign({...state.cells}, {
                [action.payload.cell_id]: {
                    type: "string",
                    value: action.payload.text,
                    refactored: action.payload.text
                }
            });
            return Object.assign({...state}, {cells: {...newStringCells}});
        case "CELL_MONEY_SET":

            const getMoneyType = action.payload.text.replace(/[+-]?([0-9]*[.])?[0-9]+ /g, "");
            const parsed = action.payload.text.replace(/[ а-я]/g, "");
            const pointPosition = parsed.indexOf(".");
            const intPart = parseInt(parsed) + "";
            const intPartRefactored = intPart.replace(/(\d)(?=(\d{3})+(\D|$))/g, '$1 ');

            let floatPartRefactored = '';
            if (pointPosition !== -1) {
                const floatPart = parsed.substring(pointPosition, parsed.length);
                floatPartRefactored = `.${floatPart[1] ? floatPart[1] : 0}${floatPart[2] ? floatPart[2] : 0}`
            } else {
                floatPartRefactored = ".00";
            }
            const newCellsMoney = Object.assign({...state.cells}, {
                [action.payload.cell_id]: {
                    type: "money",
                    currency: getMoneyType,
                    refactored: intPartRefactored + floatPartRefactored,
                    value: action.payload.text
                }
            });

            return Object.assign({...state}, {cells: newCellsMoney});
        case "CELL_NUMBER_SET":
            const newNumberCells = Object.assign({...state.cells}, {
                [action.payload.cell_id]: {
                    type: "number",
                    value: action.payload.text,
                    refactored: action.payload.text
                }
            });
            return Object.assign({...state}, {cells: {...newNumberCells}});
        case "CELL_FUNCTION_SET":
            const evalArgs = (arr) => {
                let values = [];
                for (let i = 0; i < arr.length; i++) {
                    if (!state.cells[arr[i]]) {
                        return {message: "Невірні координати!"};
                    }
                    values[i] = state.cells[arr[i]].refactored + "";
                }
                return values;
            };

            const concat = (values) => {
                let concatinationResult = "";

                for (let i = 0; i < values.length; i++) {
                    concatinationResult += (values[i] + "");
                }
                return concatinationResult;
            };

            const sum = (args) => {
                let types = [];
                let currencies = [];
                let result = 0;


                for (let i = 0; i < args.length; i++) {
                    if (!state.cells[args[i]]) {
                        return {message: "Невірні координати!"};
                    }
                    if (state.cells[args[i]].type === "function") {
                        types[i] = state.cells[args[i]].resultType;
                    } else {
                        types[i] = state.cells[args[i]].type;
                    }
                }

                const mainCurrency = state.cells[args[0]].currency;
                const mainType = state.cells[args[0]].type;

                for (let i = 1; i < types.length; i++) {
                    if ((types[i] !== "number") && (types[i] !== "money")) {
                        return {message: "Невірні типи!"};
                    }
                }

                for (let i = 1; i < types.length; i++) {
                    if (types[0] !== types[i]) {

                        return {message: "Різні типи!"};
                    }
                }


                if (types[0] === "number") {

                    for (let i = 0; i < args.length; i++) {
                        result += parseFloat(state.cells[args[i]].refactored)
                    }
                    return {result, mainType};
                }

                if (types[0] === "money") {

                    for (let i = 0; i < args.length; i++) {
                        currencies[i] = state.cells[args[i]].currency;
                    }

                    for (let i = 1; i < types.length; i++) {
                        if (currencies[0] !== currencies[i]) {

                            return {message: "Різні валюти!"};
                        }
                    }
                    for (let i = 0; i < args.length; i++) {
                        result += parseFloat(state.cells[args[i]].refactored);


                    }
                    return {result, mainType, mainCurrency};
                }
            };

            const average = (args) => {
                let types = [];
                let currencies = [];
                let result = 0;


                for (let i = 0; i < args.length; i++) {
                    if (!state.cells[args[i]]) {
                        return {message: "Невірні координати!"};
                    }
                    if (state.cells[args[i]].type === "function") {
                        types[i] = state.cells[args[i]].resultType;
                    } else {
                        types[i] = state.cells[args[i]].type;
                    }

                }

                const mainCurrency = state.cells[args[0]].currency;
                const mainType = state.cells[args[0]].type;

                for (let i = 1; i < types.length; i++) {
                    if ((types[i] !== "number") && (types[i] !== "money")) {

                        return {message: "Невірні типи!"};
                    }
                }

                for (let i = 1; i < types.length; i++) {
                    if (types[0] !== types[i]) {

                        return {message: "Різні типи!"};
                    }
                }


                if (types[0] === "number") {

                    let numberSum = 0;
                    for (let i = 0; i < args.length; i++) {
                        numberSum += parseFloat(state.cells[args[i]].refactored);
                    }
                    return {result: numberSum / args.length, mainType};
                }

                if (types[0] === "money") {
                    let moneySum = 0;

                    for (let i = 0; i < args.length; i++) {
                        currencies[i] = state.cells[args[i]].currency;
                    }

                    for (let i = 1; i < types.length; i++) {
                        if (currencies[0] !== currencies[i]) {

                            return {message: "Різні валюти!"};
                        }
                    }
                    for (let i = 0; i < args.length; i++) {
                        moneySum += parseFloat(state.cells[args[i]].refactored);

                    }
                    return {result: moneySum / args.length, mainType, mainCurrency};
                }
            };

            if (action.payload.text.indexOf("CONCAT") === 1) {
                const args = action.payload.text.replace("=CONCAT(", "").replace(")", "").replace(" ", "").split(";");

                const newFunctionConcatCells = Object.assign({...state.cells},
                    {
                        [action.payload.cell_id]: {
                            type: "function",
                            value: action.payload.text,
                            args: args,
                            refactored: concat(evalArgs(args)),
                        }
                    });
                return Object.assign({...state}, {cells: {...newFunctionConcatCells}}, {dependencies: {[action.payload.cell_id]: false}});
            }
            if (action.payload.text.indexOf("SUM") === 1) {
                const args = action.payload.text.replace("=SUM(", "").replace(")", "").replace(" ", "").split(";");

                const sumResult = sum(args);
                //alert(!!sumResult.message);
                const newFunctionSumCells = Object.assign({...state.cells},
                    {
                        [action.payload.cell_id]: {
                            type: "function",
                            value: action.payload.text,
                            args: args,
                            refactored: !!sumResult.result ? sumResult.result : sumResult.message,
                            currency: sumResult.mainType === "money" ? sumResult.mainCurrency : "",
                            error: !!sumResult.message,
                            resultType: sumResult.mainType
                        }
                    });
                return Object.assign({...state}, {cells: {...newFunctionSumCells}}, {dependencies: {[action.payload.cell_id]: false}});

            }
            if (action.payload.text.indexOf("AVERAGE") === 1) {
                const args = action.payload.text.replace("=AVERAGE(", "").replace(")", "").replace(" ", "").split(";");

                const sumResult = average(args);
                //alert(!!sumResult.message);
                const newFunctionAverageCells = Object.assign({...state.cells},
                    {
                        [action.payload.cell_id]: {
                            type: "function",
                            value: action.payload.text,
                            args: args,
                            refactored: !!sumResult.result ? sumResult.result.toFixed(2) : sumResult.message,
                            currency: sumResult.mainType === "money" ? sumResult.mainCurrency : "",
                            error: !!sumResult.message,
                            resultType: sumResult.mainType
                        }
                    });
                return Object.assign({...state}, {cells: {...newFunctionAverageCells}}, {dependencies: {[action.payload.cell_id]: false}});

            }
            return state;
        case "CELL_HYPERLINK_SET":
            const link = action.payload.text.replace("=HYPERLINK(", "").replace(")", "");

            const newHyperlinkCells = Object.assign({...state.cells}, {
                [action.payload.cell_id]: {
                    type: "hyperlink",
                    value: action.payload.text,
                    refactored: link
                }
            });
            console.log(Object.assign({...state}, {cells: {...newHyperlinkCells}}));
            return Object.assign({...state}, {cells: {...newHyperlinkCells}});
        case "CELL_FOCUS":
            return Object.assign({...state}, {focusedCell: action.payload.cell_Id});
        case "REFRESH_FUNCTIONS":
            return {...state};
        case "HEADER_FIELD_CHANGE":
            const newOnChangedCells = Object.assign({...state.cells[action.payload.cell_id]}, {
                value: action.payload.text,
                refactored: action.payload.text});
            const withOnChangedCell = Object.assign({...state.cells}, {[action.payload.cell_id] : newOnChangedCells});
            console.log(Object.assign({...state}, {cells: {...withOnChangedCell}}));
            return Object.assign({...state}, {cells: {...withOnChangedCell}});
        default:
            return state;
    }
};

export default reducer;