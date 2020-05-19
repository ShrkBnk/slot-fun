export const symbolsList = [
    "3xBAR",
    "BAR",
    "2xBAR",
    "7",
    "Cherry"
];

const winningLines = [
    {
        line: ["Cherry", "Cherry", "Cherry"],
        price: 1000,
    },
    {
        line: ["7", "7", "7"],
        price: 150
    },
    {
        line: ["Cherry", "Cherry", "7"],
        price: 75
    },
    {
        line: ["Cherry", "7", "Cherry"],
        price: 75
    },
    {
        line: ["7", "Cherry", "Cherry"],
        price: 75
    },
    {
        line: ["3xBAR", "3xBAR", "3xBAR"],
        price: 50
    },
    {
        line: ["2xBAR", "2xBAR", "2xBAR"],
        price: 20
    },
    {
        line: ["BAR", "BAR", "BAR"],
        price: 10
    },


    {
        line: ["3xBAR", "BAR", "BAR"],
        price: 5
    },
    {
        line: ["2xBAR", "BAR", "BAR"],
        price: 5
    },
    {
        line: ["7", "BAR", "BAR"],
        price: 5
    },
    {
        line: ["Cherry", "BAR", "BAR"],
        price: 5
    },


    {
        line: ["BAR", "BAR", "3xBAR"],
        price: 5
    },
    {
        line: ["BAR", "BAR", "2xBAR"],
        price: 5
    },
    {
        line: ["BAR", "BAR", "7"],
        price: 5
    },
    {
        line: ["BAR", "BAR", "Cherry"],
        price: 5
    }

];

function arraysEqual(arrayA, arrayB) {
    return JSON.stringify(arrayA) === JSON.stringify(arrayB);
}

export function winningFormula(winningSymbols) {

    let topLine = [];
    let centerLine = [];
    let bottomLine = [];

    winningSymbols.forEach(line => {
        let NULL = "NULL";
        if (line.length === 2) {
            topLine.push(line[0]);
            centerLine.push(NULL);
            bottomLine.push(line[1]);
        } else {
            topLine.push(NULL);
            centerLine.push(line[1]);
            bottomLine.push(NULL);
        }
    });

    // console.log("TOP: ", topLine);
    // console.log("CENTER: ", centerLine);
    // console.log("BOTTOM: ", bottomLine);

    let winningPrice = 0;
    winningLines.forEach(({line, price}) => {
        if (arraysEqual(line, topLine)) {
            if (price === 1000) {
                price = price * 2
            }
            winningPrice += price;
        }
        if (arraysEqual(line, centerLine)) {
            winningPrice += price;
        }
        if (arraysEqual(line, bottomLine)) {
            if (price === 1000) {
                price = price * 4
            }
            winningPrice += price;
        }
    });

    return winningPrice;

}

export function winningFormulaForWinningLine(winningSymbols) {

    let topLine = [];
    let centerLine = [];
    let bottomLine = [];

    winningSymbols.forEach(line => {
        let NULL = "NULL";
        if (line.length === 2) {
            topLine.push(line[0]);
            centerLine.push(NULL);
            bottomLine.push(line[1]);
        } else {
            topLine.push(NULL);
            centerLine.push(line[1]);
            bottomLine.push(NULL);
        }
    });

    let lineNumber = [];
    winningLines.forEach(({line}) => {

        if (arraysEqual(line, topLine)) {
            lineNumber.push("TOP");
        }

        if (arraysEqual(line, centerLine)) {
            lineNumber.push("CENTER");
        }

        if (arraysEqual(line, bottomLine)) {
            lineNumber.push("BOTTOM");
        }

    });


    return lineNumber;


}

export function winningFormulaForWinningSymbols(winningSymbols) {

    let topLine = [];
    let centerLine = [];
    let bottomLine = [];

    winningSymbols.forEach(line => {
        let NULL = "NULL";
        if (line.length === 2) {
            topLine.push(line[0]);
            centerLine.push(NULL);
            bottomLine.push(line[1]);
        } else {
            topLine.push(NULL);
            centerLine.push(line[1]);
            bottomLine.push(NULL);
        }
    });

    let lineSymbols = [];
    winningLines.forEach(({line}) => {

        if (arraysEqual(line, topLine)) {
            lineSymbols.push(line);
        }

        if (arraysEqual(line, centerLine)) {
            lineSymbols.push(line);
        }

        if (arraysEqual(line, bottomLine)) {
            lineSymbols.push(line);
        }

    });


    return lineSymbols;


}
