import React from 'react';
import { Box, Container, Typography, TextField, Button, Grid, Link } from '@mui/material';
import { Facebook, Instagram, Twitter } from '@mui/icons-material';
import YouTubeIcon from '@mui/icons-material/YouTube';
const Contact = () => {
    return (
        <Box sx={{ bgcolor: '#0a1929', color: '#FFB300', py: 8 }}>
            <Container maxWidth="lg">
                <Typography variant="h2" component="h1" gutterBottom align="center" sx={{ mb: 6 }}>
                    Contact Us
                </Typography>
                <Grid container spacing={6}>
                    <Grid xs={12} md={6}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Get in Touch
                        </Typography>
                        <form>
                            <TextField
                                fullWidth
                                label="Name"
                                margin="normal"
                                required
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Email"
                                margin="normal"
                                type="email"
                                required
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Subject"
                                margin="normal"
                                required
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                    },
                                }}
                            />
                            <TextField
                                fullWidth
                                label="Message"
                                margin="normal"
                                multiline
                                rows={4}
                                required
                                InputLabelProps={{
                                    style: { color: 'white' },
                                }}
                                sx={{
                                    '& .MuiOutlinedInput-root': {
                                        '& fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&:hover fieldset': {
                                            borderColor: 'white',
                                        },
                                        '&.Mui-focused fieldset': {
                                            borderColor: 'white',
                                        },
                                    },
                                    '& .MuiInputBase-input': {
                                        color: 'white',
                                    },
                                }}
                            />
                            <Button variant="contained" color="primary" type="submit" sx={{ mt: 2 }}>
                                Send Message
                            </Button>
                        </form>
                    </Grid>
                    <Grid xs={12} md={6}>
                        <Typography variant="h4" component="h2" gutterBottom>
                            Contact Information
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Address:</strong> 15 Trần Khắc Chân Phường Tân Định,TP.HCM
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 2 }}>
                            <strong>Phone:</strong> (+84)768957156
                        </Typography>
                        <Typography variant="body1" sx={{ mb: 4 }}>
                            <strong>Email:</strong> khanggiavu250296@gmail.com
                        </Typography>

                        <Typography variant="h5" component="h3" gutterBottom>
                            Follow Us
                        </Typography>
                        <Box sx={{ mb: 4 }}>
                            <Link href="https://facebook.com" color="inherit" sx={{ mr: 2 }}>
                                <Facebook />
                            </Link>
                            <Link href="https://instagram.com" color="inherit" sx={{ mr: 2 }}>
                                <Instagram />
                            </Link>
                            <Link href="https://twitter.com" color="inherit" sx={{ mr: 2 }}>
                                <Twitter />
                            </Link>
                            <Link href="https://youtube.com" color="inherit" sx={{ mr: 2 }}>
                                <YouTubeIcon />
                            </Link>
                        </Box>

                        <Typography variant="h5" component="h3" gutterBottom>
                            Map
                        </Typography>
                        <Box sx={{ height: '300px', bgcolor: 'grey.800', mb: 4 }}>
                            {/* Google Map Iframe */}
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.424389912398!2d106.6873323147499!3d10.77888169232009!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f3a3935f5d3%3A0x2873a20f6d3058f!2sCybersoft%20Academy!5e0!3m2!1sen!2s!4v1678886898653!5m2!1sen!2s"
                                width="100%"
                                height="100%"
                                style={{ border: 0 }}
                                allowFullScreen=""
                                loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"
                            ></iframe>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
};

export default Contact;