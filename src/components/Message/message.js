import React from 'react';
import './message.css';

const Message = ({ message }) => {
    return (
        <div className="msg-container">
            <p className="msg-text">{message}</p>
        </div>
    );
};

export default Message;