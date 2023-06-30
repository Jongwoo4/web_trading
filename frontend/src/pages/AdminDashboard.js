import React from "react";
import { Grid, Paper, TextField, Button } from "@mui/material";
import './AdminDashboard.css';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

class AdminDashboard extends React.Component {
    state = {
        feedbackText: "",
        errorStatus: false
    }
    _setFeedbackText(str, isError=false) {
        this.setState({
            feedbackText: str,
            errorStatus: isError
        })
    }
    _handleFeedbackTextDisplay(){
        if (this.state.feedbackText === ""){
            return (<span></span>);
        }
        let c = "feedbackTextValid"
        if (this.state.errorStatus){
            c = "feedbackTextError";
        }
        return (
            <span id='feedbackText' className={c}>
                {this.state.feedbackText}
            </span>
        );
    }
    deletePost(url){
        //requires server call
        let str = "This post does not exist!";
        let err = true;
        if (url === 'tradeverse.com/post/1'){
            str = "Post was removed."
            err = false;
        } else if (url=== ""){
            str = "Post URL field was left empty!"
        }
        this._setFeedbackText(str, err);
    }
    _deletePost(){
        const url = document.getElementById("deletePostUrl").value;
        this.deletePost(url);
    }
    deleteUser(username){
        //requires server call
        const users = ["user", "user2"];
        const admins = ["admin"];
        let str = "This user does not exist!";
        let err = true;
        if (users.includes(username)){
            str = "User was deleted."
            err = false;
        } else if (admins.includes(username)){
            str = 'Cannot delete an admin user'
        } else if (username === ""){
            str = "Username field was left empty!"
        }
        this._setFeedbackText(str, err);
    }
    _deleteUser(){
        const username = document.getElementById("deleteUsername").value;
        this.deleteUser(username);
    }
    _validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }
    createAdmin(name, email, username, password){
        const alreadyUsers = ['user', 'admin', 'user2'];
        const alreadyEmails = ['user@gmail.com', 'admin@gmail.com', 'user2@gmail.com'];
        //requires server call
        let str = "Created user.";
        let err = false;
        if (alreadyEmails.includes(email) || alreadyUsers.includes(username)){
            str = "Username or email is already taken, try again!"
            err = true;
        } else if (name === "" || email === "" || username === "" || password == ""){
            str = "A field was left empty!"
            err = true;
        } else if (!this._validateEmail(email)){
            str = "Invalid email!"
            err = true;
        }
        this._setFeedbackText(str, err);
    }
    _createAdmin(){
        const name = document.getElementById("createFullName").value;
        const email = document.getElementById("createEmail").value;
        const username = document.getElementById("createUsername").value;
        const password = document.getElementById("createPassword").value;
        this.createAdmin(name, email, username, password);
    }
    render() {
        return (
            <>
            <div className="title">
                    <h4>Admin Dashboard</h4>
            </div>
            <div id='dashboardContainer'>
                <div className="cardit">
                    <br/>
                    <h4 className="subt">Remove Posts</h4><br/>
                    <TextField id='deletePostUrl' label="URL of post" variant="outlined" className="textl" required/><br/><br/>
                    <Button 
                        id='deletePost' 
                        variant="contained"
                        onClick={() => this._deletePost()}
                    >
                        Delete Post
                    </Button>
                    <br/><br/><br/>
                    <h4 className="subt">Delete Users</h4><br/>
                    <TextField id='deleteUsername' label="Username" variant="outlined" className="textl" required/><br/><br/>
                    <Button 
                    id='deleteUser' 
                    variant="contained"
                    onClick={() => this._deleteUser()}
                    >   
                        Delete User
                    </Button>
                    <br/><br/>
                </div>     
                        
                <div className="cardit">
                    <br/>
                    <h4 className="subt">Create Admin</h4><br/>
                    <TextField id='createFullName' label="Full Name" variant="outlined" className="textl" required/><br/><br/>
                    <TextField id='createEmail' label="Email" variant="outlined" className="textl" required/><br/><br/>
                    <TextField id='createUsername' label="Username" variant="outlined" className="textl" required/><br/><br/>
                    <TextField id='createPassword' label="Password" variant="outlined" className="textl" required/><br/><br/>
                    <Button 
                        id='createUser' 
                        variant="contained"
                        onClick={() => this._createAdmin()}
                    >
                        Create Admin
                    </Button>
                    <br/><br/>
                </div>     
                        
                    {/* <Grid item xs={6}>
                        <div>
                            <Paper id='removePosts'  sx={{p: 1}} justifyContent="center">
                                <div className='paperContents smallBox'>
                                    <h4>Remove Posts</h4><br/>
                                    <TextField id='deletePostUrl' label="URL of post" variant="outlined" /><br/><br/>
                                    <Button 
                                        id='deletePost' 
                                        variant="contained"
                                        onClick={() => this._deletePost()}
                                    >
                                        Delete Post
                                    </Button>
                                </div>
                            </Paper>
                            <Paper sx={{p: 1}} >
                            <div className='paperContents smallBox'>
                                <h4>Delete Users</h4><br/>
                                <TextField id='deleteUsername' label="Username" variant="outlined" /><br/><br/>
                                <Button 
                                    id='deleteUser' 
                                    variant="contained"
                                    onClick={() => this._deleteUser()}
                                >   
                                    Delete User
                                </Button>
                            </div>
                            </Paper>
                        </div>
                        
                    </Grid>
                    <Grid item xs={6}>
                        <Paper sx={{p: 1}} >
                            <div className='paperContents'>
                                <h4>Create Admin</h4><br/>
                                <TextField id='createFullName' label="Full Name" variant="outlined" /><br/><br/>
                                <TextField id='createEmail' label="Email" variant="outlined" /><br/><br/>
                                <TextField id='createUsername' label="Username" variant="outlined" /><br/><br/>
                                <TextField id='createPassword' label="Password" variant="outlined" /><br/><br/>
                                <Button 
                                    id='createUser' 
                                    variant="contained"
                                    onClick={() => this._createAdmin()}
                                >
                                    Create Admin
                                </Button>
                            </div>
                        </Paper>
                    </Grid> */}
                
                <div id='feedbackTextContainer'>
                    {this._handleFeedbackTextDisplay()}
                </div>
            </div>
            </>
            
        );
    }
}

export default AdminDashboard;