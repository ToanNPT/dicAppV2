'use client'
import {ChangeEvent, useState} from 'react'

import Card from '@mui/material/Card'
import Grid from '@mui/material/Grid'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'

const FormLayoutsBasic = () => {
    // States
    const [fileInput, setFileInput] = useState<string>('')
    const [imgSrc, setImgSrc] = useState<string>('/images/gallery.png')

    const handleFileInputChange = (file: ChangeEvent) => {
        const reader = new FileReader()
        const {files} = file.target as HTMLInputElement

        if (files && files.length !== 0) {
            reader.onload = () => setImgSrc(reader.result as string)
            reader.readAsDataURL(files[0])

            if (reader.result !== null) {
                setFileInput(reader.result as string)
            }
        }
    }

    return (
        <Card>
            <CardHeader title='Tạo Chủ điểm mới'/>
            <CardContent>
                <form onSubmit={e => e.preventDefault()}>
                    <Grid container spacing={5}>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                type='text'
                                label='Tên chủ điểm'
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button component='label' size='small' variant='contained'
                                    htmlFor='account-settings-upload-image'>
                                Tải hình ảnh
                                <input
                                    hidden
                                    value={fileInput}
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
                                <Button variant='contained' type='submit'>
                                    Lưu chủ điểm
                                </Button>
                            </div>
                        </Grid>
                    </Grid>
                </form>
            </CardContent>
        </Card>
    )
}

export default FormLayoutsBasic
