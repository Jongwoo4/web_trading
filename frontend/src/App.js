import './App.css';
import UniversalNavbar from './components/Navbars/UniversalNavbar';

import { Route, BrowserRouter,Routes } from "react-router-dom";
import AllPosts from './pages/AllPosts';
import MyPosts from './pages/MyPosts';
import MyBids from './pages/MyBids';
import Messages from './pages/Messages';
import Profile from './pages/Profile';
import Post from './pages/Post';
import Sign_in from './pages/Sign_in';
import Sign_up from './pages/Sign_up';
import Reports from './pages/Reports';
import IndividualPost from './pages/IndividualPost';
import MakeBid from './pages/MakeBid'
import AdminDashboard from './pages/AdminDashboard';//TODO: remove when integrating proper admin Navbar
import ViewMyPost from './pages/ViewMyPost';
import ReportPg from './pages/ReportPg';
import ReportPost from './pages/ReportPost';
import React, {useEffect, useState} from "react";
import { SERVER_URL } from './env';
import LogOut from './pages/LogOut';

function App() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [userID, setUserID] = useState("");

  const loginCallback = (isAdmin, isLoggedIn, userID) =>{
    setIsAdmin(isAdmin);
    setLoggedIn(isLoggedIn);
    setUserID(userID)
  }

  useEffect(() => {
        fetch(SERVER_URL+"users/check-session")
        .then(res => {
            if (res.status === 200) {
                return res.json();
            }
        })
        .then(json => {
            if (json && json.userID) {
                setUserID(json.userID);
                setLoggedIn(true);
                setIsAdmin(json.isAdmin);
            }
        })
        .catch(error => {
            console.log(error);
        });

}, []);

  return (
    <BrowserRouter>

      <UniversalNavbar isAdmin={isAdmin} isLoggedIn={loggedIn} userID={userID} callback={loginCallback}/>
      <Routes>
        {/*<Route path={["/", "/allpost", "/dashboard"]} element={<AllPosts  userID={userID}/>} />*/}
        <Route path="/"
               element={ loggedIn&&!isAdmin ? <AllPosts  userID={userID}/> : <LogOut userID={userID}/>}
        />
        <Route path="/allposts"
               element={<AllPosts  userID={userID}/>}
        />
        <Route path="/userpost" element={<IndividualPost userID={userID}/>} />
        <Route path="/myposts"
               element={ loggedIn&&!isAdmin ? <MyPosts userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/mybids"
               element={ loggedIn&&!isAdmin ? <MyBids userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/newbid"
               element={ loggedIn&&!isAdmin ? <MakeBid userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/newreport"
               element={ loggedIn&&!isAdmin ? <ReportPg userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/messages"
               element={ loggedIn ? <Messages userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/profile"
               element={ loggedIn&&!isAdmin ? <Profile userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/post"
               element={ loggedIn&&!isAdmin ? <Post userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/viewmypost"
               element={ loggedIn&&!isAdmin ? <ViewMyPost userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/signin"
               element={ <Sign_in callback={loginCallback}/>}
        />
        <Route path="/signup"
               element={ <Sign_up callback={loginCallback}/>}
        />
        <Route path="/reports"
               element={ loggedIn&&isAdmin ? <Reports userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/dashboard"
               element={ loggedIn&&isAdmin ? <AdminDashboard userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
        <Route path="/reports/post"
               element={ loggedIn&&isAdmin ? <ReportPost userID={userID}/> : <Sign_in callback={loginCallback}/>}
        />
      </Routes>

    </BrowserRouter>
  );
}

export default App;
