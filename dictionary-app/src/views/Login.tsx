'use client'

import type {FormEvent} from 'react'
// React Imports
import {useState} from 'react'

// Next Imports
import Link from 'next/link'
import {useRouter} from 'next/navigation'
import Swal from 'sweetalert2'
// MUI Imports
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import Checkbox from '@mui/material/Checkbox'
import Button from '@mui/material/Button'
import FormControlLabel from '@mui/material/FormControlLabel'
import Divider from '@mui/material/Divider'

// Type Imports
import type {Mode} from '@core/types'

// Component Imports
import Logo from '@components/layout/shared/Logo'
import Illustrations from '@components/Illustrations'

// Config Imports

// Hook Imports
import {useImageVariant} from '@core/hooks/useImageVariant'
import form from "@components/Form";
import axiosInstance from "../../axios";
import Loader from "@components/loader/Loader";
import Cookies from "js-cookie";
import {AuthProvider, useAuth} from "@core/contexts/AuthContext";

const Login = ({mode}: { mode: Mode }) => {
    // States
    const [isPasswordShown, setIsPasswordShown] = useState(false)

    // Vars
    const darkImg = '/images/pages/auth-v1-mask-dark.png'
    const lightImg = '/images/pages/auth-v1-mask-light.png'

    // Hooks
    const router = useRouter()
    const authBackground = useImageVariant(mode, lightImg, darkImg)
    const [form, setForm] = useState({
        username: '',
        password: ''
    })
    const [loading, setLoading] = useState(false);

    const handleClickShowPassword = () => setIsPasswordShown(show => !show)

    const handleOnChange = (e) => {
        setForm({...form, [e.target.name]: e.target.value});
        console.log(form);
    }

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        try {
            setLoading(true);
            const response = await axiosInstance.post("/auth/login", form);
            console.log(response?.data?.status);
            if (response?.data?.status === 200) {
                Cookies.set('LOGONUSER', JSON.stringify(response.data.data), { expires: 7, path: '/' });
                router.push("/");
            } else {
                console.log("logined failed");
                Swal.fire({
                    title: "The Internet?",
                    text: "That thing is still around?",
                    icon: "error"
                });
            }

        } catch (e) {
            Swal.fire({
                title: "Tài khoản không hợp lệ ",
                text: "Vui lòng kiểm tra lại tài khoản hoặc mật khẩu của bạn!",
                icon: "error"
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className='flex flex-col justify-center items-center min-bs-[100dvh] relative p-6'>
            {loading ? <Loader/> : null}
            <Card className='flex flex-col sm:is-[450px]'>
                <CardContent className='p-6 sm:!p-12'>
                    <Link href='/' className='flex justify-center items-center mbe-6'>
                        <Logo/>
                    </Link>
                    <div className='flex flex-col gap-5'>
                        <div>
                            <Typography variant='h4'>{`Welcome! 👋🏻`}</Typography>
                            <Typography className='mbs-1'>Please sign-in to your account and start the
                                adventure</Typography>
                        </div>
                        <form noValidate autoComplete='off' onSubmit={handleSubmit} className='flex flex-col gap-5'>
                            <TextField autoFocus fullWidth label='Username' name="username" onChange={handleOnChange}/>
                            <TextField
                                fullWidth
                                label='Password'
                                name="password"
                                onChange={handleOnChange}
                                id='outlined-adornment-password'
                                type={isPasswordShown ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <IconButton
                                                size='small'
                                                edge='end'
                                                onClick={handleClickShowPassword}
                                                onMouseDown={e => e.preventDefault()}
                                            >
                                                <i className={isPasswordShown ? 'ri-eye-off-line' : 'ri-eye-line'}/>
                                            </IconButton>
                                        </InputAdornment>
                                    )
                                }}
                            />
                            <div className='flex justify-between items-center gap-x-3 gap-y-1 flex-wrap'>
                                <FormControlLabel control={<Checkbox/>} label='Remember me'/>
                                <Typography className='text-end' color='primary' component={Link}
                                            href='/forgot-password'>
                                    Forgot password?
                                </Typography>
                            </div>
                            <Button fullWidth variant='contained' type='submit'>
                                Log In
                            </Button>
                            <div className='flex justify-center items-center flex-wrap gap-2'>
                                <Typography>New on our platform?</Typography>
                                <Typography component={Link} href='/register' color='primary'>
                                    Create an account
                                </Typography>
                            </div>
                            <Divider className='gap-3'>or</Divider>
                            <div className='flex justify-center items-center gap-2'>
                                <IconButton size='small' className='text-facebook'>
                                    <i className='ri-facebook-fill'/>
                                </IconButton>
                                <IconButton size='small' className='text-twitter'>
                                    <i className='ri-twitter-fill'/>
                                </IconButton>
                                <IconButton size='small' className='text-github'>
                                    <i className='ri-github-fill'/>
                                </IconButton>
                                <IconButton size='small' className='text-googlePlus'>
                                    <i className='ri-google-fill'/>
                                </IconButton>
                            </div>
                        </form>
                    </div>
                </CardContent>
            </Card>
            <Illustrations maskImg={{src: authBackground}}/>
        </div>
    )
}

export default Login
