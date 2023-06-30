import React, {useEffect, useState} from "react";
import { Link } from 'react-router-dom';
import "./LogOut.css";
import {ReactComponent as ReactLogo} from './../images/logout.svg';
import locate from './../images/locate.png';
import auction from './../images/auction.png';
import swap from './../images/swap.png';
import Typist from "react-typist";

function LogOut() {
    const [count, setCount] = useState(1);

        useEffect(() => {
            setCount(1);
        }, [count]);
    
    return (
        <>
            <div className="main_box">
            <div className="placehold"></div><br></br>
            <h1 className='appname1'>Tradeverse<ReactLogo sx={{display: 'flex', alignItems: 'center'}} /></h1>
            <div></div><br></br>
            <h1 className="header">
                {count ? (
                            <Typist avgTypingDelay={90} onTypingDone={() => setCount(0)}>
                            <span> Trade where you want</span>
                            <Typist.Backspace count={20} delay={1300} />
                            <span> Trade what you want</span>
                            <Typist.Backspace count={20} delay={1300} />
                            <span> Trade when you want</span>
                            <Typist.Backspace count={20} delay={1300} />
                            </Typist>
                                ) : ("")}
            </h1>
            <h1 className="statem">
                Sign up to join Tradeverse today!!!
            </h1>
            <Link to="/signup">
            <button className="startnow"><span>Sign Up</span></button>
            </Link>
            
            <div className="placehold2"></div><br></br>
            </div>
            <div className="row">
                <div className="locateCap">
                    <img src={locate} width="100" height= "100" className="img1"/>
                    <p className="caption">Locate Item</p>
                    <p>You can view the location of posted items easily
                        to decise on making a trade offer</p>
                </div>
                <div className="auctionCap">
                    <img src={auction} width="100" height= "100" className="img1"/>
                    <p className="caption">Auction Item</p>
                    <p>Use Tradeverse to auction your unwanted item 
                        in the house to item you want</p>
                </div>
                <div className="swapCap">
                    <img src={swap} width="100" height= "100" className="img1"/>
                    <p className="caption">Post Item</p>
                    <p>Use Tradeverse to post unwanted item in the 
                        house to accept best trade offers for you</p>
                </div>
            </div>
            <div className="remain"></div>

        </>
    )        
}

export default LogOut;