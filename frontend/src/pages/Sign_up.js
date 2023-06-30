import {Typography} from '@mui/material'
import React from 'react'
import Button from '@mui/material/Button';
import { TextField } from '@mui/material';
import './Sign_in.css'
import {Link, useNavigate} from "react-router-dom"
import {useState, useEffect} from 'react'
import { SERVER_URL } from "../env";

const bcrypt = require('bcryptjs');

function Sign_up(props) {

    const [values, setValues] = useState({
        firstName:'',
        lastName:'',
        email:'',
        userName: '',
        password: '',
    });
    const [errorMessage1, setErrorMessage1] = useState('');
    const [errorMessage2, setErrorMessage2] = useState('');
    const [errorMessage3, setErrorMessage3] = useState('');
    const [data, setData] = useState('');

    useEffect(() => {
        }, []);
    
    const changeHandler = e => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    const history = useNavigate();

    const handleSubmit = e => {
        e.preventDefault();

        var res = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
        
        if(!res.test(values.email)){
            e.target.reset();
            setErrorMessage1('Enter Valid Email');
        }else{
                fetch(SERVER_URL+'users',{
                    method: 'POST',
                    headers: {'Content-Type' : 'application/json' },
                    body: JSON.stringify(values)
                }).then(res => res.json())
                .then(json => {
                    if(json.success){
                    fetch(SERVER_URL+'users/login', {
                        method: 'POST',
                        body: JSON.stringify({userName: values.userName, password: values.password}),
                        headers: {"Content-Type": "application/json"}
                      }).then(data => data.json())
                      .then(res => {
                          if(res.success){
                                props.callback(res.user.isAdmin, true, res.user._id);
                                history('/allposts', {userID: res.user._id});
                          }
                          else{
                            setErrorMessage1(res.message);
                          }
                        
                      });
                    }
                    else{
                        setErrorMessage1(json.message);
                    }
                })
                .catch(error => {
                    console.log(error);
                });
        }
    }
        

    return(
        <div className = 'form'>
            <form className = 'box' onSubmit={handleSubmit}>
                <h2 className='signin'>Sign Up</h2><br/>
                <TextField label='First Name' placeholder = 'Enter LastName'
                            name='firstName' onChange={changeHandler} fullWith required/><br/>
                <TextField label='Last Name' placeholder = 'Enter LastName'
                            name='lastName' onChange={changeHandler} fullWith required/><br/>
                <TextField label='Email' placeholder = 'Enter Email' 
                            name='email' onChange={changeHandler} fullWith required/><br/>
                {errorMessage1 && (<p className="error"> {errorMessage1} </p>)}
                <TextField label='Username' placeholder = 'Enter username' 
                            name='userName' onChange={changeHandler} fullWith required/><br/>
                {errorMessage2 && (<p className="error"> {errorMessage2} </p>)}
                <TextField label='Password' placeholder = 'Enter password' name='password' 
                            type='password' onChange={changeHandler} fullWith required/><br/>
                {errorMessage3 && (<p className="error"> {errorMessage3} </p>)}
                <Button type="submit" value= "Submit"
                        className="button_sign_in">
                Sign Up
                </Button><br/>
                <Typography>
                    <Link to="/signin">
                        Have an Account Already
                    </Link>
                </Typography>
            </form >
        </div>
    )
}

export default Sign_up