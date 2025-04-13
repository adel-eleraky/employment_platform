import React from 'react'
import "./Navbar.css"
import { Link } from 'react-router'
import { useDispatch, useSelector } from 'react-redux'
import axios from 'axios'
import { logout } from '../../rtk/features/authSlice'

function Navbar() {

    const { user } = useSelector(state => state.auth)
    const { notifications } = useSelector(state => state.notifications)
    const dispatch = useDispatch()

    const handleLogout = () => {
        dispatch(logout())
    }


    const unreadNotifications = notifications?.reduce((count, notify) => {
        return notify.isRead === false ? count + 1 : count;
    }, 0);

    return (
        <>
            <nav>
                <div className="first-nav">
                    <div className="container px-5">
                        <div className="row align-items-center justify-content-between">

                            <div className="col-4 col-md-2 navbar-toggler">
                                <div className="d-flex">
                                    <button
                                        className="btn btn-primary navbar-toggler d-none"
                                        type="button"
                                        data-bs-toggle="offcanvas"
                                        data-bs-target="#navOffcanvas"
                                        aria-controls="navOffcanvas"
                                    >
                                        <i className="fa-solid fa-bars fs-2 ms-3"></i>
                                    </button>
                                    {/* <a href="/">
                                        <img src="./assets/images/Logo.png" alt="" className="img-fluid logo" />
                                    </a> */}
                                </div>
                            </div>
                            <div className="col-md-8 nav-links-col">
                                <ul className="nav-links d-flex  m-0 p-0">
                                    <Link to="/" className="nav-link d-flex align-items-center" >
                                        <i className="fa-solid fa-briefcase" style={{ color: "rgba(5, 72, 25, 0.52)" }}></i>
                                        <li className="mx-3">Jobify</li>
                                    </Link>
                                    <Link to="/jobs" className="nav-link">
                                        <li className="mx-3">Explore Jobs</li>
                                    </Link>
                                    <a href="#campains" className="nav-link">
                                        <li className="mx-3">Contact Us</li>
                                    </a>

                                </ul>

                            </div>

                            <div className="col-4 col-md-2 d-flex justify-content-end">


                                {user && (
                                    <li className="nav-item notification dropdown me-2">
                                        <a
                                            className="nav-link dropdown-toggle position-relative notification-badge"
                                            href="#"
                                            role="button"
                                            data-bs-toggle="dropdown"
                                            aria-expanded="false"
                                        >
                                            <i className="fas fa-bell fa-lg fs-4 text-dark"></i>
                                            <span style={{ right: "-7px !important"}} className="position-absolute  top-0 start-25 translate-middle badge rounded-pill bg-danger">
                                                {unreadNotifications}
                                                <span className="visually-hidden">
                                                    unread notifications
                                                </span>
                                            </span>
                                        </a>
                                        <ul
                                            className="dropdown-menu dropdown-menu-end"
                                            style={{ width: "300px" }}
                                        >
                                            <li className="dropdown-item text-muted">
                                                You have {unreadNotifications} notifications
                                            </li>
                                            <li>
                                                <hr className="dropdown-divider" />
                                            </li>
                                            <div
                                                style={{
                                                    maxHeight: "500px",
                                                    overflowY: "auto",
                                                    paddingRight: "8px",
                                                }}
                                            >
                                                {notifications.length !== 0 &&
                                                    [...notifications]?.reverse().map((notify) => {
                                                        return (
                                                            <React.Fragment key={notify._id}>
                                                                <li
                                                                    className="dropdown-item"
                                                                    style={{ whiteSpace: "normal" }}
                                                                >

                                                                    {notify?.message}
                                                                </li>
                                                                <hr />
                                                            </React.Fragment>
                                                        );
                                                    })}
                                            </div>

                                        </ul>
                                    </li>
                                )}

                                <div className="dropdown d-flex justify-content-end">
                                    <a
                                        href=""
                                        data-bs-toggle="dropdown"
                                        aria-expanded="false"
                                        className="nav-link dropdown-toggle acc_link d-flex align-items-center justify-content-center"
                                    >
                                        <i className="fa-regular fa-user acc_logo fs-3" style={{ color: "#2b373d" }}></i>
                                    </a>
                                    <ul className="dropdown-menu text-center">
                                        {!user && (
                                            <>
                                                <li><Link className="dropdown-item" to="/login" > Login </Link></li>
                                                <hr />
                                                <li><Link className="dropdown-item" to="/register"> Register </Link></li>
                                            </>
                                        )}
                                        {user && (
                                            <>
                                                <li><Link className="dropdown-item" to={`profile/${user.role}`} > Profile </Link></li>
                                                <hr />
                                                <li><Link className="dropdown-item" onClick={handleLogout} > Logout </Link></li>
                                            </>
                                        )}
                                    </ul>
                                </div>

                            </div>


                        </div>
                    </div>
                </div>
            </nav>

            <div
                className="offcanvas offcanvas-end"
                data-bs-scroll="false"
                tabIndex="-1"
                id="navOffcanvas"
                aria-labelledby="offcanvasWithBothOptionsLabel"
            >
                <div className="offcanvas-header">
                    <button
                        type="button"
                        className="btn-close text-white ms-0"
                        data-bs-dismiss="offcanvas"
                        aria-label="Close"
                    ></button>
                    <img src="./assets/images/Logo.png" alt="" className="img-fluid logo" />
                </div>
                <div className="offcanvas-body text-end">
                    <div className="links py-3">
                        <a href="/">Home</a>
                        <a href="#campains">Jobs</a>
                        <a href="#campains">Contact Us</a>

                    </div>
                </div>
            </div>

        </>
    )
}

export default Navbar
