import React from 'react';
import { Link } from 'react-router-dom';
import EmailIcon from '@mui/icons-material/Email';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';

const supportEmail = "ravipratapsinghdewal@gmail.com";

export default function SupportFooter({ variant = "light" }) {
    return (
        <footer className={`supportFooter ${variant === "dark" ? "supportFooterDark" : ""}`}>
            <div>
                <p className="eyebrow">Support</p>
                <h2>Need help with श्री Connect?</h2>
                <p>Reach out for account help, meeting issues, feedback, or feature requests.</p>
            </div>

            <div className="supportFooterActions">
                <a href={`mailto:${supportEmail}`} className="supportLink">
                    <EmailIcon fontSize="small" />
                    {supportEmail}
                </a>
                <Link to="/auth" className="supportLink">
                    <SupportAgentIcon fontSize="small" />
                    Account access
                </Link>
                <Link to="/support" className="supportLink">
                    <SupportAgentIcon fontSize="small" />
                    Support center
                </Link>
            </div>
        </footer>
    );
}
