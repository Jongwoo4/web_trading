import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FlagIcon from '@mui/icons-material/Flag';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MessageIcon from '@mui/icons-material/Message';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import { Link } from 'react-router-dom';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'flex',
        justiyContent: 'space-between',
        flexDirection: 'column',
        maxWidth: 345,
    },
    headCol: {
        color: "#ABC4FF",
    },
    crdBod: {
        color: "rgba(0, 0, 0, 0.6)",
    },
    icoText: {
        color: "#ABC4FF",
        fontSize: 10,
        fontWeight: "bold",
    },
    button: {
        backgroundColor: "#ABC4FF",
        color: "#ABC4FF",
        '&:hover': {
            backgroundColor: "#ABC4FF",
            color: "#ABC4FF",
        }
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

function InteractiveBidCard({ bid }) {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    height="140"
                    image={bid.imgSrc}
                    alt="bid item img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" className={classes.headCol} component="div">
                        {bid.bidTitle}
                    </Typography>
                    <Typography gutterBottom variant="body2" className={classes.crdBod}>
                        {bid.bidSummary}
                    </Typography>
                    <Typography variant="body2" className={classes.crdBod}> {/*will change the contents of this to dynamic poster name in phase 2*/}
                        Bidder: {bid.bidder}
                    </Typography>
                    <Typography variant="body2" className={classes.crdBod}> {/*will change the contents of this to dynamic date in phase 2*/}
                        Offer made on: Sun Jan 02 2022
                    </Typography>
                </CardContent>
                <CardActions disableSpacing>
                    <Link to={"/messages"} className='button-link'>
                        <Button size="small" color="primary">
                            <IconButton aria-label="message trademate">
                                <MessageIcon className={classes.headCol} /> <span className={classes.icoText}>Message Bidder</span>
                            </IconButton>
                        </Button>
                    </Link>
                    <Link to={"/newreport"} className='button-link'>
                        <IconButton aria-label="report bid">
                            <FlagIcon className={classes.headCol} /> <span className={classes.icoText}>Report</span>
                        </IconButton>
                    </Link>
                </CardActions>
                <Button className={classes.button} variant="contained" onClick={() => {
                    alert('You have successfuly accepted this trade offer. A message will be automatically sent to this bidder now.');
                }}>Accept Trade</Button>
            </Card>
        </ThemeProvider>
    );
}

export default InteractiveBidCard;