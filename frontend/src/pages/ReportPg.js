import React from "react";
import { makeStyles} from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Done } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import './MyPosts.css';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#EDF2FB",
        boxShadow: "10px 10px #D7E3FC",
    },
    hed: {
        marginBottom: 15,
        color: "#ABC4FF",
        fontSize: 50,
    },
    btnCol: {
        backgroundColor: "#ABC4FF",
    }
});



function ReportPg() {

    const classes = useStyles();
    return (
        <div className="main-box">
            <h1 className={classes.hed}>New Report</h1>
            <Card className={classes.root}>
                <div className="details-box">

                    <CardContent>
                        <TextField type="text" label="Report Subject" fullWidth className="full-textfield"
                        />

                        <span className="space" />

                        <TextField
                            label="Report Description"
                            multiline fullWidth className="full-textfield"
                            rows={4}
                        />

                        <CardActions>
                            <Link to={"/allposts"} className='button-link'>
                                <Button className={classes.btnCol} variant="contained" endIcon={<Done />}>Submit Report</Button>
                            </Link>
                        </CardActions>
                    </CardContent>


                </div>
            </Card>
        </div>
    )
}

export default ReportPg;