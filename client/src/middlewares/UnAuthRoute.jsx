import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router'

function UnAuthRoute() {

    const { user } = useSelector(state => state.auth)

    return (
        user ? <Navigate to="/profile" replace /> :  <Outlet /> 
    )
}

export default UnAuthRoute
