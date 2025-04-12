import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router'
import { useDispatch } from 'react-redux'
import { getLoggedInUser } from '../../rtk/features/authSlice'
import Toast from '../Toast'

function Layout() {

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getLoggedInUser())
    }, [])

    
    return (
        <>
            <Navbar />
            <Outlet />
            <Toast />
        </>
    )
}

export default Layout
