import React from 'react'
import MessageBox from './MessageBox';
import "./MessageContainer.css"

class MessageContainer extends React.Component {
    render(){
        return(
            <div className='sectionContainer'>
                <div className='nameContainer'>
                    <h1>{this.props.name}</h1>
                </div>
                <div className='messageContainer'>
                    {this.props.messages.map((message, i) => (
                        //determine whether or not to display timestamp of message
                        //don't display if the next message is the same type
                        //ie, both incoming or both outgoing
                        (i+1 < this.props.messages.length) 
                        && (this.props.messages[i].isOutgoing == this.props.messages[i+1].isOutgoing)
                        ?
                        <MessageBox
                            key={i}
                            isOutgoing={message.isOutgoing} 
                            timestamp=""
                            contents={message.contents}
                        />
                        :
                        <MessageBox
                            key={"msg"+i}
                            isOutgoing={message.isOutgoing} 
                            timestamp={message.timestamp}
                            contents={message.contents}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default MessageContainer;