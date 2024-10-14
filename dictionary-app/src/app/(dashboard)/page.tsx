// MUI Imports
'use client'
import Grid from '@mui/material/Grid'

// Components Imports
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import React from "react";
import IconButton from "@mui/material/IconButton";
import '../../assets/common.css'
import {useRouter} from "next/navigation";

const DashboardAnalytics = () => {
    const router = useRouter();
  return (
    <Grid container spacing={6}>

        <Grid item xs={12}>
            <Typography variant="h2" align="center" gutterBottom>
               Sổ Tay Điện Tử Từ Hán Việt
            </Typography>
            <Typography variant="h6" align="center" paragraph>
                Chào mừng bạn đến với website tra từ, khám phá các từ vựng một cách sinh động dễ dàng
            </Typography>
        </Grid>

        {/* Image or Illustration Section */}
        <Grid item xs={12} sm={6}>
            <img
                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d0ca_Chatting%20with%20Team.svg"
                alt="Welcome"
                style={{
                    width: '100%',
                    height: 'auto',
                    backgroundColor: 'transparent',
                }}
            />
        </Grid>

        {/* Button Section */}
        <Grid item xs={12} sm={6}>
            <Box textAlign="center">
                <Button variant="contained" color="primary" size="large" style={{margin: '20px'}} onClick={() => router.push("/topics")}>
                    Khám phá chủ điểm
                </Button>
                <Button variant="outlined" color="secondary" size="large" onClick={() => router.push("/words")}>
                    Khám phá từ vựng
                </Button>
            </Box>
        </Grid>

        <Grid container spacing={1} justifyContent="center" alignItems="center" style={{ padding: '32px', marginTop: "16px" }}>
            <Grid item xs={12} sm={6} md={4} key={1}>
                <Card sx={{ width: 300, borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    {/* Header */}
                    <Box sx={{ backgroundColor: '#ffbf3d', padding: '16px', }}>
                        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', minHeight: "48px" }}>
                            NHANH CHÓNG
                        </Typography>
                    </Box>

                    {/* Body */}
                    <CardContent >
                        <Typography variant="body1" sx={{textAlign: 'center', marginBottom: 2, minHeight: "132px"}}>
                            Tra cứu nhanh gọn, kết quả hiển thị tức thì, chỉ trong vài giây
                        </Typography>

                        <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d110_Idea_White.svg"
                                loading="lazy" alt="Idea stage icon: white lightbulb on a yellow background."
                                className="icon-100"/>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d111_Startup_White.svg"
                                loading="lazy" alt="Startup stage icon: white paper airplane on a purple background"
                                className="icon-100"/>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d0f3_Established_White.svg"
                                loading="lazy" alt="Startup stage icon: white bullseye on an orange background."
                                className="icon-100"/>
                        </Box>

                    </CardContent>

                    {/* Bottom-right button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            backgroundColor: '#004D40',
                            color: 'white',
                            '&:hover': {backgroundColor: '#00796B'}
                        }}
                    >
                        {/*<ArrowForwardIcon />*/}
                    </IconButton>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} key={1}>
                <Card sx={{ width: 300, borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    {/* Header */}
                    <Box sx={{ backgroundColor: '#1d88fe', padding: '16px' }}>
                        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', minHeight: "48px"}}>
                            TIỆN LỢI
                        </Typography>
                    </Box>

                    {/* Body */}
                    <CardContent>
                        <Typography variant="body1" sx={{textAlign: 'center', marginBottom: 2, minHeight: "132px"}}>
                            Tra cứu từ vựng mọi lúc, mọi nơi, trên mọi thiết bị
                        </Typography>

                        <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d111_Startup_White.svg"
                                loading="lazy" alt="Startup stage icon: white paper airplane on a purple background"
                                className="icon-100"/>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d0f3_Established_White.svg"
                                loading="lazy" alt="Startup stage icon: white bullseye on an orange background."
                                className="icon-100"/>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d0f7_Scaleup_White.svg"
                                loading="lazy" alt="Scaleup stage icon: white rocket on a dark blue background."
                                className="icon-100"/>
                        </Box>

                    </CardContent>

                    {/* Bottom-right button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            backgroundColor: '#004D40',
                            color: 'white',
                            '&:hover': {backgroundColor: '#00796B'}
                        }}
                    >
                        {/*<ArrowForwardIcon />*/}
                    </IconButton>
                </Card>
            </Grid>

            <Grid item xs={12} sm={6} md={4} key={1}>
                <Card sx={{ width: 300, borderRadius: '16px', overflow: 'hidden', position: 'relative' }}>
                    {/* Header */}
                    <Box sx={{ backgroundColor: '#9C27B0', padding: '16px' }}>
                        <Typography variant="h6" sx={{ color: 'white', textAlign: 'center', minHeight: "48px" }}>
                            LINH HOẠT
                        </Typography>
                    </Box>

                    {/* Body */}
                    <CardContent>
                        <Typography variant="body1" sx={{textAlign: 'center', marginBottom: 2, minHeight: "132px"}}>
                            Tùy chỉnh theo nhu cầu, dễ dàng điều chỉnh trải nghiệm
                        </Typography>


                        <Box sx={{display: 'flex', justifyContent: 'center', gap: 2}}>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d0f5_Exploration_White.svg"
                                loading="lazy" alt="Startup stage icon: white binoculars on a blue/green background."
                                className="icon-100"
                            />
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d110_Idea_White.svg"
                                loading="lazy" alt="Idea stage icon: white lightbulb on a yellow background."
                                className="icon-100"/>
                            <img
                                src="https://cdn.prod.website-files.com/656a38c6daad7a5061e6d038/656a38c6daad7a5061e6d111_Startup_White.svg"
                                loading="lazy" alt="Startup stage icon: white paper airplane on a purple background"
                                className="icon-100"
                            />
                        </Box>

                    </CardContent>

                    {/* Bottom-right button */}
                    <IconButton
                        sx={{
                            position: 'absolute',
                            bottom: 16,
                            right: 16,
                            backgroundColor: '#004D40',
                            color: 'white',
                            '&:hover': {backgroundColor: '#00796B'}
                        }}
                    >
                        {/*<ArrowForwardIcon />*/}
                    </IconButton>
                </Card>
            </Grid>

        </Grid>
    </Grid>
  )
}

export default DashboardAnalytics
