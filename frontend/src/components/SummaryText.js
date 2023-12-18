import React, { useState, useEffect } from 'react';
import TruncatedText from './TruncatedText';


const SummaryText = (props) => {
    const orignalText = props.orignalText
    const summeryText = props.summeryText
    const [displayedWordIndex, setDisplayedWordIndex] = useState(0);

    useEffect(() => {
        const intervalId = setInterval(() => {
            setDisplayedWordIndex((prevIndex) => prevIndex + 1);
        }, 500);

        if (summeryText && displayedWordIndex === summeryText.split(' ').length) {
            clearInterval(intervalId);
        }

        return () => clearInterval(intervalId);
    }, [displayedWordIndex, summeryText]);
    return (
        <div>
            {orignalText ? (
                <TruncatedText text={orignalText} maxLength={250} />
            ) : null}

            {summeryText ? (
                <div className='summaryText mt-3'>
                    <h2>Summary:</h2>
                    <p>{summeryText.split(' ').slice(0, displayedWordIndex).join(' ')}</p>
                </div>
            ) : null}
        </div>
    )
}

export default SummaryText