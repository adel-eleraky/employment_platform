import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Outlet, useNavigate } from 'react-router'

function UnAuthRoute() {

    const { user } = useSelector(state => state.auth)

    return (
        user ?
            <>
                {user.role == "Employee" && <Navigate to="profile/Employee" />}
                {user.role == "Employer" && <Navigate to="profile/Employer" />}
            </>
            :
            <Outlet />
    )
}

export default UnAuthRoute
