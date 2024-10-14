import Card from "@mui/material/Card";
import tableStyles from "@core/styles/table.module.css";
import CustomAvatar from "@core/components/mui/Avatar";
import Typography from "@mui/material/Typography";
import {TableCell, TableRow} from "@mui/material";
import React from "react";
import IconButton from "@mui/material/IconButton";

export type AdminTopicTableProps = {
    columnNames: string[],
    dataset: any[],
    handleEditTopic: (topicId: number) => void,
    handleDeleteTopic: (topicId: number) => void,
    handleViewWordsInTopic: (topicId: number) => void
}
/**
 * Support only normal data-set
 * @param props
 * @constructor
 */
const TopicAdminTable = (props: AdminTopicTableProps) => {


    return (
        <Card sx={{width: '100%', marginTop: "32px"}}>
            <div className='overflow-x-auto'>
                <table className={tableStyles.table}>
                    <thead>
                    <tr>
                        {
                            props.columnNames.map((columnName, index) => {
                                return <th key={index}>{columnName}</th>
                            })
                        }
                        <th width={50}></th>
                        <th width={50}></th>
                    </tr>
                    </thead>
                    <tbody>
                    {props.dataset == null || props.dataset.length === 0
                        ? (
                            <TableRow>
                                <TableCell colSpan={props.columnNames.length} align="center">
                                    <img src="/images/common/no_content.jpg" alt="No data"
                                         style={{width: 250, height: 250, marginTop: 24, marginBottom: 4}}/>
                                    <Typography style={{marginBottom: 16, fontWeight: 500, fontSize: "1.4rem"}}>Không
                                        tìm thấy kết quả</Typography>
                                </TableCell>
                            </TableRow>
                        )
                        :
                        (
                            props.dataset.map((row, index) => (
                                <tr key={index} onDoubleClick={() => props.handleViewWordsInTopic(row.id)}>
                                    <td className='!plb-1'>
                                        <div className='flex items-center gap-3'>
                                            <CustomAvatar src={row.thumbnail} size={34} onClick={() => {
                                                alert("clicked")
                                            }}/>
                                        </div>
                                    </td>

                                    <td className='!plb-1'>
                                        <Typography>{row.topicName}</Typography>
                                    </td>
                                    <td className='!plb-1'>
                                        <div className='flex gap-2'>
                                            <Typography color='text.primary'>{row.viewCount}</Typography>
                                        </div>
                                    </td>
                                    <td className='!plb-1'>
                                        <div className='flex gap-2'>
                                            <Typography color='text.primary'>{row.viewCount}</Typography>
                                        </div>
                                    </td>

                                    <td className='!plb-1'>
                                        <div className='flex gap-2'>
                                            <Typography
                                                color='text.primary'>
                                                {new Date(row.updateTime).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: '2-digit',
                                                    year: 'numeric',
                                                })}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td>
                                        <IconButton aria-label="edit" onClick={() => props.handleEditTopic(row.id)}>
                                            <i className="ri-edit-line" style={{color: 'green'}}></i>
                                        </IconButton>
                                    </td>

                                    <td>
                                        <IconButton aria-label="edit" onClick={() => props.handleDeleteTopic(row.id)}>
                                            <i className="ri-delete-bin-line" style={{color: 'red'}}></i>
                                        </IconButton>
                                    </td>

                                </tr>
                            ))
                        )
                    }
                    </tbody>
                </table>

            </div>
        </Card>
    )
}

export default TopicAdminTable;