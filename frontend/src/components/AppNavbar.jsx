import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import HistoryIcon from '@mui/icons-material/History';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import MailOutlineIcon from '@mui/icons-material/MailOutline';
import PersonIcon from '@mui/icons-material/Person';
import VideoCallIcon from '@mui/icons-material/VideoCall';

const supportEmail = "ravipratapsinghdewal@gmail.com";

export default function AppNavbar({ variant = "light", mode = "public" }) {
    const navigate = useNavigate();
    const isDark = variant === "dark";

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/auth");
    };

    return (
        <nav className={`appNavbar ${isDark ? "appNavbarDark" : ""}`}>
            <Link to={mode === "app" ? "/home" : "/"} className="brandLockup">
                <span className="brandMark">श्री</span>
                <span>
                    <strong>श्री Connect</strong>
                    <small>Video calls made simple</small>
                </span>
            </Link>

            <div className="navPills">
                {mode === "app" ? (
                    <>
                        <button onClick={() => navigate("/home")}>
                            <VideoCallIcon fontSize="small" />
                            Home
                        </button>
                        <button onClick={() => navigate("/history")}>
                            <HistoryIcon fontSize="small" />
                            History
                        </button>
                        <button onClick={() => navigate("/profile")}>
                            <PersonIcon fontSize="small" />
                            Profile
                        </button>
                        <button onClick={() => navigate("/support")}>
                            <MailOutlineIcon fontSize="small" />
                            Support
                        </button>
                        <button className="navPrimary" onClick={handleLogout}>
                            <LogoutIcon fontSize="small" />
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <button onClick={() => navigate("/aljk23")}>
                            <VideoCallIcon fontSize="small" />
                            Join guest
                        </button>
                        <button onClick={() => navigate("/support")}>
                            <MailOutlineIcon fontSize="small" />
                            Support
                        </button>
                        <button onClick={() => navigate("/auth")}>Register</button>
                        <button className="navPrimary" onClick={() => navigate("/auth")}>
                            <LoginIcon fontSize="small" />
                            Login
                        </button>
                    </>
                )}
            </div>
        </nav>
    );
}
