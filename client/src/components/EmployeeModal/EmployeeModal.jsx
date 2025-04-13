import React from 'react';
import formatDate from '../../utils/date';

function EmployeeModal({ employee, close }) {

    console.log(employee)
    return (
        <div className="modal fade show d-block" id={`modal-${employee._id}`} tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="false">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h1 className="modal-title fs-5" id="exampleModalLabel">Employee Information</h1>
                        <button type="button" className="btn-close" aria-label="Close" onClick={close}></button>
                    </div>
                    <div className="modal-body">
                        <div className='mb-2'>
                            <i className="fa-solid fa-user me-2"></i>
                            name: {employee.name}
                        </div>
                        <div className='mb-2'>
                            <i className="fa-regular fa-envelope me-2"></i>
                            email: {employee.email}
                        </div>
                        <div className='mb-2'>
                            <i className="fa-solid fa-user-tie me-2"></i>
                            title: {employee.title}
                        </div>
                        <div className='mb-2'>
                            <i className="fa-solid fa-city me-2"></i>
                            city: {employee.city}
                        </div>
                        <div className='mb-2'>
                            <i className="fa-solid fa-id-card me-2"></i>
                            national_ID: {employee.national_ID}
                        </div>
                        <div className='mb-2' > experience_level: <span className="rounded-pill py-1 px-3 text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {employee.experience_level}</span>  </div>
                        <div className='mb-2'> bio: {employee.bio} </div>
                        <div className='mb-2'> join on: {formatDate(employee.createdAt)} </div>
                        <div className='d-flex flex-wrap gap-2 mb-3'>
                            {employee.programming_langs.map((lang, index) => {
                                return (
                                    <div key={index} className='rounded-pill py-1 px-3 text-white' style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {lang} </div>
                                )
                            })}
                        </div>
                    </div>
                    <div className="modal-footer">
                        <button type="button" className="btn btn-secondary" onClick={close}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default EmployeeModal;
