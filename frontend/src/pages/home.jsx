import React, { useContext, useState } from 'react'
import withAuth from '../utils/withAuth'
import { useNavigate } from 'react-router-dom'
import "../App.css";
import { Button, Snackbar, TextField } from '@mui/material';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import HistoryIcon from '@mui/icons-material/History';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import IosShareIcon from '@mui/icons-material/IosShare';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { AuthContext } from '../contexts/AuthContext';
import SupportFooter from '../components/SupportFooter';
import AppNavbar from '../components/AppNavbar';

function HomeComponent() {

    let navigate = useNavigate();
    const [meetingCode, setMeetingCode] = useState("");
    const [createdMeetingCode, setCreatedMeetingCode] = useState("");
    const [toast, setToast] = useState("");
    const { addToUserHistory } = useContext(AuthContext);

    const getInviteLink = (code = meetingCode || createdMeetingCode) => `${window.location.origin}/${code}`;

    const createMeetingCode = () => {
        const code = `shree-${Math.random().toString(36).slice(2, 8)}`;
        setCreatedMeetingCode(code);
        setMeetingCode(code);
        setToast("Meeting code created");
    }

    const copyInviteLink = async (code = meetingCode || createdMeetingCode) => {
        if (!code.trim()) return;

        try {
            await navigator.clipboard.writeText(getInviteLink(code));
            setToast("Invite link copied");
        } catch {
            setToast("Unable to copy invite link");
        }
    }

    const shareInviteLink = async (code = meetingCode || createdMeetingCode) => {
        if (!code.trim()) return;

        const inviteLink = getInviteLink(code);
        try {
            if (navigator.share) {
                await navigator.share({
                    title: "Join my श्री Connect meeting",
                    text: "Join my video meeting on श्री Connect.",
                    url: inviteLink
                });
                return;
            }

            await copyInviteLink(code);
        } catch {
            setToast("Sharing was cancelled");
        }
    }

    let handleJoinVideoCall = async () => {
        await addToUserHistory(meetingCode)
        navigate(`/${meetingCode}`)
    }

    return (
        <>
            <AppNavbar mode="app" />
            <div className="homeContainer">
                <div className="homeLeft">
                    <p className="eyebrow">Start or join a room</p>
                    <h2 className="homeHeading">
                        Providing Quality Video Calls Just Like Quality Education
                    </h2>
                    <p className="homeSubheading">Paste a meeting code and step into a clean, focused call space.</p>

                    <div className="joinBox">
                        <TextField
                            label="Enter Meeting Code"
                            variant="outlined"
                            value={meetingCode}
                            onChange={(e) => setMeetingCode(e.target.value)}
                            sx={{ borderRadius: 2 }}
                        />
                        <Button variant='contained' disabled={!meetingCode.trim()} onClick={handleJoinVideoCall}>
                            Join
                        </Button>
                    </div>

                    <div className="meetingCreator">
                        <div>
                            <p className="eyebrow">Create meeting</p>
                            <h3>{createdMeetingCode || "Generate a fresh room code"}</h3>
                            <span>{createdMeetingCode ? getInviteLink(createdMeetingCode) : "Create, copy, share, and start a room in one flow."}</span>
                        </div>
                        <div className="meetingCreatorActions">
                            <Button variant="contained" startIcon={<AddCircleIcon />} onClick={createMeetingCode}>
                                Create
                            </Button>
                            <Button variant="outlined" startIcon={<ContentCopyIcon />} disabled={!meetingCode.trim()} onClick={() => copyInviteLink()}>
                                Copy Invite
                            </Button>
                            <Button variant="outlined" startIcon={<IosShareIcon />} disabled={!meetingCode.trim()} onClick={() => shareInviteLink()}>
                                Share
                            </Button>
                        </div>
                    </div>

                    <div className="quickOptions">
                        <button onClick={() => navigate(`/room-${Date.now().toString().slice(-6)}`)}>
                            <VideoCallIcon />
                            <span>Start new room</span>
                        </button>
                        <button onClick={() => navigate("/history")}>
                            <HistoryIcon />
                            <span>View history</span>
                        </button>
                        <a href="mailto:ravipratapsinghdewal@gmail.com">
                            <SupportAgentIcon />
                            <span>Contact support</span>
                        </a>
                    </div>
                </div>

                <div className='homeRight'>
                    <img src='/logo3.png' alt="hero" className='homeImg' />
                </div>
            </div>
            <SupportFooter />
            <Snackbar
                open={Boolean(toast)}
                autoHideDuration={2400}
                onClose={() => setToast("")}
                message={toast}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </>
    )
}

export default withAuth(HomeComponent)
