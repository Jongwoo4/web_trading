import React, { useEffect, useState, } from "react";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { Done , Upload } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { SERVER_URL } from "../env";
import { addImg, deleteImg } from "../actions/image";

import './MyPosts.css';

import {useLocation} from "react-router-dom";

function Post(props){
    let { state } = useLocation();
    //var userID = state ? state.userID : "";
    var userName = state ? state.userName : "";
    var isNew = state.post.postName? false: true;
    const [post, setPost] = useState(state.post);
    const [userID, setUserID] = useState(props.userID)
    const [error , setError] = useState('')

    useEffect(()=>{
      if(props.userID !== userID){
        setUserID(props.userID);
      }
  },[props]);

    function handleInput(event, input) {
      const newData = Object.assign({}, post);
      var val = event.target.value
      if(input === "title"){
        newData.postName = val;
    }
    else if(input === "summary"){
        newData.postDescription = val;
    }
    else if(input === "address"){
      newData.listingAddress = val;
    }
    else  if(input === "img"){
      newData.postImg = URL.createObjectURL(event.target.files[0]);
          newData.file = event.target.files[0]
    }
        setPost(newData)
    }

    function handleDone(e){
      // Get update or create data on server
      // code below requires server call
      if(post.postName === "" || post.postDescription === "" || post.listingAddress === "" || post.postImg === "" || post.postName === undefined 
          || post.postDescription === undefined || post.listingAddress === undefined || post.postImg === undefined){
            setError("Fill in All Required Field")
      }else{
              var temp = Object.assign({}, post);
            if(post.file){
            addImg(post.file, userID).then(res => {
              if(post.postImgId){
                deleteImg(post.postImgId).then(result => console.log(result)).catch(e => console.log(e));
              }
              temp.postImgId = res.public_id;
              temp.postImg = res.url;
              temp.userName = userName;
              insertOrUpdate(temp);
            }).catch((error) => {
              console.log(error)
              });
              
              }
            else{
              insertOrUpdate(temp);
            }
      }
      
  }

    function insertOrUpdate(temp){
      //TODO, do update
      var url = SERVER_URL+'post'
      var request = {
        method: "POST",
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(temp)
      }
      if(!isNew){
        url = SERVER_URL+'post/'+post._id
        request.method = "PATCH";
      }
      fetch(url, request).then(data => data.json())
    .then(res => {
      window.history.go(-1);
    });
  }

    return (
        // get rid of inline CSS later
        <div className="main-box">
          <span><h1 className="title">Create New Post</h1></span>
          <div className="box-shadow"> <Card >
       <div className="details-box">
            <input accept="image/*" className="img-file"
                    id="img-input"
                    onChange={(e) => handleInput(e, "img")} type="file"/>
                <label htmlFor="img-input">
                <Button className="text-button" variant="text" component="span" endIcon={<Upload />}>Upload Image</Button>
                </label> 
       <img src={post.postImg} alt="No Image" className="post-img"/>
       
      <CardContent>
        <TextField type="text" label="Title" onChange={(e) => handleInput(e, "title")} defaultValue={post.postName} fullWidth className="full-textfield" required
          />

        <span className="space"/>
        
        <TextField 
          label="Summary"
          multiline fullWidth className="full-textfield" 
          rows={6}
          onChange={(e) => handleInput(e, "summary")} required
          defaultValue={post.postDescription}/>

  <TextField type="text" label="Address Line" 
  onChange={(e) => handleInput(e, "address")}
  defaultValue={post.listingAddress} className="textfield60"  required
          />

      <CardActions>
        {/*<Link to={"/myposts"} className='button-link' state={{userID: userID}} >*/}
        <Button className="button"  id="submit-button" variant="contained" onClick={handleDone} endIcon={<Done />}>Done</Button>
        {/*</Link>*/}
      </CardActions>
      </CardContent>
      {error && (<p className="error"> {error} </p>)}
      
      </div>
      </Card> 
      </div>  
      </div>
    )
}

export default Post