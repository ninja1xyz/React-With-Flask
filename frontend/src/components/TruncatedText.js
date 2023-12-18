import React, { useState } from 'react';

const TruncatedText = ({ text, maxLength }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const truncatedText = (isExpanded && text) ? text : `${text.slice(0, maxLength)}...`;

    const toggleExpansion = () => {
        setIsExpanded(!isExpanded);
    };

    return (
        <div>
            {!isExpanded && (
                <div className='originalText mt-3'>
                    <h2>Orignal Text:</h2>
                    <p>{truncatedText}</p>
                    <button className='btn btn-primary' onClick={toggleExpansion}>Click me to read more</button>
                </div>
            )}

            {isExpanded && (
                <div className='originalText mt-3'>
                    <h2>Orignal Text:</h2>
                    <div className="popup ">
                        <div className="popup-content">
                            <span className="close" onClick={toggleExpansion}>
                                &times;
                            </span>
                            <p>{text}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default TruncatedText;
