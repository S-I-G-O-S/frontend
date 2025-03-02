import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '@context/authContext'
import { useEffect, useState } from "react"
import { getCookie } from "@services/cookies";

export const ProtectedRoute = () => {
    const { token } = useAuth()
    
    if (!token || !getCookie('token')) {
        return <Navigate to="/"/>;
    }
    // useEffect(() => {
    // },[token])

    return <Outlet />;
};