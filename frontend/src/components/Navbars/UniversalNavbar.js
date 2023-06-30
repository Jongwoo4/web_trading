import AdminNavbar from './AdminNavbar';
import LoggedOutNavbar from './LoggedOutNavbar';
import RegularUserNavbar from './RegularUserNavbar';
import React, {useEffect, useState} from "react";
import { SERVER_URL } from '../../env';

function UniversalNavbar(props) {
    const [isAdmin, setIsAdmin] = useState(props.isAdmin);
    const [loggedIn, setLoggedIn] = useState(props.isLoggedIn);
    const [userID, setUserID] = useState(props.userID);

    useEffect(()=>{
        if(props.isAdmin !== isAdmin){
        setIsAdmin(props.isAdmin);
        }
        if(props.isLoggedIn !== loggedIn){
        setLoggedIn(props.isLoggedIn);
        
        }
        if(props.userID !== userID){
            setUserID(props.userID);
        }
    },[props]);

const logoutCallback = () =>{
    fetch(SERVER_URL+"logout").then(res => {
        if (res.status === 200) {
        props.callback(false, false, "");
        window.history.push("/");
        }
    })
    .catch(error => {
        console.log(error);
    });
    
  }

    if (loggedIn) {
        if (isAdmin) {
            return <AdminNavbar callback={logoutCallback}/>;
        }
        return <RegularUserNavbar callback={logoutCallback} userID={userID}/>;
    }
    return <LoggedOutNavbar />;
}

export default UniversalNavbar;