import React, {useEffect, useState} from "react";
import { Grid} from "@mui/material";
import {Link} from "react-router-dom"
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import './Reports.css';
import {ThemeProvider, createTheme,makeStyles } from '@material-ui/core/styles';
import { SERVER_URL } from "../env";
import { Button } from "@material-ui/core";
import axios from "axios";

const useStyles = makeStyles({
    btnCol: {
      backgroundColor: "#CCDBFD",
    }
  });

function Reports(){
    const theme = createTheme({
        typography: {
            fontFamily: [
                'Manrope',
                'Light 300',
            ].join(','),
        },
    });
    const [reports, setReport] = useState([]);

    useEffect(() => {
        //data on reports from server
        fetch(SERVER_URL+'report')
        .then(response => response.json())
        .then(data => {
            setReport(data)
            //console.log(data)
        })
    }, []);
    
    const [posts, setPost] = useState([]);
   
    useEffect(() => {
        //data on reports from server
        fetch(SERVER_URL+'report/reports')
        .then(response => response.json())
        .then(data => {
            setPost(data)
            //console.log(data)
        })
    }, []);

    const classes = useStyles();

    const [users, setUser] = useState([]);
   
    useEffect(() => {
        //data on reports from server
        fetch(SERVER_URL+'users/allusers')
        .then(response => response.json())
        .then(data => {
            setUser(data)
            console.log(data)
        })
    }, []);

    function finduser(user, u){
        console.log(user)
        console.log(u)
        if(user._id === u){
            return user.userName
        }
    }

    return(
        <ThemeProvider theme={theme} className="myposts">
            <div>
                <h1 className="title">Reports</h1>
                <Grid container className='box2'>
                {reports.map((report, index) => 
                <Grid item xs={12}>
                <Card className="report" key={report.id} >
                    <CardContent>
                    <span>Subject:</span>
                    <span>{report.reportType}</span><br/>
                    <span>Report By: </span>
                    <span>{users.map((user)=> finduser(user, report.user))}</span><br/>
                    <span>Post Id: </span>
                    <span>{report.postId}</span><br/>
                    <span>Report Time: </span>
                    <span>{report.createdAt}</span><br/> 
                    <br/>
                    <Link to={"/reports/post"} state={[posts[index], report._id]} className='button-link'>
                    <button size="small" className="buttons">
                                VIEW POST
                    </button>
                    </Link>
                    </CardContent>
                </Card>
                </Grid>)}
                </Grid>
            </div>
        </ThemeProvider>
    )
}

export default Reports