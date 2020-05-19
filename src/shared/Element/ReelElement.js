import {default as React, useEffect, useState} from "react";
import {makeRandomReelsForSpinning, makeWinningLine} from './functions'
import styled, {keyframes} from "styled-components";

const ReelElement = props => {

    const symbols = props.symbol;
    const speed = props.speed;
    const [spinningReels, setSpinningReels] = useState(null);

    const spinning = (number) => keyframes`
          0% {
              -moz-transform: translateY(0);
              -webkit-transform: translateY(0);
              transform: translateY(0);
              -webkit-filter: blur(3px);
            }

         100% {
              -moz-transform: translateY(-${number}%);
              -webkit-transform: translateY(-${number}%);
              transform: translateY(-${number}%);
              -webkit-filter: blur(0px);
            }
    `;

    const Reel = styled.div`
          height:100%;
          width: 100%;
    
          animation: ${props => spinning((props.number * 100))};
          animation-duration: ${props => props.speed}s;
          animation-timing-function: ease-out;
          animation-fill-mode: forwards;
    `;

    useEffect(() => {
        let reelLine = makeRandomReelsForSpinning();
        let winningLine = makeWinningLine(symbols);
        reelLine.push(winningLine);

        setSpinningReels(reelLine.map((line, index) =>
            <Reel key={index} number={reelLine.length - 1} speed={speed}>
                {line}
            </Reel>)
        )
    }, [props.symbol]);


    return (
        <div className='reel'>
            <div className='slots'>
                {spinningReels}
            </div>
        </div>
    )

};

export default ReelElement;
