import React from 'react'
import Image from "../styles/Image";
import Symbol from "../../Symbol";

const THREE_UPPER = 15;
const THREE_MIDDLE = 70;
const THREE_BOTTOM = 15;

const TWO_UPPER = 50;
const TWO_BOTTOM = 50;

const AMOUNT_OF_RANDOM_ELEMENTS = 10;

function getHeightHasThree(length, index) {
    switch (index) {
        case 0:
            return THREE_UPPER;
        case 1:
            return THREE_MIDDLE;
        case 2:
            return THREE_BOTTOM;
        default:
            return null;
    }
}

function getHeightHasTwo(length, index) {
    switch (index) {
        case 0:
            return TWO_UPPER;
        case 1:
            return TWO_BOTTOM;
        default:
            return null;
    }
}

export function makeRandomReelsForSpinning() {

    let arr = [];
    for (let i = 0; i <= AMOUNT_OF_RANDOM_ELEMENTS; i++) {
        let randomLine = <>
            <Image height={49}>
                <img src={`./img/${Symbol.random()}.png`} alt={"symbol"}/>
            </Image>
            <Image height={49}>
                <img src={`./img/${Symbol.random()}.png`} alt={"symbol"}/>
            </Image>
        </>;
        arr.push(randomLine)
    }

    return arr;
}


export function makeWinningLine(symbols) {

    let winningLine = [];
    let symbolsLength = symbols.length > 2;

    symbols.map((symbol, index) => {
            winningLine.push(
                <Image key={index}
                       height={symbolsLength ? getHeightHasThree(length, index) : getHeightHasTwo(length, index)}>
                    <img src={`./img/${symbol}.png`} alt={symbol}/>
                </Image>
            )
        }
    );
    return winningLine;
}
