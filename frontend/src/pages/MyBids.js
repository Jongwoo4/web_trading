import React, { useEffect, useState, } from "react";
import { Grid } from '@material-ui/core/';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import SearchBar from '../components/searbar';
import { Link } from 'react-router-dom';
import PreviewIcon from '@mui/icons-material/Preview';
import { CenterFocusStrong, DateRange } from "@mui/icons-material";
import FlagIcon from '@mui/icons-material/Flag';
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { deleteImg } from "../actions/image";
import axios from 'axios';

const useStyles = makeStyles({
    root: {
        backgroundColor: "#EDF2FB",
        display: 'block',
    },
    media: {
        height: 230,
    },
    pgTitle: {
        paddingTop: 15, 
        textAlign: "center",
        // paddingLeft: 30, 
        color: "#ABC4FF", 
        fontSize: 50,
    },
    biCar: {
        paddingTop: 25, 
        paddingRight: 30, 
        paddingLeft: 30, 
        paddingBottom: 30
    },
    crdBod: {
        color: "rgba(0, 0, 0, 0.6)",
    },
    withdrawTex: { 
        color: "#ABC4FF", 
        fontSize: 15, 
    },
    delIco: { 
        color: "#ABC4FF",
    },
});

const theme = createTheme({
    typography: {
        fontFamily: [
            'Manrope',
            'Light 300',
        ].join(','),
    },
});

function MyBids(props) {
    const classes = useStyles();

    const [offers, setOffers] = useState([]);
    useEffect(async () => {
        try {
            const userBody = await axios.get(`${process.env.REACT_APP_API_URL}/users/${props.userID}`);
            //console.log(`Getting user with user id: ${props.userID}`);
            const userName = userBody.data.user.userName;
            //console.log(`getting offers for user with userId: ${props.username}....`);
            const offers = await axios.post(`${process.env.REACT_APP_API_URL}/offer/useroffers`, { user: userName });// TODO: change hardcoded user
            console.log(offers.data.offers);
            setOffers(offers.data.offers);
        } catch (error) {
            console.log(error);
        }
    }, []);


    async function deleteItem(itemId, imgId) {
        // TODO: connect to api endpoint
        // console.log(`DELETED BID WITH _id=${itemId}`);
        const newOffers = offers.filter((p) => p._id !== itemId);
        setOffers(newOffers);
        try{
            await deleteImg(imgId);
            await axios.delete(`${process.env.REACT_APP_API_URL}/offer/${itemId}`);
        } catch(error){
            console.log(error)
        }

    }

    return (
        <ThemeProvider theme={theme}>
            <>
                <span><h1 className={classes.pgTitle}>My Bids</h1></span>

                <div className={classes.biCar}>
                    <Grid
                        container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        {offers.map(bid => (
                            <Grid item xs="auto" sm={4} md={4} key={offers.indexOf(bid)}>
                                <Card className={classes.root}>
                                    <CardActionArea>
                                        <CardMedia
                                            className={classes.media}
                                            image={bid.img}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                I offer: {bid.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                In Exchange For: {bid.tradePostTitle}
                                            </Typography>
                                            <Typography gutterBottom variant="body2" className={classes.crdBod} component="p">
                                                My trade pitch: {bid.description}
                                            </Typography>
                                            <Typography variant="body2" className={classes.crdBod} component="p">
                                                Trading with: {bid.tradeWith}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <IconButton aria-label="report post" onClick={() => deleteItem(bid._id, bid.imgId)}>
                                            <DeleteIcon className={classes.delIco} /> <span className={classes.withdrawTex}>Withdraw Bid</span>
                                        </IconButton>
                                    </CardActions>
                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </>
        </ThemeProvider>
    )
}

export default MyBids;