import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router'

function ProtectRoute() {

    const { user } = useSelector(state => state.auth)

    return (
        user ? <Outlet /> : <Navigate to="/login" replace />
    )
}

export default ProtectRoute
