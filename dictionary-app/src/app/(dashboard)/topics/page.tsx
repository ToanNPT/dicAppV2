// MUI Imports
'use client'
import Grid from '@mui/material/Grid'

// Components Imports
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axiosInstance from "../../../../axios";
import {useEffect, useState} from "react";
import TopicCard from "@views/card-basic/TopicCard";
import Loader from "@components/loader/Loader";
import CardActions from "@mui/material/CardActions";
import Button from "@mui/material/Button";
import {useRouter} from "next/navigation";

const TopicsView = () => {

    const router = useRouter();
    const [popularTopics, setPopularTopics] = useState([]);
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [allTopics, setAllTopics] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchPopularTopics = async () => {
        setLoading(true);
        const response = await axiosInstance.get('/view/topics/popular');
        let popularTopics = [];
        if (response.data.status == 200) {
            setPopularTopics(response.data.data)
            console.log("check: ", response.data.data);
        } else {
            console.log('Error fetching popular topics');
        }
        setLoading(false);
    }

    const fetchAllTopics = async () => {
        setLoading(true);
        const response = await axiosInstance.get('/view/topics', {params: {page: page, size: 100}});
        let allTopics = [];
        if (response.data.status == 200) {
            setAllTopics(response.data.data);
            const totalPage = response.data.totalPage;
            const currPage = response.data.currentPage;
            setTotalPage(totalPage);
            setPage(currPage);
            console.log("check: ", response.data.data);
        } else {
            console.log('Error fetching all topics');
        }
        setLoading(false);
    }

    const getTopicsByIndex = async (isNext: boolean) => {

        setLoading(true);
        const response = await axiosInstance.get('/view/topics', {
            params: {
                page: isNext ? page + 1 : page - 1,
                size: 100
            }
        });

        if (response.data.status == 200) {
            setAllTopics(response.data.data);
            const totalPage = response.data.totalPage;
            const currPage = response.data.currentPage;
            setTotalPage(totalPage);
            setPage(currPage);
            console.log("getTopicsByIndex: ", response.data.data);
        } else {
            console.log('Error fetching all topics');
        }
        setLoading(false)
    }

    useEffect(() => {
        fetchPopularTopics();
        fetchAllTopics();
    }, [])

    return (

        <Grid container spacing={6}>

            <Grid item xs={12}>
                <Typography variant='h3'>Các chủ điểm phổ biến</Typography>
                <Divider/>
            </Grid>
            {
                popularTopics.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <TopicCard
                                onClick={() => router.push(`/words?topicId=${item.id}`)}
                                data={item}
                            />
                        </Grid>
                    )
                })

            }

            <Grid item xs={12} sx={{marginTop: "32px"}}>
                <Typography variant='h3'>Tất cả các chủ điểm</Typography>

                <Divider/>

            </Grid>
            {
                loading ?   <Grid item xs={12} sm={6} md={4}><Loader /> </Grid>:
                allTopics.map((item, index) => {
                    return (
                        <Grid item xs={12} sm={6} md={4}>
                            <TopicCard
                                onClick={() => router.push(`/words?topicId=${item.id}`)}
                                data={item}
                            />
                        </Grid>
                    )
                })
            }
            <CardActions className='justify-between ' style={{width: "100%", justifyContent: "center"}}>
                <Button variant='contained' disabled={page <= 1} onClick={() => getTopicsByIndex(false)}>Trang
                    trước</Button>
                <Button variant='contained' disabled={page >= totalPage} onClick={() => getTopicsByIndex(true)}>Trang
                    sau</Button>
            </CardActions>
        </Grid>
    )

}


export default TopicsView;
