import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import React, {useEffect, useState} from "react";
import { Done, Pending, TenMp} from '@mui/icons-material';
import { Edit   } from '@mui/icons-material';
import './Profile.css';
import { SERVER_URL } from "../env";
import {useLocation} from "react-router-dom";
import { addImg, deleteImg } from "../actions/image";
import { getDialogContentTextUtilityClass } from '@mui/material';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
  pgTitle: {
      paddingTop: 15, 
      textAlign: "center",
      // paddingLeft: 30, 
      color: "#ABC4FF", 
      fontSize: 50,
  },
});

function Profile(props) {
   // let { state } = useLocation();
   // var userID = state ? state.userID : "";//(props.userID? props.userID : "623e515ba52e96c2f6a9b254");
    const [data, setData] = useState({username: "",
    fname:"", lname:"", password: "", address: "", city: "",
    country: "", phone: "", email: "", img: ""});
    const [oldData, setOldData] = useState({})
    const [userID, setUserID] = useState(props.userID)

    useEffect(() => {
      // Get user data from server
      // code below requires server call
      getdata();
       
    }, []);

    useEffect(()=>{
      if(props.userID !== userID){
        setUserID(props.userID);
      }
  },[props]);

    function getdata(){
      if(userID){
        fetch(SERVER_URL+'users/'+userID)
        .then(response => response.json())
        .then(data => {
          data = data.user

          var adjdata = {
            username: data.userName,
            fname: data.firstName,
            lname: data.lastName,
            password: data.password,
            img: data.avatarImg ? data.avatarImg  : SERVER_URL+"avatar.png",//? SERVER_URL+data.avatarImg : SERVER_URL+"/avator.png",
            avatarId: data.avatarId,
            email: data.email
          }

          setData(adjdata);
          setOldData(adjdata);
        });
      }
      else{
        //shouldn't be allowed
        const newData = Object.assign({}, data);
        newData.img = SERVER_URL+"avatar.png"
        setData(newData);
        
      }
    }
    
    function handleInput(event, input){
        const newData = Object.assign({}, data);
        var val = event.target.value
        if(input === "fname"){
            newData.fname = val;
        }
        else if(input === "lname"){
            newData.lname = val;
        }
        else if(input === "password"){
            newData.password = val;
        }
        else if(input === "email"){
            newData.email = val;
        }
        else  if(input === "img"){
          newData.img = URL.createObjectURL(event.target.files[0]);
          newData.file = event.target.files[0]
          
          //newData.fileName = 'avator' + Date.now() + '.'+event.target.files[0].name.split('.').pop();
        }
        setData(newData); 
    }


    function handleSubmit(e){
      // post new data to server
      // code below requires server call

      var temp = {firstName: data.fname,
        lastName: data.lname,
        password: data.password,
        email: data.email
        }
     if(data.img !== SERVER_URL+"avatar.png" && oldData.img !== data.img){
      addImg(data.file, userID).then(res => {

        if(data.avatarId){
          deleteImg(data.avatarId).then(result => console.log(result)).catch(e => console.log(e));
        }
          temp.avatarId = res.public_id;
          temp.avatarImg = res.url;
          patchUser(temp);
      }).catch((error) => {
        console.log(error)
        });
      }
      else{
        patchUser(temp);
      }
    }

    function patchUser(temp){
      if(oldData.password === temp.password){
        temp.password = undefined;
      }
      fetch(SERVER_URL+'users/'+userID, {
        method: 'PATCH',
        headers: { 'Content-Type':'application/json' },
        body: JSON.stringify(temp)
    }).then(data => data.json())
    .then(res => {
      getdata();
      let element = document.querySelector('#submit-button')
      element.classList.add("done");
      setTimeout(function() {
			
        let element = document.querySelector('#submit-button')
        element.classList.remove("done");
  
      }, 2000)
    });
    }
    const classes = useStyles();

    return (
      <>
        <span><h1 className={classes.pgTitle}>My Profile</h1></span>
        <div className='main-box'>
                <Box
                className="header-box">

                <div className='avator-div'>
                  
                <img src={data.img}
                    alt="profile pic" className="avator"/>
                    <div className="avator-icon">
            <input accept="image/*" className="img-file"
                    id="img-input"
                    onChange={(e) => handleInput(e, "img")} type="file"/>
                <label htmlFor="img-input">
                <Button className="text-button"  component="span" endIcon={<Edit/>}/>
                </label> </div></div>
                
                    
                <div className='text'>
                <h2>{data.username}</h2>
                <h4>{data.fname+" "+data.lname}</h4></div>
                <div className='clear'></div>
                <hr className='line'/>
                <Box
                component="form"
                className="sub-box"
                noValidate
                autoComplete="off"
                >

        <TextField
          id="fname" label="First Name" value={data.fname} type="text"
          variant="standard" onChange={(e) => handleInput(e, "fname")} required
        />
        <TextField
          id="lname" label="Last Name" value={data.lname} type="text"
          variant="standard" onChange={(e) => handleInput(e, "lname")} required
        />
        <br/>
        <TextField
          id="password" label="Password" value={data.password} type="password"
          variant="standard" onChange={(e) => handleInput(e, "password")} required
        />
        <br/>
        <TextField
          id="email" label="Email" value={data.email} type="email"
          variant="standard" onChange={(e) => handleInput(e, "email")} required
        />
        <br/>
        <br/>
        <Button variant="contained" id="submit-button" className="button" onClick={handleSubmit} endIcon={<Done />}>Update</Button>
        </Box></Box>
                
        </div>
      </>
            
    );
  }
  
  export default Profile;