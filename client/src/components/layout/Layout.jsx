import React, { useEffect } from 'react'
import Navbar from '../navbar/Navbar'
import { Outlet } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import { getLoggedInUser } from '../../rtk/features/authSlice'
import Toast from '../Toast'
import { getUserNotifications } from '../../rtk/features/notificationSlice'

function Layout() {

    const dispatch = useDispatch()
    const { user } = useSelector(state => state.auth)

    useEffect(() => {
        dispatch(getLoggedInUser())
    }, [])

    useEffect(() => {
        dispatch(getUserNotifications())
    }, [ user])
    
    return (
        <>
            <Navbar />
            <Outlet />
            <Toast />
        </>
    )
}

export default Layout
