// MUI Imports
'use client'
import Grid from '@mui/material/Grid'

// Components Imports
import Typography from "@mui/material/Typography";
import axiosInstance from "../../../../axios";
import React, {Suspense, SyntheticEvent, useEffect, useRef, useState} from "react";
import {useRouter, useSearchParams} from "next/navigation";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Box from "@mui/material/Box";
import '../../../assets/common.css';
import InputAdornment from "@mui/material/InputAdornment";
import TextField from "@mui/material/TextField";
import InnerButton from "@components/upgrade-to-pro-button";
import {EditorValue} from "@components/editor/Editor";
import IconButton from "@mui/material/IconButton";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";
import dynamic from "next/dynamic";

const EditorCus = dynamic(() => import("@components/editor/Editor"), {ssr: false});
const AdminWordDetail = () => {

    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const audioRef = useRef(null); // Create a ref to control the audio element
    const [tabIndex, setTabIndex] = useState<string>('1');
    const [wordId, setWordId] = useState(searchParams.get("wordId"));

    const selectedTopicId = searchParams.get("topicId");
    const selectedTopicName = searchParams.get("topicName");

    const [wordDetail, setWordDetail] = useState({
        id: null,
        keyWork: "",
        topicId: "",
        topicName: "",
        isHidden: false,
        voiceUrl: "",
        updateTime: "",
        wordType: "",
        descriptions: []
    });

    const [form, setForm] = useState({
        id: null,
        keyWork: "",
        topicId: "",
        topicName: "",
        isHidden: false,
        voiceUrl: "",
        updateTime: "",
        wordType: "",
        descriptions: []
    })

    const handleChangeTab = (event: SyntheticEvent, newValue: string) => {
        setTabIndex(newValue)
    }

    const handlePlayAudio = () => {
        if (audioRef.current) {
            audioRef.current.play(); // Play the audio when the button is clicked
        }
    };

    const handleFormChange = (e) => {
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    const handleDecriptionChange = (index, event) => {
        if (event.target.name === "wordType") {
            const newDescriptions = form.descriptions.map((desc, i) => {
                if (i === index) {
                    return {...desc, [event.target.name]: event.target.value}
                }
                return desc;
            });

            setForm({...form, descriptions: newDescriptions});
        }
    }

    const handleAddDescription = () => {
        const newDescriptions = [...form.descriptions, {
            id: null,
            wordId: wordDetail.id,
            wordType: "",
            description: "",
            sec: form.descriptions.length,
            isHidden: false
        }];
        console.log("check: ", newDescriptions);
        setForm({...form, descriptions: newDescriptions});
    }

    const handleDeleteDescription = (index) => {
        const newDescriptions = form.descriptions.map((desc, i) => {
            if (i === index) {
                return {...desc, isHidden: true}
            }
            return desc;
        });
        setForm({...form, descriptions: newDescriptions});
    }

    const handleEditorChange = (dataChange: EditorValue) => {
        const newDescriptions = form.descriptions.map((desc, i) => {
            if (i === dataChange.index) {
                return {...desc, description: dataChange.data}
            }
            return desc;
        });

        console.log("onchange: ", {newDescriptions, dataChange})

        setForm({...form, descriptions: newDescriptions});
    }

    const fetchWordDetail = async () => {
        setLoading(true);
        const response = await axiosInstance.get(`/view/words/${wordId}`);

        if (response.data.status == 200) {
            setWordDetail(response.data.data);
            setForm(response.data.data);
        } else {
            console.log('Error fetching all topics');
        }
        setLoading(false);
    }

    const handleBack = () => {
        router.back();
    }

    const handleSubmit = async () => {
        try{
            if (wordId === null || wordId === undefined || wordId === "") {
                //CASE INSERT
                const payload = {...form, topicId: selectedTopicId};
                const response = await axiosInstance.post(`/manage/words`, payload);
                console.log("response: ", response)
                if (response?.data?.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Thêm từ vựng thành công!',
                    });
                    const newWordId = response.data.data.id;
                    setWordId(newWordId);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
                    })
                }
            } else {
                //CASE UPDATE
                const payload = {...form, topicId: wordDetail.topicId};
                const response = await axiosInstance.put(`/manage/words/${wordId}`, payload);
                if (response?.data?.status == 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Cập nhật từ vựng thành công!',
                    });
                    fetchWordDetail();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Lỗi',
                        text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
                    })
                }
            }
        }catch (e) {
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
            })
        }
    }


    useEffect(() => {
        if (wordId) {
            fetchWordDetail();
        }
    }, []);

    useEffect(() => {
       if(wordId) {
           fetchWordDetail();
       }
    }, [wordId]);

    return (
        <Suspense fallback={<p>Loading feed...</p>}>
            <Grid container spacing={6} md={12}>
                <Grid item xs={12}>
                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                        <Button variant="outlined" color="secondary" style={{marginLeft: "16px"}} onClick={handleBack}>Trở về</Button>
                        <Button variant={"contained"} color={"primary"} style={{marginLeft: "16px"}} onClick={handleSubmit}>Lưu</Button>
                    </Box>

                    <form>
                        <Card sx={{my: 2}} style={{paddingTop: "16px"}}>
                            <CardContent>
                                <Box display="flex" alignItems="center" justifyContent="space-between">
                                    <Box>
                                        <Typography variant="h3">Chỉnh sửa từ vựng</Typography>
                                        <Typography variant="body1" className="topic_name_info_box">
                                            {`Chủ điểm: ${wordDetail.topicName ? wordDetail.topicName : selectedTopicName}`}
                                        </Typography>
                                        <TextField
                                            fullWidth
                                            label='Từ vựng'
                                            placeholder='John Doe'
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position='start'>
                                                        <i className='ri-booklet-line'/>
                                                    </InputAdornment>
                                                )
                                            }}
                                            value={form.keyWork}
                                            name="keyWork"
                                            onChange={handleFormChange}
                                            sx={{
                                                width: "100%",
                                                marginTop: "32px"
                                            }}
                                        />
                                    </Box>


                                </Box>
                            </CardContent>
                        </Card>

                        {
                            form.descriptions.map((desc, index) => {
                                if (!desc.isHidden) {
                                    return (
                                        <section>
                                            <Card sx={{marginTop: "16px"}}>
                                                <CardContent>
                                                    <Box display="flex" alignItems="center" justifyContent="flex-end">
                                                        <IconButton aria-label="edit"
                                                                    onClick={() => handleDeleteDescription(index)}>
                                                            <i className="ri-delete-bin-line"
                                                               style={{color: 'red'}}></i>
                                                        </IconButton>
                                                    </Box>
                                                    <Box display="flex" alignItems="center"
                                                         justifyContent="space-between">
                                                        <Box>
                                                            <TextField
                                                                fullWidth
                                                                label='Loại Từ'
                                                                placeholder='Danh từ, Động từ, Tính từ...'
                                                                InputProps={{
                                                                    startAdornment: (
                                                                        <InputAdornment position='start'>
                                                                            <i className='ri-booklet-line'/>
                                                                        </InputAdornment>
                                                                    )
                                                                }}
                                                                value={form.descriptions[index].wordType}
                                                                name="wordType"
                                                                onChange={(e) => handleDecriptionChange(index, e)}
                                                                sx={{
                                                                    width: "100%",
                                                                    marginTop: "32px"
                                                                }}
                                                            />
                                                        </Box>
                                                    </Box>
                                                    <Box style={{minHeight: "400px", marginTop: "8px"}}>
                                                        <EditorCus value={{index: index, data: desc.description}}
                                                                onChange={handleEditorChange}></EditorCus>
                                                    </Box>
                                                </CardContent>
                                            </Card>
                                        </section>
                                    )
                                }
                            })
                        }
                        <InnerButton title={"Thêm"} onClick={handleAddDescription}></InnerButton>
                    </form>
                </Grid>
            </Grid>
        </Suspense>

    )

}


export default AdminWordDetail;
