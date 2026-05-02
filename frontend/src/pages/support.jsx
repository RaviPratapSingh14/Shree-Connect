import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SendIcon from '@mui/icons-material/Send';
import AppNavbar from '../components/AppNavbar';
import SupportFooter from '../components/SupportFooter';
import "../App.css";

const supportEmail = "ravipratapsinghdewal@gmail.com";

const faqs = [
    {
        question: "How do I create a meeting?",
        answer: "Sign in, open Home, click Create, then copy or share the generated invite link."
    },
    {
        question: "Can guests join without an account?",
        answer: "Yes. Guests can join with a meeting link or the guest option on the landing page."
    },
    {
        question: "Where can I see previous meetings?",
        answer: "Signed-in users can open History from the navbar to view recent meeting codes."
    },
    {
        question: "What should I do if camera or mic does not work?",
        answer: "Check browser permissions, refresh the page, and make sure no other app is using the camera or microphone."
    }
];

export default function Support() {
    const [form, setForm] = useState({ name: "", email: "", message: "" });

    const updateField = (field, value) => {
        setForm((current) => ({ ...current, [field]: value }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        const subject = encodeURIComponent("श्री Connect feedback");
        const body = encodeURIComponent(
            `Name: ${form.name}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
        );
        window.location.href = `mailto:${supportEmail}?subject=${subject}&body=${body}`;
    };

    return (
        <>
            <AppNavbar />
            <main className="supportPage">
                <section className="supportHero">
                    <div>
                        <p className="eyebrow">Support center</p>
                        <h1>We are here to help you connect better.</h1>
                        <p>Ask for help, report an issue, or send feedback for श्री Connect.</p>
                    </div>
                    <a href={`mailto:${supportEmail}`} className="supportHeroEmail">
                        <EmailIcon />
                        {supportEmail}
                    </a>
                </section>

                <section className="supportContent">
                    <div className="faqPanel">
                        <div className="sectionIntro compactIntro">
                            <p className="eyebrow">FAQ</p>
                            <h2>Quick answers</h2>
                        </div>
                        {faqs.map((faq) => (
                            <details key={faq.question} className="faqItem">
                                <summary>
                                    <HelpOutlineIcon fontSize="small" />
                                    {faq.question}
                                </summary>
                                <p>{faq.answer}</p>
                            </details>
                        ))}
                    </div>

                    <form className="feedbackForm" onSubmit={handleSubmit}>
                        <div className="sectionIntro compactIntro">
                            <p className="eyebrow">Feedback</p>
                            <h2>Send a message</h2>
                        </div>
                        <TextField
                            label="Your name"
                            value={form.name}
                            onChange={(event) => updateField("name", event.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Your email"
                            type="email"
                            value={form.email}
                            onChange={(event) => updateField("email", event.target.value)}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Message"
                            value={form.message}
                            onChange={(event) => updateField("message", event.target.value)}
                            fullWidth
                            required
                            multiline
                            minRows={5}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            startIcon={<SendIcon />}
                            disabled={!form.name.trim() || !form.email.trim() || !form.message.trim()}
                        >
                            Send feedback
                        </Button>
                    </form>
                </section>
            </main>
            <SupportFooter />
        </>
    );
}
