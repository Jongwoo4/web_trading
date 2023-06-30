import React, { useEffect, useState, } from "react";
import { makeStyles, ThemeProvider, createTheme } from '@material-ui/core/styles';
import { useLocation } from "react-router-dom";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Done, Upload } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { addImg, deleteImg } from "../actions/image";
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

// TODO: make this functional!
var formDataGlobal;
function MakeBid(props) {
  let { state } = useLocation();
  const [formData, setFormData] = useState({});
  const [post, setPost] = useState(state.post); // for extracting information on the post we're bdding on (might cause bugs)
  const [userID, setUserID] = useState(props.userID)

  useEffect(()=>{
    if(props.userID !== userID){
      setUserID(props.userID);
    }
},[props]);
  //console.log("Making a bid for:");
  //console.log(post);

  // const [image, setImage] = useState();
  // const onChange = e => setImage(URL.createObjectURL(e.target.files[0]));

  function handleInput(event, input) {
    const newData = Object.assign({}, formData);
    var val = event.target.value
    if (input === "title") {
      newData.title = val;
    }
    else if (input === "description") {
      newData.description = val;
    }
    else if (input === "img") {
      newData.postImg = URL.createObjectURL(event.target.files[0]);
      newData.file = event.target.files[0]
      // setImage(newData.file)
    }
    setFormData(newData)
    formDataGlobal = newData;
    //console.log(newData);
  }

  async function handleMakeOffer(e) {
    // console.log("Uploading offer data to DB..");
    var temp = Object.assign({}, formDataGlobal);
    // console.log(temp);
    
    try {
      const userBody = await axios.get(`${process.env.REACT_APP_API_URL}/users/${userID}`);
      // console.log(`Getting user with user id: ${props.userID}`);
      const userName = userBody.data.user.userName;
      // console.log(`The following user just made a bid: ${userName}`);
      // POST the image
      let imgResp;
      if (formData.file) {
        const imgRes = await addImg(formData.file, userID);
        imgResp = imgRes
      }
      // console.log(imgResp);

      await axios.post(`${process.env.REACT_APP_API_URL}/offer`,
        {
          title: formData.title,
          user: userName, // bidder username
          img: imgResp.url, // now we have to process the img
          imgId: imgResp.public_id,
          description: formData.description,
          postId: state.post._id,
          tradeWith: state.post.userName,
          tradePostTitle: state.post.postName,
        });
    } catch (err) {
      console.log(err);
    }
  }

  const classes = useStyles();
  return (
    <div className="main-box">
      <h1 className={classes.hed}>Make New Trade Offer</h1>
      <Card className={classes.root}>
        <div className="details-box">
          <input accept="image/*" className="img-file"
            id="img-input"
            onChange={(e) => handleInput(e, "img")} type="file"
          />
          <label htmlFor="img-input">
            <Button variant="text" component="span" endIcon={<Upload />}>Upload Item Image</Button>
          </label>
          <img src={formData.postImg} alt="No Image" className="post-img" />

          <CardContent>
            <TextField type="text" label="Trade Item" fullWidth className="full-textfield" onChange={(e) => handleInput(e, "title")}
            />

            <span className="space" />

            <TextField
              label="Item Description"
              multiline fullWidth className="full-textfield"
              rows={4}
              onChange={(e) => handleInput(e, "description")}
            />

            <CardActions>
              <Link to={"/allposts"} className='button-link'>
                <Button className={classes.btnCol} variant="contained" onClick={handleMakeOffer} endIcon={<Done />}>Finalize Trade Offer</Button>
              </Link>
            </CardActions>
          </CardContent>


        </div>
      </Card>
    </div>
  )
}

export default MakeBid