import React from 'react'
import Header from '../../components/layout/Header'

export default function PageNotFound() {
    return (
        <>
            <Header></Header>
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="fs-1">Page Not Found. Error 404</div>
            </div>
        </>
    )
}
