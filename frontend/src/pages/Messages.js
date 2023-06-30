import { TextField, Button } from '@mui/material'
import React from 'react'
import AllUserTabs from '../components/Messages/AllUserTabs'
import MessageContainer from '../components/Messages/MessageContainer'
import "./Messages.css"

class Messages extends React.Component {
    //getting the messages to put in our state requires server calls
    state = {
        currentTab: 0,
        users: [
            {
                name: "sadbobby6", 
                profilePic: null, 
                textfieldValue: "",
                messages:[
                    {
                        isOutgoing: true,
                        timestamp: "Mar 04 2022 9:35:24 AM",
                        contents: "Hi!"
                    },
                    {
                        isOutgoing: false,
                        timestamp: "Mar 04 2022 10:37:25 AM",
                        contents: "Hi! I saw your trade offer, can I get it for free by any chance?"
                    }
                ]
            }, 
            {
                name: "Gordon", 
                profilePic: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/02/Gordon_Ramsay_colour_Allan_Warren.jpg/240px-Gordon_Ramsay_colour_Allan_Warren.jpg",
                textfieldValue: "",
                messages: [
                    {
                        isOutgoing: false,
                        timestamp: "Mar 03 2022 9:35:24 AM",
                        contents: "what are you?"
                    },
                    {
                        isOutgoing: true,
                        timestamp: "Mar 03 2022 9:40:24 AM",
                        contents: "an idiot sandwhich!"
                    }
                ]
            },
            {
                name: "Karen",
                profilePic: "https://i.kym-cdn.com/entries/icons/mobile/000/027/963/karenimg.jpg",
                textfieldValue: "",
                messages: [
                    {
                        isOutgoing: false,
                        timestamp: "Mar 02 2022 9:40:24 AM",
                        contents: "I want to speak to the manager!"
                    }
                ]

            }
        ]
    }

    _changeIndexOfUser(oldIdx, newIdx){//unused currently
        if (oldIdx == newIdx){
            return;
        }
        let usersCpy = this.state.users.slice();
        const tempUser = usersCpy[newIdx];
        usersCpy[newIdx] = usersCpy[oldIdx];
        usersCpy[oldIdx] = tempUser;
        this.setState({
            currentTab: this.state.currentTab,
            users: usersCpy
        });
    }

    _bringUserToFront(uid){
        if (uid == 0){
            return;
        }
        let usersCpy = this.state.users.slice();
        const tempUser = usersCpy[uid];
        usersCpy.splice(uid, 1);
        usersCpy.unshift(tempUser);
        this.setState({
            currentTab: this.state.currentTab,
            users: usersCpy
        });
    }

    _changeTab = (newTabIdx) => {
        this.setState({
            currentTab: newTabIdx
        })
    }

    changeTextfieldValue(uid, text){
        //copy every other part of the state and add our changed item
        let newUsers = this.state.users.slice();
        newUsers[uid].textfieldValue = text;
        this.setState({
            users: newUsers
        });
    }

    _onChangeTextfield(){
        const text = document.getElementById("textTypingField").value;
        const uid = this.state.currentTab;
        
        this.changeTextfieldValue(uid, text);
    }

    sendMessage(deliverMessage, uid){
        //requires a server call to send messages
        if (deliverMessage.length == 0) {
            return;
        }
        
        //timestamp data
        const currDate = new Date();
        const dateStr = currDate.toDateString() + " " + currDate.toLocaleTimeString();
        
        //copy messages from state and append new message
        let newMessages = this.state.users[uid].messages.slice();
        newMessages.push(
            {
                isOutgoing: true,
                timestamp: dateStr,
                contents: deliverMessage
                
            }
        );
        //copy every other part of the state and add our changed item
        let newUsers = this.state.users.slice();
        newUsers[uid].messages = newMessages;
        this.setState({
            users: newUsers
        });

        //clear textfield
        this.changeTextfieldValue(uid, "");

        //move user to top of tabs
        this._bringUserToFront(uid);
        this._changeTab(0);
    }
    
    _sendMessage = (uid) => {
        const inputBox = document.getElementById("textTypingField");
        const deliverMessage = inputBox.value;
        this.sendMessage(deliverMessage, uid);
    }

    _sendMessageByEnterKey = (event, uid) => {
        if (event.key === 'Enter'){
            this._sendMessage(uid);
        }
    }

    render() {
        const userIdx = this.state.currentTab;
        const defaultTypingBoxContent = "Send a message to " + this.state.users[userIdx].name;
        return (
            <div id="messageSection">
                <div className='leftContainer'>
                    <AllUserTabs 
                        users={this.state.users}
                        changeTab={this._changeTab}
                        currentTab={this.state.currentTab}
                    />
                </div>
                <div className='rightContainer'>
                    <MessageContainer 
                        name={this.state.users[userIdx].name}
                        messages={this.state.users[userIdx].messages}
                    />
                    <div className='bottomBar'>
                        <div className='typingField'>
                            <TextField
                                fullWidth
                                label={defaultTypingBoxContent}
                                value={this.state.users[userIdx].textfieldValue}
                                variant="outlined"
                                size="small"
                                id='textTypingField'
                                onKeyPress={(event) => this._sendMessageByEnterKey(event, userIdx)}
                                onChange={() => this._onChangeTextfield()}
                            />
                        </div>
                        <div className='buttonArea'>
                            <Button 
                                id='sendButton' 
                                onClick={() => this._sendMessage(userIdx)} 
                                variant="contained" 
                                size="large"
                            >
                                Send
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
}

export default Messages;