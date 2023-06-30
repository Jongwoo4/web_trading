import React from 'react'
import "./MessageBox.css"

class MessageBox extends React.Component {
    
    render(){
        const messageContents = this.props.contents;
        const messageTimestamp = this.props.timestamp;
        let messageType = "leftMessage";
        let timestampType = "leftTimestamp";
        if (this.props.isOutgoing){
            messageType = 'rightMessage';
            timestampType = 'rightTimestamp';
        }
        return (
            <div>
                <div className={messageType}>
                    <p className="messageContent">
                        {messageContents}
                    </p>
                    <div className={timestampType}>
                        {messageTimestamp}
                    </div>
                </div>
            </div>
        );
    }
}

export default MessageBox;
