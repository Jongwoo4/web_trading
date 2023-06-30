import React, { useEffect, useState, } from "react";
import { Grid } from '@material-ui/core/';
import { ThemeProvider, createTheme, makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import IconButton from '@mui/material/IconButton';
import { Link } from 'react-router-dom';
import { Edit, Delete, Pageview } from '@mui/icons-material';
import "./MyPosts.css";
import { useLocation } from "react-router-dom";
import { SERVER_URL } from "../env";

const theme = createTheme({
    typography: {
        fontFamily: [
            'Manrope',
            'Light 300',
        ].join(','),
    },
});

const addIcon = {
    '& svg': {
        fontSize: 100,
        color: "#ABC4FF",
    }
}
const useStyles = makeStyles({
    pgTitle: {
        paddingTop: 15, 
        textAlign: "center",
        // paddingLeft: 30, 
        color: "#ABC4FF", 
        fontSize: 50,
    },
});


function MyPosts(props) {
    //let { state } = useLocation();
    const [posts, setPosts] = useState([]);
    const [userName, setUser] = useState("");
    const [userID, setUserID] = useState(props.userID)

    useEffect(() => {
        // Get user's post data from server
        // code below requires server call
        getData();

    }, []);

    useEffect(() => {
        if (props.userID !== userID) {
            setUserID(props.userID);
        }
    }, [props]);

    function getData() {
        if (userID) {
            fetch(SERVER_URL + "users/" + userID)
                .then(response => response.json())
                .then(user => {
                    if (user) {
                        setUser(user.user.userName);
                        fetch(SERVER_URL + 'post/byUser/' + user.user.userName)
                            .then(response => response.json())
                            .then(datas => {
                                setPosts(datas);
                            });
                    }
                });
        }
    }
    function deleteItem(itemId) {
        // delete user data from server
        // code below requires server call
        const newPosts = posts.filter((p) => p._id !== itemId);
        setPosts(newPosts);
        fetch(SERVER_URL + "post/" + itemId, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .catch(e => console.log(e));

    }
    const classes = useStyles();
    return (
        <ThemeProvider theme={theme}>
            <>
            <span><h1 className={classes.pgTitle}>My Posts</h1></span>
                <div className="myposts">
                    <Grid
                        container spacing={3} columns={{ xs: 4, sm: 8, md: 12 }}
                    >
                        <Grid item xs="auto" sm={4} md={4} key='-1'>
                            <Card className="posts-background new-post">
                                <CardContent>
                                    <Link to={"/post"}
                                        state={{ post: {}, userID: userID, userName: userName }}
                                        className='button-link'>
                                        <IconButton sx={addIcon}>
                                            <AddCircleIcon /> Create New Post
                                        </IconButton>


                                    </Link>
                                </CardContent>
                            </Card></Grid>
                        {posts.map(post => (
                            <Grid item xs="auto" sm={4} md={4} key={posts.indexOf(post)}>

                                <Card className="posts-background">
                                    <Link to={"/userpost"} state={{ post: post }} color="primary" className='button-link'>
                                        <CardMedia
                                            className="post-img"
                                            image={post.postImg}
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="h2">
                                                {post.postName}
                                            </Typography>
                                            <Typography variant="body2" color="textSecondary" component="p">
                                                {post.postDescription}
                                            </Typography>
                                        </CardContent>
                                    </Link>

                                    <CardActions>
                                        <Link to={"/post"} state={{ post: post, userID: userID, userName: userName }} className='button-link'>
                                            <Button size="small" startIcon={<Edit />} color="primary">Edit</Button></Link>
                                        {/* <Link to={"/userpost"} state={{ post: post }} color="primary" className='button-link'>
        <Button size="small" startIcon={<Pageview />} color="primary">View</Button>
        </Link> */}
                                        <Button size="small" startIcon={<Delete />} color="primary" onClick={() => deleteItem(post._id)}>Delete</Button>
                                    </CardActions>
                                </Card>
                                {/* </Link> */}
                            </Grid>
                        ))}
                    </Grid>
                </div>
            </>
            
        </ThemeProvider>
    )
}

export default MyPosts;