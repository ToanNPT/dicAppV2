// MUI Imports
'use client'
import Grid from '@mui/material/Grid'

// Components Imports
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import axiosInstance from "../../../../axios";
import React, {useEffect, useState} from "react";
import {Pagination} from "@mui/material";
import {useRouter} from "next/navigation";
import AdminTopicTable from "@components/topicTable/AdminTopicTable";
import TopicCardDialog from "@components/topicDialog/TopicCardDialog";
import {Actions} from "@core/utils/Actions";
import Button from "@mui/material/Button";
import Swal from "sweetalert2";

export type UpsertTopic = {
    id: number,
    topicName: string,
    thumbnail: string
}

const AdminTopic = () => {
    const router = useRouter();
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(10);
    const [loading, setLoading] = useState(true);
    const [topics, setTopics] = useState([]);
    const [open, setOpen] = useState(false);
    const [action, setAction] = useState(Actions.INSERT);
    const [selectedTopicId, setSelectedTopicId] = useState(null);

    const columnsNames = [
        'Avt',
        'Chủ điểm',
        'Từ Vựng',
        'Lượt xem',
        "Cập nhật"
    ];

    const handlePageChange = (event, value) => {
        setPage(value);  // Update the current page
    };

    useEffect(() => {
        fetchTopics(page, 10);
    }, [page])


    const fetchTopics = async (curPage, size) => {
        setLoading(true);
        let pPage = curPage != null ? curPage : page;
        let pSize = size != null ? size : 10;
        const response = await axiosInstance.get('/view/topics', {params: {page: pPage, size: pSize}});

        if (response.data.status == 200) {
            setTopics(response.data.data);
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

    useEffect(() => {
        fetchTopics(page, 10);
    }, [])

    const handleCloseDialog = () => {
        setOpen(false);
    }

    const handleEditTopic = (id) => {
        setSelectedTopicId(id);
        setAction(Actions.UPDATE);
        setOpen(true);
    }

    const handleAddTopic = () => {
        setSelectedTopicId(null);
        setAction(Actions.INSERT);
        setOpen(true);
    }

    const showConfirmAndDelete = async (id) => {

        Swal.fire({
            title: 'Xác nhận xóa',
            text: 'Bạn có chắc chắn muốn xóa chủ điểm này?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Xác nhận',
            cancelButtonText: 'Hủy'
        }).then((result) => {
            if (result.isConfirmed) {
               handleDeleteTopic(id);
            }

        })
    }
    const handleDeleteTopic = async (id) => {
        setLoading(true);
        try {
            const response = await axiosInstance.delete(`/topics/${id}`);
            setLoading(false)
            if (response.data.status == 200) {
                Swal.fire({
                    icon: 'success',
                    title: 'Thành công',
                    text: 'Xóa chủ điểm thành công!',
                })
                fetchTopics(page, 10);
            } else {
                console.log("Error deleting topic");
            }
        } catch (e) {
            setLoading(false);
            Swal.fire({
                icon: 'error',
                title: 'Lỗi',
                text: 'Có lỗi xảy ra, vui lòng thử lại sau!',
            })
        }
    }

    const handleViewWordsInTopic = (topicId: number) => {
        router.push(`/authenticated/adminWords?topicId=${topicId}`);
    }


    return (

        <Grid container spacing={6}>

            <Grid item xs={12}>
                <Typography variant='h3'>Quản Lý Chủ Điểm</Typography>
                <Divider/>
            </Grid>
            <Grid item xs={12}>
                <div className='flex items-end justify-end flex-wrap gap-5 ' style={{marginBottom: "0px"}}>
                    <Button variant='contained' onClick={handleAddTopic}>
                        Thêm mới
                    </Button>
                </div>

            </Grid>

            <Grid item xs={12} md={12} container spacing={2}
                  style={{marginTop: "0px", paddingLeft: "32px", paddingTop: "0px"}}>
                <AdminTopicTable
                    columnNames={columnsNames}
                    dataset={topics}
                    handleEditTopic={handleEditTopic}
                    handleDeleteTopic={showConfirmAndDelete}
                    handleViewWordsInTopic={handleViewWordsInTopic}
                />
            </Grid>

            <Grid item container justifyContent="center">
                <Pagination
                    count={totalPage}  // Total number of pages
                    page={page}    // Current page
                    onChange={handlePageChange}  // Handle page change
                    color="primary"
                />
            </Grid>

            <TopicCardDialog
                open={open}
                onClose={handleCloseDialog}
                action={action}
                topicId={selectedTopicId}
                fetchMasterData={fetchTopics}
            >

            </TopicCardDialog>

        </Grid>
    )

}


export default AdminTopic;
