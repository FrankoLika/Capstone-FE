import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import jwtDecode from "jwt-decode";
import Login from "../pages/Login";

const useAuth = () => {
    return localStorage.getItem("jwt")?.toString();
}

const useSession = () => {
    const session = useAuth()
    const decodedSession = session ? jwtDecode(session) : null
    const navigate = useNavigate()

    useEffect(() => {
        if (!session) {
            navigate('/', {replace : true})
        }
    }, [navigate, session])
    
    return decodedSession
}

export default function ProtectedRoutes() {
    const isAuthorized = useAuth()
    const session = useSession()
    return isAuthorized ? <Outlet /> : <Login />
}


