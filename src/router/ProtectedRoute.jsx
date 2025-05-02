import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from '@context/authContext'
import { getCookie } from "@services/cookies";
import { useEffect } from "react";

export const ProtectedRoute = () => {
    const { token } = useAuth()
    const tokenCookie = getCookie('token')
    // console.log("Debug token: " + token + " | " + tokenCookie)
    if (!token || !tokenCookie) {
        return <Navigate to="/"/>
    }
    return <Outlet />
}