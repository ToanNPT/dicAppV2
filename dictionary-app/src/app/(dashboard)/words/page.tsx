// MUI Imports
'use client'
import Grid from '@mui/material/Grid'

// Components Imports
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axiosInstance from "../../../../axios";
import React, {Suspense, useEffect, useState} from "react";
import Loader from "@components/loader/Loader";
import {Pagination} from "@mui/material";
import Button from "@mui/material/Button";
import CommonTable from "@components/table/CommonTable";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import {useRouter, useSearchParams} from "next/navigation";

const WordView = () => {

    const searchParams = useSearchParams();
    const [words, setWords] = useState([]);
    const [topicCbx, setTopicCbx] = useState([]); // [topicName, topicId]
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [form, setForm] = useState({
        searchText: searchParams.get('searchText') || '',
        topicId: searchParams.get('topicId') || -1
    })
    const router = useRouter();


    const columnsWord = [
        'Từ vựng',
        'Tư loại',
        'Chủ điểm',
        "Phát âm"
    ];

    const handlePageChange = (event, value) => {
        setPage(value);  // Update the current page
    };

    const handleOnChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevents the default form submission behaviour
        // Process and send formData to the server or perform other actions
        await fetchFilterWords(1, 10);
    };

    const fetchFilterWords = async (curPage, size) => {
        setLoading(true);
        const response = await axiosInstance.get('/view/words/search', {params: {...form, page: curPage, size: size}});

        if (response.data.status == 200) {
            setWords(response.data.data);
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

    const fetchTopics = async () => {
        setLoading(true);
        const response = await axiosInstance.get('/view/topics/all');

        if (response.data.status == 200) {
            let topicCdNames = response.data.data.map(i => {
                return {topicId: i.id, topicName: i.topicName}
            });
            topicCdNames = [{topicName: 'Tất cả chủ điểm', topicId: -1}, ...topicCdNames];

            console.log("topicCdNames", topicCdNames)
            setTopicCbx(topicCdNames);
            console.log("check: ", response.data.data);
        } else {
            console.log('Error fetching all topics');
        }
        setLoading(false);

    }

    const handleViewWordDetail = (wordId: number) => {
        router.push(`/wordDetail?wordId=${wordId}`);
    }

    useEffect(() => {
        fetchTopics();
        fetchFilterWords(1, 20);
    }, [])

    useEffect(() => {
        fetchFilterWords(page, 20);
    }, [page])

    return (
        <Grid container spacing={6} md={12}>
            {loading && <Loader/>}
            <Grid item xs={12}>
                <Typography variant='h3'>Sổ Tay Điện Tử Từ Hán Việt</Typography>
                <Divider/>
            </Grid>
            <Grid item xs={12} md={12} container spacing={2} style={{marginTop: "8px", paddingLeft: "32px"}}>
                <form
                    style={{width: "100%"}}
                    sx={{
                        width: {
                            xs: '100%',
                            md: '70%'
                        }
                    }}
                    onSubmit={handleSubmit}
                >
                    <Grid item container spacing={3}>
                        <Grid item md={4} xs={10}>
                            <Select
                                size="small"
                                sx={{width: '100%'}}
                                label="Chủ điểm"
                                placeholder="Chọn chủ điểm"
                                name="topicId"
                                onChange={handleOnChange}
                                value={form.topicId}
                            >
                                {
                                    topicCbx.map((item, index) => {
                                        return <MenuItem key={index}
                                                         value={item.topicId}>{item.topicName}</MenuItem>
                                    })
                                }
                            </Select>
                        </Grid>
                        <Grid item md={5} xs={10}>
                            <TextField
                                size="small"
                                sx={{width: '100%'}}
                                label="Từ vựng"
                                placeholder="Nhập từ vựng"
                                variant="outlined"
                                name="searchText"
                                onChange={handleOnChange}
                            />
                        </Grid>

                        <Grid item md={2} xs={10}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                            >
                                Tìm Kiếm
                            </Button>
                        </Grid>
                    </Grid>
                </form>

                <CommonTable
                    columnNames={columnsWord}
                    dataset={words}
                    handleViewWordDetail={handleViewWordDetail}
                />

                <Grid item container justifyContent="center">
                    <Pagination
                        count={totalPage}  // Total number of pages
                        page={page}    // Current page
                        onChange={handlePageChange}  // Handle page change
                        color="primary"
                    />
                </Grid>
            </Grid>

        </Grid>

    )

}


export default WordView;
