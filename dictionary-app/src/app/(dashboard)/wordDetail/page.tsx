// MUI Imports
'use client'
import Grid from '@mui/material/Grid'

// Components Imports
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axiosInstance from "../../../../axios";
import React, {Suspense, useEffect, useState} from "react";
import {useSearchParams} from "next/navigation";
import WordDetailCard from "@components/word-detail-card/WordDetailCard";

const WordView = () => {

    const searchParams = useSearchParams();
    const [wordDetail, setWordDetail] = useState({
        id: 0,
        keyWork: "",
        topicId: "",
        topicName: "",
        isHidden: false,
        voiceUrl: "",
        updateTime: "",
        wordType: "",
        descriptions: []
    });
    const [loading, setLoading] = useState(false);
    const wordId = searchParams.get("wordId");


    const fetchWordDetail = async () => {
        setLoading(true);
        const response = await axiosInstance.get(`/view/words/${wordId}`);

        if (response.data.status == 200) {
            setWordDetail(response.data.data);
            console.log("check: ", response.data.data);
        } else {
            console.log('Error fetching all topics');
        }
        setLoading(false);
    }

    useEffect(() => {
        fetchWordDetail();
    }, []);

    return (
        <Grid container spacing={6} md={12}>
            <Grid item xs={12}>
                <Typography variant='h3'>Từ Điển Hán Việt</Typography>
                <Divider/>
                <WordDetailCard data={wordDetail}/>
            </Grid>
        </Grid>

    )

}


export default WordView;
