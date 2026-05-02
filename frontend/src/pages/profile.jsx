import React, { useContext, useEffect, useState } from 'react';
import { Button } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import VideoCallIcon from '@mui/icons-material/VideoCall';
import HistoryIcon from '@mui/icons-material/History';
import PersonIcon from '@mui/icons-material/Person';
import { useNavigate } from 'react-router-dom';
import AppNavbar from '../components/AppNavbar';
import SupportFooter from '../components/SupportFooter';
import { AuthContext } from '../contexts/AuthContext';
import withAuth from '../utils/withAuth';
import "../App.css";

function Profile() {
    const navigate = useNavigate();
    const { getProfileOfUser, getHistoryOfUser } = useContext(AuthContext);
    const [profile, setProfile] = useState({
        name: "Shree Connect User",
        username: localStorage.getItem("username") || "Signed in user",
        meetingCount: 0
    });

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const data = await getProfileOfUser();
                setProfile(data);
            } catch {
                try {
                    const history = await getHistoryOfUser();
                    setProfile((current) => ({
                        ...current,
                        meetingCount: history.length
                    }));
                } catch {
                    // Keep the local fallback profile.
                }
            }
        };

        fetchProfile();
    }, [getHistoryOfUser, getProfileOfUser]);

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("username");
        navigate("/auth");
    };

    return (
        <>
            <AppNavbar mode="app" />
            <main className="profilePage">
                <section className="profileHero">
                    <div className="profileAvatar">
                        <PersonIcon />
                    </div>
                    <div>
                        <p className="eyebrow">Your profile</p>
                        <h1>{profile.name}</h1>
                        <p>{profile.username}</p>
                    </div>
                </section>

                <section className="profileStats">
                    <div>
                        <span>{profile.meetingCount || 0}</span>
                        <p>Total meetings</p>
                    </div>
                    <div>
                        <span>Active</span>
                        <p>Account status</p>
                    </div>
                    <div>
                        <span>24/7</span>
                        <p>Support access</p>
                    </div>
                </section>

                <section className="profileActions">
                    <Button variant="contained" startIcon={<VideoCallIcon />} onClick={() => navigate("/home")}>
                        Start or join meeting
                    </Button>
                    <Button variant="outlined" startIcon={<HistoryIcon />} onClick={() => navigate("/history")}>
                        View meeting history
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<LogoutIcon />} onClick={logout}>
                        Logout
                    </Button>
                </section>
            </main>
            <SupportFooter />
        </>
    );
}

export default withAuth(Profile);
