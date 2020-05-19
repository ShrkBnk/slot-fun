import {default as React, useEffect, useState, useRef} from "react";
import Symbol from "./Symbol";
import PayTable from "./PayTable/PayTable";
import {winningFormula, winningFormulaForWinningLine, symbolsList, winningFormulaForWinningSymbols} from './Winning'
import ReelElement from "./Element/ReelElement";
import '../css/debugging.scss'
import '../css/controls.scss'

function nextNumber(number) {
    if (number === 4) {
        return 0;
    } else {
        return number + 1
    }
}

function previousNumber(number) {
    if (number === 0) {
        return 4;
    } else {
        return number - 1
    }
}

function makeUniqueRandomReel() {
    let symbols = Symbol.symbols;
    let randomSymbol = Symbol.random();

    let first = symbols.indexOf(randomSymbol);
    let randomA = symbols[first];

    let second = nextNumber(first);
    let randomB = symbols[second];

    let third = nextNumber(second);
    let randomC = symbols[third];

    return [randomA, randomB, randomC];
}

const App = () => {

    // Editable values
    const [symbols, setSymbols] = useState([]);
    const [spinningSpeed, setSetSpinningSpeed] = useState(0);
    const [bet, setBet] = useState(1);
    const [credit, setCredit] = useState(5000);
    const [elementsDisabledTime, setElementsDisabled] = useState(3100);
    const [delay, setDelay] = useState(0.5);
    const [debuggingMode, setDebuggingMode] = useState(false);
    const startSpinningBtn = useRef(null);

    const [debugReelLeft, setDebugReelLeft] = useState("Cherry");
    const [debugReelCenter, setDebugReelCenter] = useState("Cherry");
    const [debugReelRight, setDebugReelRight] = useState("Cherry");

    const [debugReelLeftPosition, setDebugReelLeftPosition] = useState(2);
    const [debugReelCenterPosition, setDebugReelCenterPosition] = useState(2);
    const [debugReelRightPosition, setDebugReelRightPosition] = useState(2);

    const [winningPosition, setWinningPosition] = useState([]);
    const [winningSymbols, setWinningSymbols] = useState([]);


    useEffect(() => {
        spin(true);
    }, []);

    function startingValues() {

        let lineOne = ["2xBAR", "7", "Cherry"];
        let lineTwo = ["7", "Cherry"];
        let lineThree = ["2xBAR", "7", "Cherry"];

        return [lineOne, lineTwo, lineThree];
    }

    function randomValues() {

        const percentage = 0.5;

        let lineOne = makeUniqueRandomReel();
        if (Math.random() >= percentage) {
            lineOne.pop();
        }
        let lineTwo = makeUniqueRandomReel();
        if (Math.random() >= percentage) {
            lineTwo.pop();
        }
        let lineThree = makeUniqueRandomReel();
        if (Math.random() >= percentage) {
            lineThree.pop();
        }

        return [lineOne, lineTwo, lineThree];
    }

    function makeNewReelFormation(correctLine, selectedSymbol, selectedPosition) {

        let symbolPosition = symbolsList.indexOf(selectedSymbol);
        let next = nextNumber(symbolPosition);
        let prev = previousNumber(symbolPosition);

        if (selectedPosition === 0) {
            correctLine[0] = selectedSymbol;
            correctLine[1] = symbolsList[next];
        }
        if (selectedPosition === 1) {
            correctLine[0] = symbolsList[prev];
            correctLine[1] = selectedSymbol;
            correctLine[2] = symbolsList[next];
        }
        if (selectedPosition === 2) {
            correctLine[0] = symbolsList[prev];
            correctLine[1] = selectedSymbol;
        }

        return correctLine;
    }

    function fixedValues() {

        let lineOne = [];
        let lineTwo = [];
        let lineThree = [];

        let arr = [
            {
                currentReel: 0,
                selectedPosition: debugReelLeftPosition,
                selectedSymbol: debugReelLeft,
            },
            {
                currentReel: 1,
                selectedPosition: debugReelCenterPosition,
                selectedSymbol: debugReelCenter
            },
            {
                currentReel: 2,
                selectedPosition: debugReelRightPosition,
                selectedSymbol: debugReelRight
            }
        ];

        arr.forEach(({currentReel, selectedSymbol, selectedPosition}) => {
            let line = lineOne;

            if (currentReel === 1) {
                line = lineTwo;
            }

            if (currentReel === 2) {
                line = lineThree;
            }

            //Makes formation what we need
            makeNewReelFormation(line, selectedSymbol, selectedPosition)
        });

        return [lineOne, lineTwo, lineThree];
    }

    function spin(preValue) {

        let creditCurrent = credit - bet;
        setCredit(creditCurrent);
        setWinningPosition([]);
        setWinningSymbols([]);

        if (preValue) {
            setSetSpinningSpeed(0);
            setDelay(0);
            setCredit(5000);
            setSymbols(startingValues());

        } else {

            setSetSpinningSpeed(2);
            setDelay(0.5);

            let symbolsLocal = [];

            if (debuggingMode) {

                // DEBUGGING NOT CHANGE CREDIT
                // setCredit(5000);
                symbolsLocal = fixedValues();
                setSymbols(symbolsLocal)

            } else {
                symbolsLocal = randomValues();
                setSymbols(symbolsLocal);
            }

            startSpinningBtn.current.setAttribute("disabled", true);

            const timer = setTimeout(() => {

                startSpinningBtn.current.removeAttribute("disabled");
                let winningPrice = winningFormula(symbolsLocal);
                let winningLinesCurrentSpin = winningFormulaForWinningLine(symbolsLocal);
                let winningLinesCurrentSymbols = winningFormulaForWinningSymbols(symbolsLocal);
                setWinningPosition(winningLinesCurrentSpin);
                setWinningSymbols(winningLinesCurrentSymbols);

                if (winningPrice > 0) {
                    setCredit(creditCurrent + (winningPrice * bet));
                }

            }, elementsDisabledTime);
            return () => clearTimeout(timer);
        }

    }

    function setMode() {
        setDebuggingMode(!debuggingMode);
        setBet(1);
    }

    function setDebugSymbol(value, index) {
        if (index === 0) {
            setDebugReelLeft(value)
        }
        if (index === 1) {
            setDebugReelCenter(value)
        }
        if (index === 2) {
            setDebugReelRight(value)
        }
    }

    function setDebugSymbolPosition(value, index) {
        if (index === 0) {
            setDebugReelLeftPosition(value)
        }
        if (index === 1) {
            setDebugReelCenterPosition(value)
        }
        if (index === 2) {
            setDebugReelRightPosition(value)
        }
    }

    function makeActive(symbol, index) {
        if (symbol === debugReelLeft && index === 0) {
            return "symbol active"
        }
        if (symbol === debugReelCenter && index === 1) {
            return "symbol active"
        }
        if (symbol === debugReelRight && index === 2) {
            return "symbol active"
        }
        return "symbol"
    }

    function makeActivePosition(symbol, index) {
        if (symbol === debugReelLeftPosition && index === 0) {
            return "position active"
        }
        if (symbol === debugReelCenterPosition && index === 1) {
            return "position active"
        }
        if (symbol === debugReelRightPosition && index === 2) {
            return "position active"
        }
        return "position"
    }

    function handleInputValue(value) {
        if (value > 5000) {
            setBet(5000)
        } else if(value <= -1) {
            setBet(1)
        } else {
            setBet(value);
        }
    }

    const DebugSelectors = props => {
        return <>
            <div className="debug-symbols">
                {symbolsList.map((symbol, i) => {
                    return (<div key={i}
                                 className={makeActive(symbol, props.index)}
                                 onClick={() => setDebugSymbol(symbol, props.index)}>
                        {symbol}
                    </div>)
                })}
            </div>


            <div className="debug-lines">
                <div className={makeActivePosition(0, props.index)}
                     onClick={() => setDebugSymbolPosition(0, props.index)}>TOP
                </div>
                <div className={makeActivePosition(1, props.index)}
                     onClick={() => setDebugSymbolPosition(1, props.index)}>MIDDLE
                </div>
                <div className={makeActivePosition(2, props.index)}
                     onClick={() => setDebugSymbolPosition(2, props.index)}>BOTTOM
                </div>
            </div>

        </>
    };

    return (
        <div id="main">

            <div className="machine">

                <div className="winning-lines">
                    <div className="winning-line-top" style={{visibility: winningPosition.includes("TOP") ? "inherit" : "hidden"}}/>
                    <div className="winning-line-center" style={{visibility: winningPosition.includes("CENTER") ? "inherit" : "hidden"}}/>
                    <div className="winning-line-bottom" style={{visibility: winningPosition.includes("BOTTOM") ? "inherit" : "hidden"}}/>
                </div>

                <div id="reels">
                    {symbols.map((symbol, i) => {
                        let speed = spinningSpeed;
                        if (i === 1) {
                            speed = spinningSpeed + delay;
                        }
                        if (i === 2) {
                            speed = spinningSpeed + (delay * 2);
                        }
                        return <ReelElement key={i} symbol={symbol} speed={speed}/>
                    })}
                </div>

                <div id="controls">

                    <div className="credits">
                        <p>Credits</p>
                        <p>{credit}</p>
                    </div>

                    <div className="bet">
                        <p>Bet</p>
                        {debuggingMode ?
                            <>
                                <input max={5000}
                                       min={1}
                                       type="number"
                                       value={bet}
                                       onChange={e => handleInputValue(e.target.value)}/>
                                {/*<p>{bet}</p>*/}
                            </>

                            : <p>{bet}</p>}
                    </div>

                    <button ref={startSpinningBtn} type="button" className="spin" onClick={() => spin()}>
                        SPIN
                    </button>

                </div>

                <div className="debugging-button">
                    <div onClick={() => setMode()}>
                        <p>Current mode - {debuggingMode ? <span>Fixed</span> : <span>Random</span>}</p>
                    </div>
                </div>

                {debuggingMode ? <div id="debug-controls">

                    <div className="left-reel-debug">
                        <DebugSelectors index={0}/>
                    </div>

                    <div className="center-reel-debug">
                        <DebugSelectors index={1}/>
                    </div>

                    <div className="right-reel-debug">
                        <DebugSelectors index={2}/>
                    </div>

                </div> : null}



            </div>

            <div className="pay-table">
                <PayTable winningSymbols={winningSymbols} winningPosition={winningPosition}/>
            </div>

        </div>
    );

};

export default App;
