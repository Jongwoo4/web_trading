import React from 'react'
import SingleUserTab from './SingleUserTab';
import "./AllUserTabs.css"

class AllUserTabs extends React.Component {
    getRecentMessage = (user) => {
        if (user.messages.length > 0){
            try {
                const recentMsg = user.messages[user.messages.length-1].contents;
                return recentMsg;
            } catch(error){
                console.error(error);
                return "";
            }
        }
        return "";
    }
    render(){
        return (
            <div className='previewContainer'>
                <div className='titleContainer'>
                    <h1>
                        Messages
                    </h1>
                </div>
                <div className='tabContainer'>
                    {this.props.users.map((user, i) => (
                        (this.props.currentTab == i) 
                        ?
                        <SingleUserTab 
                            key={"tab"+i}
                            idx={i}
                            name={user.name} 
                            profilePic={user.profilePic}
                            recentMessage={this.getRecentMessage(user)}
                            changeTab={this.props.changeTab}
                            isCurrent={true}
                        />
                        :
                        <SingleUserTab 
                            key={"tab"+i}
                            idx={i}
                            name={user.name} 
                            profilePic={user.profilePic}
                            recentMessage={this.getRecentMessage(user)}
                            changeTab={this.props.changeTab}
                        />
                    ))}
                </div>
            </div>
        );
    }
}

export default AllUserTabs;