import { React, useState } from "react";
import TextField from "@mui/material/TextField";
import { makeStyles } from "@material-ui/core/styles";
import './searchbar.css';

const useStyles = makeStyles({
    root: {
      "& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#CCDBFD"
      },
      "&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ABC4FF"
      },
      "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "#ABC4FF"
      },
      "&:hover .MuiInputLabel-outlined": {
        color: "#ABC4FF"
      },
      "& .MuiInputLabel-outlined.Mui-focused": {
        color: "#ABC4FF"
      }
    }
  });

function SearchBar() {
    const classes = useStyles();
    return (
        <span className="main">
            <div className="search">
                <TextField
                    className={classes.root}
                    id="outlined-basic"
                    variant="outlined"
                    fullWidth
                    label="Search for items to swap"
                />
            </div>
        </span>
    );
}

export default SearchBar;