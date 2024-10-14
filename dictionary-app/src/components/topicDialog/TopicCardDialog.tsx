'use client'
import React, {ChangeEvent, useEffect, useState} from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import {Dialog} from "@mui/material";
import {UpsertTopic} from "@/app/authenticated/adminTopic/page";
import {Actions} from "@core/utils/Actions";
import axiosInstance from "../../../axios";
import Swal from "sweetalert2";
import uploadFileToServer from "@core/utils/uploadFile";

export type TopicCardDialogProps = {
    open: boolean
    onClose: () => void
    action: Actions
    topicId: number | null
    fetchMasterData: () => void
}
const TopicCardDialog = (props: TopicCardDialogProps) => {
    // States
    const [fileInput, setFileInput] = useState<string>(null)
    const [imgSrc, setImgSrc] = useState<string>('/images/gallery.png')
    const [form, setForm] = useState<UpsertTopic>({
        id: null,
        topicName: '',
        thumbnail: ''
    });
    const [loading, setLoading] = useState(false);

    const reset = () => {
        setForm({
            id: null,
            topicName: '',
            thumbnail: ''
        })
        setImgSrc('/images/gallery.png')
        setFileInput(null);
    }

    const handleFileInputChange = (file: ChangeEvent) => {
        console.log(file);
        const reader = new FileReader()
        const {files} = file.target as HTMLInputElement

        if (files && files.length !== 0) {
            setFileInput(files[0])
            setImgSrc(URL.createObjectURL(files[0]))
        }
    }

    const handleChangeTopicName = (e) => {
        console.log("check onchange:", e);
        const {name, value} = e.target;
        setForm({...form, [name]: value});
    }

    useEffect(() => {
        if (props.topicId) {
            // Fetch topics by id
            fetchTopic();
        } else {
            setForm({
                id: null,
                topicName: '',
                thumbnail: ''
            });
            setImgSrc('/images/gallery.png');
            setFileInput(null);
        }
    }, []);

    useEffect(() => {
        if (props.open) {
            if (props.topicId) {
                // Fetch topics by id
                console.log("time to fetch topic")
                fetchTopic();
            } else {
                setForm({
                    id: null,
                    topicName: '',
                    thumbnail: ''
                });
                setImgSrc('/images/gallery.png');
                setFileInput('');
            }
        }
    }, [props.open]);


    const fetchTopic = async () => {
        // Fetch topics by id
        setLoading(true);
        const response = await axiosInstance.get(`/view/topics/${props.topicId}`);

        if (response.data.status == 200) {
            const data = response.data.data;
            console.log("check data: ", data)
            setForm({
                id: data.id,
                topicName: data.topicName,
                thumbnail: data.thumbnail
            });
            if (data.thumbnail) {
                setImgSrc(data.thumbnail);
            }

        } else {
            console.log('Error fetching all topics');
        }
        setLoading(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (form.topicName === '' || form.topicName == null) {
            props.onClose();
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Tên chủ điểm không được để trống',
            })
            return;
        }

        if (props.action === Actions.UPDATE) {
            console.log("Edit topics", {form, fileInput});
            let url = null;
            try {
                if (fileInput != null) {
                    url = await uploadFileToServer(fileInput);
                }
                const res = await axiosInstance.put(`/topics/${form.id}`, {
                    topicName: form.topicName,
                    thumbnail: url != null ? url : form.thumbnail
                });

                if (res?.data?.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Cập nhật chủ đề thành công',
                    })
                    reset();
                    props.fetchMasterData();
                    props.onClose();
                }
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Có lỗi xảy ra, vui lòng thử lại sau',
                })
            }
        } else if (props.action === Actions.INSERT) {
            console.log("Create topics", form);
            try {
                let url = null;
                if (imgSrc != null && imgSrc !== '/images/gallery.png') {
                    console.log({imgSrc, fileInput})
                    url = await uploadFileToServer(fileInput);
                }
                const res = await axiosInstance.post("/topics", {topicName: form.topicName, thumbnail: url});
                if (res?.data?.status === 200) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Thành công',
                        text: 'Tạo chủ đề thành công',
                    })
                    reset();
                    props.fetchMasterData();
                    props.onClose();
                }
            } catch (e) {
                Swal.fire({
                    icon: 'error',
                    title: 'Lỗi',
                    text: 'Có lỗi xảy ra, vui lòng thử lại sau',
                })
            }
        }
    }

    const closeDialog = () => {
        reset();
        props.onClose();
    };

    return (
        <Dialog open={props.open} onClose={closeDialog}>
            <Card>
                <CardHeader title='Tạo Chủ điểm mới'/>
                <CardContent>
                    <form>
                        <Grid container spacing={5}>
                            <Grid item xs={12}>
                                <TextField
                                    fullWidth
                                    type='text'
                                    label='Tên chủ điểm'
                                    name={"topicName"}
                                    onChange={handleChangeTopicName}
                                    value={form.topicName}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <Button component='label' size='small' variant='contained'
                                        htmlFor='account-settings-upload-image'>
                                    Tải hình ảnh
                                    <input
                                        hidden
                                        type='file'
                                        accept='image/png, image/jpeg'
                                        onChange={handleFileInputChange}
                                        id='account-settings-upload-image'
                                    />
                                </Button>
                            </Grid>
                            <Grid item xs={12}>

                                <div className='flex items-center justify-center flex-wrap gap-5'>
                                    {imgSrc && (<img height={"300"} width={"400"} className='rounded' src={imgSrc}
                                                     alt='Profile'/>)}
                                </div>
                            </Grid>

                            <Grid item xs={12} sx={{marginTop: "16px"}}>
                                <div className='flex items-end justify-end flex-wrap gap-5 '>
                                    <Button variant='contained' type='submit' onClick={handleSubmit}>
                                        Lưu chủ điểm
                                    </Button>
                                </div>
                            </Grid>
                        </Grid>
                    </form>
                </CardContent>
            </Card>
        </Dialog>
    )
}

export default TopicCardDialog
