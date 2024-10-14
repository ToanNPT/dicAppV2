import Card from "@mui/material/Card";
import tableStyles from "@core/styles/table.module.css";
import Typography from "@mui/material/Typography";
import {TableCell, TableRow} from "@mui/material";
import React, {useRef} from "react";
import IconButton from "@mui/material/IconButton";

export type TableProps = {
    columnNames: string[],
    dataset: any[],
    handleViewWordDetail: (wordId: number) => void
    handleDeleteWord: (wordId: number) => void
}
/**
 * Support only normal data-set
 * @param props
 * @constructor
 */
const AdminWordTable = (props: TableProps) => {
    const audioRef = useRef(null); // Create a ref to control the audio element
    const handlePlayAudio = (e) => {
        e.preventDefault();
        if (audioRef.current) {
            audioRef.current.play(); // Play the audio when the button is clicked
        }
    };

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
                                    <img src="/images/common/no_content.jpg" alt="No data"  style={{ width: 250, height: 250, marginTop: 24, marginBottom: 4}}/>
                                    <Typography style={{marginBottom: 16, fontWeight: 500, fontSize: "1.4rem"}}>Không tìm thấy kết quả</Typography>
                                </TableCell>
                            </TableRow>
                        )
                        :
                        (
                            props.dataset.map((row, index) => (
                                <tr key={index} onDoubleClick={() => props.handleViewWordDetail(row.id)}>
                                    <td className='!plb-1'>
                                        <Typography>{row.keyWork}</Typography>
                                    </td>
                                    <td className='!plb-1'>
                                        <div className='flex gap-2'>
                                            <Typography color='text.primary'>{row.wordType}</Typography>
                                        </div>
                                    </td>
                                    <td className='!plb-1'>
                                        <div className='flex gap-2'>
                                            <Typography color='text.primary'>{row.topicName}</Typography>
                                        </div>
                                    </td>
                                    <td className='!plb-1'>
                                        <div className='flex gap-2'>
                                            <IconButton aria-label="play voice" onClick={handlePlayAudio}>
                                                <i className="ri-volume-up-line" style={{fontSize: '2rem'}}></i>
                                                <audio ref={audioRef} style={{display: 'none'}}
                                                       src={row.voiceUrl}/>
                                            </IconButton>
                                        </div>
                                    </td>
                                    <td>
                                        <IconButton aria-label="edit" onClick={() => props.handleViewWordDetail(row.id)}>
                                            <i className="ri-edit-line" style={{color: 'green'}}></i>
                                        </IconButton>
                                    </td>

                                    <td>
                                        <IconButton aria-label="edit" onClick={() => props.handleDeleteWord(row.id)} >
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

export default AdminWordTable;