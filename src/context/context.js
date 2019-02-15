import React from 'react';

const AppContext = React.createContext({
    dependencies : {
        "B1" : true,
        "A4" : true
    },
    cells : {
       /*"A1" : {
            type: "number",
            refactored: 2,
            value: 2
        },
        "C1" : {
            type: "function",
            refactored: 2,
            args : ["A1","A2"],
            value: "=CONCAT(A1;A2)"
        },
        "C2" : {
            type: "function",
            refactored: 2,
            args : ["A3","A2"],
            value: "=SUM(A3;A2)",
            currency : ""
        },
        "D2" : {
            type: "function",
            refactored: 2,
            args : ["E3","E2","E1"],
            value: "=AVERAGE(E1;E2;E3)",
            currency : ""
        },
        "A2" : {
            type: "money",
            currency: "грн",
            refactored: "1",
            value: "1 грн"
        },
        "A3" : {
            type: "money",
            currency: "дол",
            refactored: "6",
            value: "6 дол"
        },
        "E1" : {
            type: "number",
            refactored: 5,
            value: 5
        },
        "E2" : {
            type: "number",
            refactored: 2,
            value: 2
        },
        "E3" : {
            type: "number",
            refactored: 3,
            value: 3
        },
        "A4" : {
            type: "hyperlink",
            currency: "",
            refactored: "http://black.com",
            value: "=HYPERLINK(http://black.com)"
        },
        "B1" : {
            type: "hyperlink",
            currency: "",
            refactored: "http://www.youtube.com/",
            value: "=HYPERLINK(http://www.youtybe.com/)"
        },
        "B2" : {
            type: "hyperlink",
            currency: "",
            refactored: "http://www.rabota.ua/",
            value: "=HYPERLINK(http://www.rabota.ua/)"
        },
        "B3" : {
            type: "hyperlink",
            currency: "",
            refactored: "http://www.work.ua/",
            value: "=HYPERLINK(http://www.work.ua/)"
        }*/
    }
});

export default AppContext;