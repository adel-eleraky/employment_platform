import React from 'react'
import "./Header.css"

function Header() {
    return (
        <>
            <div className="header_section d-flex justify-content-center align-items-center">
                <div className="content">
                    <h1> Find your dream Job </h1>
                    <p> Browse thousands of job opportunities and find the perfect role to match your skills </p>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
            </div>
        </>
    )
}

export default Header
