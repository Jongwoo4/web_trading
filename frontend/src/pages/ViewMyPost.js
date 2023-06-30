import React, { useEffect, useState, } from "react";
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Done, Upload } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { styled } from '@mui/material/styles';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import Collapse from '@mui/material/Collapse';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';
import FlagIcon from '@mui/icons-material/Flag';
import PreviewIcon from '@mui/icons-material/Preview';
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import ShareIcon from '@mui/icons-material/Share';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import Map from './../components/Map.js'
import { Grid } from '@material-ui/core/';
import { flexbox } from "@mui/system";
import InteractiveBidCard from "./../components/InteractiveBidCard";

const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
})(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
        duration: theme.transitions.duration.shortest,
    }),
}));

const useStyles = makeStyles({
    otrDiv:{
        marginTop: 25, 
        marginBottom: 25 
    },
    indivCard:{ 
        maxWidth: 1045, 
        backgroundColor: "#EDF2FB", 
        boxShadow: "10px 10px #D7E3FC" 
    },
    btmGrid: { 
        display: 'flex',
    },
    tradeDet: {
        color: "#ABC4FF",
    },
    trdTitle: { 
        marginBottom: 15, 
        color: "#ABC4FF", 
        fontSize: 50 
    },
});

const location = {
    address: '40 St George St, Toronto', // temporary dummy data (will store trade location in db in phase 2)
    lat: 43.659628488936654,
    lng: -79.39690055227827,
}

function nameToInitials(name) {
    const fullName = name.split(' ');
    const initials = fullName.shift().charAt(0) + fullName.pop().charAt(0);
    return initials.toUpperCase();
}

const ViewMyPost = () => {
    let { state } = useLocation();
    const [post, setPost] = useState(state.post);

    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
        setExpanded(!expanded);
    };

    const classes = useStyles();

    return (
        <>
            <div className={classes.otrDiv}>
                <Grid
                    container
                    spacing={0}
                    direction="column"
                    alignItems="center"
                    justifyContent="center"
                    style={{ minHeight: '100vh' }}
                >

                    <Grid item>
                        <Card sx={{ maxWidth: 1045, backgroundColor: "#EDF2FB", boxShadow: "10px 10px #D7E3FC" }}>
                            <CardHeader
                                avatar={
                                    <Avatar sx={{ bgcolor: "#ABC4FF", height: '70px', width: '70px' }} aria-label="recipe">
                                        {nameToInitials(post.poster)}
                                    </Avatar>
                                }
                                title={<span style={{ color: "#ABC4FF", fontSize: 40 }}>{post.title}</span>}
                                subheader={post.date}
                            />
                            <CardMedia
                                component="img"
                                height="500"
                                image={post.img}
                                alt="Item image"
                            />
                            <CardContent>
                                <Typography variant="body1">
                                    <h2>Summary</h2>
                                    {post.summary}

                                </Typography>
                                <br></br>
                                <Typography variant="body1" color="text.secondary">
                                    <h2>Trade Details</h2>
                                    <span className={classes.tradeDet}><b>Trademate:</b></span> {post.poster}
                                    <br></br>
                                    <span className={classes.tradeDet}><b>Estimated Monetary Value of Item:</b></span> ${post.estValue} CAD
                                    <br></br>
                                    <span className={classes.tradeDet}><b>Preferred exchange location:</b></span>
                                </Typography>
                                <Map location={location} zoomLevel={17} />
                            </CardContent>
                            <CardActions disableSpacing>
                                <ExpandMore
                                    expand={expanded}
                                    onClick={handleExpandClick}
                                    aria-expanded={expanded}
                                    aria-label="Show Bids"
                                >
                                    <PreviewIcon /> View Trade Offers
                                </ExpandMore>
                            </CardActions>
                            <Collapse in={expanded} timeout="auto" unmountOnExit>
                                <CardContent>
                                    <h1 className={classes.trdTitle}>Active Trade Offers</h1>
                                    <div className={classes.root}>
                                        <Grid
                                            container spacing={3}
                                        >
                                            {post.bids.map(bid => (
                                                <Grid item className={classes.btmGrid} key={post.bids.indexOf(bid)}>
                                                    <InteractiveBidCard bid={bid} />
                                                </Grid>
                                            ))}
                                        </Grid>
                                    </div>
                                </CardContent>
                            </Collapse>
                        </Card>
                    </Grid>

                </Grid>
            </div>
        </>
    );
}

export default ViewMyPost;