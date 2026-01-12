import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, IconButton, TextField } from '@mui/material';
import RestoreIcon from '@mui/icons-material/Restore';
import { AuthContext } from '../contexts/AuthContext';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            <div className="navBar homeNav">
                <div className="navLeft">
                    <h2 className="brandTitle">श्री Connect</h2>
                </div>

                <div className="navRight">
                    <IconButton onClick={() => navigate("/history")}>
                        <RestoreIcon />
                    </IconButton>
                    <p className='historyLabel'>History</p>
                    <Button
                        variant="contained"
                        color="error"
                        onClick={() => {
                            localStorage.removeItem("token")
                            navigate("/auth")
                        }}
                    >
                        Logout
                    </Button>
                </div>
            </div>

            <div className="homeContainer">
                <div className="homeLeft">
                    <h2 className="homeHeading">
                        Providing Quality Video Calls Just Like Quality Education
                    </h2>

                    <div className="joinBox">
                        <TextField
                            label="Enter Meeting Code"
                            variant="outlined"
                            onChange={(e) => setMeetingCode(e.target.value)}
                            sx={{ borderRadius: 2 }}
                        />
                        <Button variant='contained' onClick={handleJoinVideoCall}>
                            Join
                        </Button>
                    </div>
                </div>

                <div className='homeRight'>
                    <img src='/logo3.png' alt="hero" className='homeImg' />
                </div>
            </div>
        </>
    )
}

export default withAuth(HomeComponent)
