'use client'
import React, {createContext, useContext, useEffect, useState} from 'react';
import {useRouter} from 'next/navigation';
import Cookies from 'js-cookie';
import axiosInstance from "../../../axios";
import Swal from "sweetalert2";
import Loader from "@components/loader/Loader"; // Make sure to install js-cookie package
import {usePathname} from 'next/navigation'
import {ChildrenType} from "@core/types";

const AuthContext = createContext<any>(null);

export const AuthProvider = ({children}:any) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const pathname = usePathname();

    const validateUser = async () => {
        setLoading(true);
        try {
            if (user == null) {
                const response = await axiosInstance.get('/my-info');
                if (response?.data?.status === 200) {
                    setLoading(false)
                    setUser(response.data.data);
                } else {
                    setLoading(false);
                    if (pathname.startsWith("/authenticated")) {
                        router.push("/login");
                    }
                }
            }
        } catch (e) {
            setLoading(false);
            if (pathname.startsWith("/authenticated")) {
                router.push("/login");
            }
        }
    }
    useEffect(() => {
        validateUser();
    }, []);




    const logout = () => {
        Cookies.remove('token'); // Remove token from cookies
        setUser(null); // Clear user state
        router.push('/login'); // Redirect to login page
    };

    return (
        <AuthContext.Provider value={{user, logout}}>
            {loading ? <Loader/> : children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};