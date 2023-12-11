import React from 'react';
import './message.css';

import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Message = ({ message, onBack }) => {
    const handleBack = () => {
        if (onBack) {
            onBack();
        }
    };
    return (
        <div className="msg-container">
            <button className="back-button" onClick={handleBack}>
                <FontAwesomeIcon icon={faClose} />
            </button>
            <p className="msg-text">{message}</p>
        </div>
    );
};

export default Message;