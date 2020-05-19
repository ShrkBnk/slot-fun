import {default as React, useEffect, useState} from "react";
import './PayTable.scss'


function arraysEqual(arrayA, arrayB) {
    return JSON.stringify(arrayA) === JSON.stringify(arrayB);
}

function checkCurrentLineWinning(winningSymbols, currentLine) {
    return winningSymbols.some(line => arraysEqual(line, currentLine))
}

const PayTable = props => {

    let winningSymbols = props.winningSymbols;
    let winningPosition = props.winningPosition;

    const Combination = props => <>
        <td>
            <img src={`./img/${props.imgA}.png`}/>
        </td>

        <td>
            <img src={`./img/${props.imgB}.png`}/>
        </td>

        <td>
            <img src={`./img/${props.imgC}.png`}/>
        </td>
    </>;

    const PayTableThreeCherryTop = () => {

        const winningCombination = ["Cherry", "Cherry", "Cherry"];
        const isWinningLine = checkCurrentLineWinning(winningSymbols, winningCombination);

        return (
            <tr className={
                winningPosition[0] === "TOP" &&
                isWinningLine ? "win-line" : null}>

                <td className="top-line">
                    <h2>2</h2>
                </td>

                <Combination imgA={winningCombination[0]} imgB={winningCombination[1]} imgC={winningCombination[2]}/>

                <td className="top-line">
                    <h2>2000</h2>
                </td>

            </tr>)

    };

    const PayTableThreeCherryCenter = () => {

        const winningCombination = ["Cherry", "Cherry", "Cherry"];
        const isWinningLine = checkCurrentLineWinning(winningSymbols, winningCombination);

        return (
            <tr className={isWinningLine && winningPosition.includes("CENTER") ? "win-line" : null}>
                <td className="center-line">
                    <h2>1</h2>
                </td>

                <Combination imgA={winningCombination[0]} imgB={winningCombination[1]} imgC={winningCombination[2]}/>

                <td className="center-line">
                    <h2>1000</h2>
                </td>

            </tr>)
    };

    const PayTableThreeCherryBottom = () => {

        const winningCombination = ["Cherry", "Cherry", "Cherry"];
        const isWinningLine = checkCurrentLineWinning(winningSymbols, winningCombination);

        return (
            <tr className={
                winningPosition[0] === "BOTTOM" &&
                isWinningLine ? "win-line" : null}>

                <td className="bottom-line">
                    <h2>3</h2>
                </td>

                <Combination imgA={winningCombination[0]} imgB={winningCombination[1]} imgC={winningCombination[2]}/>

                <td className="bottom-line">
                    <h2>4000</h2>
                </td>

            </tr>)
    };

    const PayTableThreeSevens = () => {

        const winningCombination = ["7", "7", "7"];
        const isWinningLine = checkCurrentLineWinning(winningSymbols, winningCombination);

        return (
            <tr className={isWinningLine ? "win-line" : null}>

                <Combination imgA={winningCombination[0]} imgB={winningCombination[1]} imgC={winningCombination[2]}/>

                <td className="bottom-line">
                    <h2>150</h2>
                </td>

            </tr>)
    };

    const PayTableAnyTwoCherryAndSeven = () => {

        const winningCombination = [["Cherry", "Cherry", "7"], ["7", "Cherry", "Cherry"], ["Cherry", "7", "Cherry"]];
        const isWinningLine = winningCombination.some(res => checkCurrentLineWinning(winningSymbols, res));

        return (<tr className={isWinningLine ? "win-line" : null}>
            <td>
                ANY TWO
            </td>
            <td>
                <img src={`./img/Cherry.png`} alt={"cherry"}/>
            </td>
            <td>
                <img src={`./img/7.png`} alt={"seven"}/>
            </td>
            <td className="bottom-line">
                <h2>75</h2>
            </td>
        </tr>)

    };

    const PayTableThreeXBarAny = () => {

        const winningCombination = ["3xBAR", "3xBAR", "3xBAR"];
        const isWinningLine = checkCurrentLineWinning(winningSymbols, winningCombination);

        return (
            <tr className={isWinningLine ? "win-line" : null}>
                <Combination imgA={winningCombination[0]} imgB={winningCombination[1]} imgC={winningCombination[2]}/>
                <td className="bottom-line">
                    <h2>50</h2>
                </td>
            </tr>
        )
    };

    const PayTableTwoXBarAny = () => {

        const winningCombination = ["2xBAR", "2xBAR", "2xBAR"];
        const isWinningLine = checkCurrentLineWinning(winningSymbols, winningCombination);

        return (
            <tr className={isWinningLine ? "win-line" : null}>
                <Combination imgA={winningCombination[0]} imgB={winningCombination[1]} imgC={winningCombination[2]}/>
                <td className="bottom-line">
                    <h2>20</h2>
                </td>
            </tr>
        )
    };

    const PayTableBarAny = () => {
        const winningCombination = ["BAR", "BAR", "BAR"];
        const isWinningLine = checkCurrentLineWinning(winningSymbols, winningCombination);

        return (
            <tr className={isWinningLine ? "win-line" : null}>
                <Combination imgA={winningCombination[0]} imgB={winningCombination[1]} imgC={winningCombination[2]}/>
                <td className="bottom-line">
                    <h2>10</h2>
                </td>
            </tr>)
    };

    const PayTableTwoBarAny = () => {

        const winningCombination = [
            ["NULL", "BAR", "BAR"],
            ["BAR", "BAR", "NULL"],

            ["BAR", "BAR", "3xBAR"],
            ["BAR", "BAR", "2xBAR"],
            ["BAR", "BAR", "7"],
            ["BAR", "BAR", "Cherry"],

            ["3xBAR", "BAR", "BAR"],
            ["2xBAR", "BAR", "BAR"],
            ["7", "BAR", "BAR"],
            ["Cherry", "BAR", "BAR"]

        ];

        const isWinningLine = winningCombination.some(res => checkCurrentLineWinning(winningSymbols, res));

        return (
            <tr className={isWinningLine ? "win-line" : null}>
                <td>
                    ANY TWO
                </td>
                <td>
                    <img src={`./img/BAR.png`}/>
                </td>
                <td>
                    <img src={`./img/BAR.png`}/>
                </td>
                <td className="bottom-line">
                    <h2>5</h2>
                </td>
            </tr>)
    };

    return <>
        <div className="pay-table-upper">
            <table>
                <tbody>
                <PayTableThreeCherryTop/>
                <PayTableThreeCherryCenter/>
                <PayTableThreeCherryBottom/>
                </tbody>
            </table>
        </div>

        <div className="pay-table-bottom">
            <table>
                <tbody>
                <PayTableThreeSevens/>
                <PayTableAnyTwoCherryAndSeven/>
                <PayTableThreeXBarAny/>
                <PayTableTwoXBarAny/>
                <PayTableBarAny/>
                <PayTableTwoBarAny/>
                </tbody>
            </table>
        </div>
    </>

};


export default PayTable;
