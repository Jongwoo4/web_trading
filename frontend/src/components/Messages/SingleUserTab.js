import React from 'react'
import "./SingleUserTab.css"

class SingleUserTab extends React.Component {
    
    render(){
        const maxNameLength = 20//decides the max length for a name
        const maxPreviewLength = 20;//decides the max length preview string for a message

        //profile picture, handle null
        let profilePicSrc = "https://t4.ftcdn.net/jpg/00/64/67/63/360_F_64676383_LdbmhiNM6Ypzb3FM4PPuFP9rHe7ri8Ju.jpg";
        if (this.props.profilePic != null){
            profilePicSrc = this.props.profilePic;
        }
        //process name of person texting our user
        let processedName ="Unknown User";//null name
        if (this.props.name != null){
            if (this.props.name.length > maxNameLength){
                processedName = this.props.name.substring(0,maxNameLength) + "...";
            } else {
                processedName = this.props.name
            }
        }
        //process message preview
        let processedMessage ="";
        if (this.props.recentMessage != null){
            if (this.props.recentMessage.length > maxPreviewLength){
                processedMessage = this.props.recentMessage.substring(0,maxPreviewLength) + "...";
            } else {
                processedMessage = this.props.recentMessage
            }
        }
        //check if current preview tab is the current message view
        //ie if were looking at the messages from this user's tab
        let processedContainerName = 'messagePreview'
        if (this.props.isCurrent){
            processedContainerName = 'selectedMessagePreview'
        }
        return (
            <div 
                className={processedContainerName}
                onClick={() => this.props.changeTab(this.props.idx)}
            >
                <img className='profilePic' src={profilePicSrc} align='left'/>
                <div className='textContainer'>
                    <span className='nameText'>{processedName}</span><br/>
                    <span>{processedMessage}</span>
                </div>
            </div>
        );
    }
}

export default SingleUserTab;
