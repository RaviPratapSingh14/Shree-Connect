import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { AuthContext } from '../contexts/AuthContext';
import { Snackbar } from '@mui/material';

const defaultTheme = createTheme();

export default function Authentication() {

    const [username, setUsername] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [name, setName] = React.useState("");
    const [error, setError] = React.useState("");
    const [message, setMessage] = React.useState("");
    const [formState, setFormState] = React.useState(0);
    const [open, setOpen] = React.useState(false);

    const { handleRegister, handleLogin } = React.useContext(AuthContext);

    const handleAuth = async () => {
        try {
            if (formState === 0) {
                await handleLogin(username, password);
            } else {
                const result = await handleRegister(name, username, password);
                setMessage(result);
                setOpen(true);
                setError("");
                setFormState(0);
                setPassword("");
                setUsername("");
                setName("");
            }
        } catch (err) {
            const msg = err?.response?.data?.message || "Something went wrong";
            setError(msg);
        }
    };

    return (
        <ThemeProvider theme={defaultTheme}>
            <Grid container component="main" sx={{ height: '100vh' }}>
                <CssBaseline />

                {/* LEFT SIDE IMAGE */}
                <Grid
                    item
                    xs={false}
                    sm={5}
                    md={7}
                    sx={{
                        backgroundImage: `url(${process.env.PUBLIC_URL}/background.png)`,
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundRepeat: 'no-repeat',
                        filter: 'brightness(.9)'
                    }}
                />

                {/* RIGHT SIDE FORM CARD */}
                <Grid
                    item
                    xs={12}
                    sm={7}
                    md={5}
                    component={Paper}
                    elevation={6}
                    square
                >
                    <Box
                        sx={{
                            my: 8,
                            mx: 6,
                            display: 'flex',
                            flexDirection: 'column',
                            alignItems: 'center',
                            width: '100%',
                        }}
                    >

                        <Avatar sx={{ bgcolor: 'primary.main', mb: 1 }}>
                            <LockOutlinedIcon />
                        </Avatar>

                        <Typography variant="h5" fontWeight={600} sx={{ mb: 2 }}>
                            {formState === 0 ? "Welcome Back" : "Create Account"}
                        </Typography>

                        {/* TOGGLE BUTTONS */}
                        <Box sx={{ display: "flex", gap: 2, mb: 3 }}>
                            <Button
                                variant={formState === 0 ? "contained" : "outlined"}
                                onClick={() => setFormState(0)}
                                sx={{ textTransform: "none", px: 3, borderRadius: 2 }}
                            >
                                Sign In
                            </Button>
                            <Button
                                variant={formState === 1 ? "contained" : "outlined"}
                                onClick={() => setFormState(1)}
                                sx={{ textTransform: "none", px: 3, borderRadius: 2 }}
                            >
                                Sign Up
                            </Button>
                        </Box>

                        {/* FORM */}
                        <Box component="form" noValidate sx={{ width: "100%", maxWidth: 420 }}>
                            
                            {formState === 1 && (
                                <TextField
                                    margin="normal"
                                    fullWidth
                                    label="Full Name"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    InputProps={{ sx: { borderRadius: 2 } }}
                                />
                            )}

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Email / Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />

                            <TextField
                                margin="normal"
                                fullWidth
                                label="Password"
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                InputProps={{ sx: { borderRadius: 2 } }}
                            />

                            {error && (
                                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                    {error}
                                </Typography>
                            )}

                            <Button
                                fullWidth
                                variant="contained"
                                sx={{ mt: 3, mb: 2, py: 1.2, borderRadius: 2, textTransform: "none", fontWeight: 600 }}
                                onClick={handleAuth}
                            >
                                {formState === 0 ? "Login" : "Register"}
                            </Button>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            <Snackbar
                open={open}
                autoHideDuration={3000}
                message={message}
                anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            />
        </ThemeProvider>
    );
}
