import {Typography} from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './Sign_in.css'
import {Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from 'react'
import {ReactComponent as ReactLogo} from './../images/signinLogo.svg';
import { SERVER_URL } from "../env";

function Sign_in(props) {
    const [values, setValues] = useState({
        username: '',
        password: '',
    });
    const [errorMessage, setErrorMessage] = useState('');
    const [data, setData] = useState('');


    const changeHandler = e => {
        setValues({...values, [e.target.name]: e.target.value})
     }

    const history = useNavigate();
    
    useEffect(() => {
        //get username, password data from server     
    }, []);
    

    const handleSubmit = e => {
        e.preventDefault();

        fetch(SERVER_URL+'users/login', {
            method: 'POST',
            body: JSON.stringify({userName: values.username, password: values.password}),
            headers: {"Content-Type": "application/json"}
          }).then(data => data.json())
          .then(res => {
              if(res.success){
                    props.callback(res.user.isAdmin, true, res.user._id);
                    history('/allposts', {userID: res.user._id});
              }
              else{
                setErrorMessage(res.message);
              }
          });
        e.target.reset();
    
    }
    
    return(
        <>
        <h1 className='appname'>Tradeverse<ReactLogo sx={{display: 'flex', alignItems: 'center'}} /></h1>
        <div className = 'form'>
            
            <form className = 'box' onSubmit={handleSubmit}>
            
                <h2 className='signin'>Sign In</h2><br/>
                {errorMessage && (<p className="error"> {errorMessage} </p>)}
                <TextField  label = 'Username' placeholder = 'Enter username' name='username'
                            onChange={changeHandler} fullWidth required/><br/>
                <TextField  label = 'Password' placeholder = 'Enter password' type='password' name='password'
                            onChange={changeHandler} fullWidth required/><br/>
                <Button type="submit" value= "Submit" variant="contained" color="primary" className="button_sign_in">
                Log in
                </Button><br/>
                <Typography> Do you have an account?
                </Typography>
                <Link to="/signup">
                        Sign Up
                </Link>
            </form >
        </div>
        </>
    )
}

export default Sign_in