import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import FlagIcon from '@mui/icons-material/Flag';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { FaBlackberry } from 'react-icons/fa';

const useStyles = makeStyles({
    root: {
        maxWidth: 345,
    },
    reportBtn: { 
        color: "#ABC4FF", 
        fontSize: 15 
    },
    icoBtn: {
        color: "#ABC4FF",
    },
    crdBod: {
        color: "rgba(0, 0, 0, 0.6)",
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

function BidCard({ bid }) {
    const classes = useStyles();

    return (
        <ThemeProvider theme={theme}>
            <Card className={classes.root}>
                <CardMedia
                    component="img"
                    height="140"
                    image={bid.img}
                    alt="bid item img"
                />
                <CardContent>
                    <Typography gutterBottom variant="h4" className={classes.icoBtn} component="div">
                        {bid.title}
                    </Typography>
                    <Typography gutterBottom variant="body2" className={classes.crdBod}>
                        {bid.description}
                    </Typography>
                    <Typography variant="body2" className={classes.crdBod}> {/*will change the contents of this to dynamic poster name in phase 2*/}
                        Bidder: {bid.user}
                    </Typography>
                    <Typography variant="body2" className={classes.crdBod}> {/*will change the contents of this to dynamic date in phase 2*/}
                        Offer made on: Sun Jan 02 2022
                    </Typography>
                </CardContent>
                <CardActions>
                <Link to={"/newreport"} className='button-link'>
                    <IconButton aria-label="report post">
                        <FlagIcon className={classes.icoBtn}/> <span className={classes.reportBtn}>Report</span>
                    </IconButton>
                    </Link>
                </CardActions>
            </Card>
        </ThemeProvider>
    );
}

export default BidCard;