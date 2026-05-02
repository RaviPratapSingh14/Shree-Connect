import React, { useContext, useEffect, useState } from 'react'
import { AuthContext } from '../contexts/AuthContext'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import SupportFooter from '../components/SupportFooter';
import AppNavbar from '../components/AppNavbar';

export default function History() {


    const { getHistoryOfUser } = useContext(AuthContext);

    const [meetings, setMeetings] = useState([])


    useEffect(() => {
        const fetchHistory = async () => {
            try {
                const history = await getHistoryOfUser();
                setMeetings(history);
            } catch {
                // IMPLEMENT SNACKBAR
            }
        }

        fetchHistory();
    }, [getHistoryOfUser])

    let formatDate = (dateString) => {

        const date = new Date(dateString);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0")
        const year = date.getFullYear();

        return `${day}/${month}/${year}`

    }

    return (
        <>
            <AppNavbar mode="app" />
        <div className="historyPage">
            <div className="historyHeader">
                <div>
                    <p className="eyebrow">Your recent rooms</p>
                    <h1>Meeting History</h1>
                </div>
            </div>
            <div className="historyGrid">
            {
                (meetings.length !== 0) ? meetings.map((e, i) => {
                    return (

                            <Card key={i} variant="outlined" className="historyCard">


                                <CardContent>
                                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                                        Code: {e.meetingCode}
                                    </Typography>

                                    <Typography sx={{ mb: 1.5 }} color="text.secondary">
                                        Date: {formatDate(e.date)}
                                    </Typography>

                                </CardContent>


                            </Card>
                    )
                }) : <p className="emptyHistory">No meetings yet. Join a room and it will appear here.</p>

            }
            </div>
            <SupportFooter />

        </div>
        </>
    )
}
