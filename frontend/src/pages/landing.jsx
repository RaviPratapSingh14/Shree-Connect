import React from 'react'
import "../App.css"
import { Link, useNavigate } from 'react-router-dom'
import SupportFooter from '../components/SupportFooter';
import AppNavbar from '../components/AppNavbar';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import HistoryIcon from '@mui/icons-material/History';
import SecurityIcon from '@mui/icons-material/Security';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import VideoCallIcon from '@mui/icons-material/VideoCall';

export default function LandingPage() {


    const router = useNavigate();

    return (
        <div className='landingPageContainer'>
            <AppNavbar variant="dark" />


            <div className="landingMainContainer">
                <div className="landingCopy">
                    <p className="eyebrow">Simple video meetings for every circle</p>
                    <h1><span>Connect</span> with your loved ones</h1>

                    <p>Cover the distance with श्री Connect</p>
                    <div className="landingActions">
                        <div className="landingCta" role='button'>
                            <Link to={"/auth"}>Get Started</Link>
                        </div>
                        <button className="secondaryAction" onClick={() => router("/aljk23")}>
                            Join as Guest
                        </button>
                    </div>

                    <div className="optionGrid">
                        <div>
                            <strong>Instant rooms</strong>
                            <span>Create or join with a simple meeting code.</span>
                        </div>
                        <div>
                            <strong>Meeting history</strong>
                            <span>Return to recent rooms when you are signed in.</span>
                        </div>
                        <div>
                            <strong>Live chat</strong>
                            <span>Share quick notes while the call is running.</span>
                        </div>
                    </div>
                </div>
                <div className="landingVisual">

                    <img src="/mobile.png" alt="श्री Connect app preview" />

                </div>
            </div>

            <section className="landingSection landingSectionLight">
                <div className="sectionIntro">
                    <p className="eyebrow">How it works</p>
                    <h2>Start a call in three simple steps</h2>
                </div>
                <div className="stepGrid">
                    <div>
                        <span>01</span>
                        <h3>Create a meeting</h3>
                        <p>Generate a fresh room code from your home screen.</p>
                    </div>
                    <div>
                        <span>02</span>
                        <h3>Share the invite</h3>
                        <p>Copy or share the meeting link with the people you want to invite.</p>
                    </div>
                    <div>
                        <span>03</span>
                        <h3>Join and talk</h3>
                        <p>Preview your name, enter the lobby, and start your conversation.</p>
                    </div>
                </div>
            </section>

            <section className="landingSection featuresShowcase">
                <div className="sectionIntro">
                    <p className="eyebrow">Features</p>
                    <h2>Everything needed for a clean video call</h2>
                </div>
                <div className="featureGrid">
                    <div>
                        <VideoCallIcon />
                        <h3>One-click rooms</h3>
                        <p>Create a meeting code and jump into the call quickly.</p>
                    </div>
                    <div>
                        <ContentCopyIcon />
                        <h3>Copy invite links</h3>
                        <p>Share the room link without typing long instructions.</p>
                    </div>
                    <div>
                        <HistoryIcon />
                        <h3>Meeting history</h3>
                        <p>Keep track of rooms you joined while signed in.</p>
                    </div>
                    <div>
                        <SupportAgentIcon />
                        <h3>Support center</h3>
                        <p>Get help, send feedback, and contact support from one page.</p>
                    </div>
                </div>
            </section>

            <section className="landingSection whySection">
                <div>
                    <p className="eyebrow">Why use श्री Connect</p>
                    <h2>Built for simple, familiar conversations</h2>
                    <p>श्री Connect keeps the experience focused: quick rooms, readable controls, meeting history, and support access without clutter.</p>
                    <div className="whyList">
                        <span><CheckCircleIcon /> Fast to start</span>
                        <span><CheckCircleIcon /> Easy to share</span>
                        <span><CheckCircleIcon /> Support ready</span>
                        <span><SecurityIcon /> Account-based history</span>
                    </div>
                </div>
                <div className="screenshotStack">
                    <img src="/logo3.png" alt="श्री Connect home screen preview" />
                    <img src="/mobile.png" alt="श्री Connect mobile preview" />
                </div>
            </section>

            <SupportFooter variant="dark" />



        </div>
    )
}
