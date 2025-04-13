import React, { useEffect, useState } from 'react';
import "./ProposalCard.css";
import EmployeeModal from '../EmployeeModal/EmployeeModal'; // Make sure EmployeeModal is imported
import { Link, useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { viewEmployee } from '../../rtk/features/viewSlice';
import { acceptProposal, getJobProposals, rejectProposal } from '../../rtk/features/ProposalSlice';

function ProposalCard({ employee, status, similarity }) {

    const { jobId } = useParams()
    const { _id, name, email, national_ID, experience_level, programming_langs, title, city, bio } = employee;

    const [showModal, setShowModal] = useState(false);
    const [selectedEmployee, setSelectedEmployee] = useState(null);
    const dispatch = useDispatch()
    const { acceptedProposal } = useSelector(state => state.proposals)

    console.log(similarity)
    const handleModalShow = (employee) => {
        setSelectedEmployee(employee);
        setShowModal(true);
        dispatch(viewEmployee(employee._id))
    };

    const handleModalClose = () => {
        setShowModal(false);
        setSelectedEmployee(null);
    };


    const acceptApplication = async () => {
        dispatch(acceptProposal({ jobId, empId: _id }))
    }

    const rejectApplication = async () => {
        dispatch(rejectProposal({ jobId, empId: _id }))
    }


    return (
        <div className='mb-4 py-3 px-4 border bg-white rounded'>
            <div className='d-flex gap-2 align-items-center mb-3'>
                <div className="name fw-bold fs-4">
                    <span>{name}</span>
                </div>
                <Link type="button" className="" onClick={() => handleModalShow(employee)}>
                    View Profile
                </Link>
                {similarity && <div className='ms-auto'> Score: <span > {Math.floor(similarity * 100) }% </span></div>}
            </div>

            {showModal && selectedEmployee &&
                <EmployeeModal employee={selectedEmployee} close={handleModalClose} />
            }

            <div className="title fw-bold fs-4 mb-3" style={{ opacity: ".5" }}> {title} </div>
            <div className="details mb-3">
                <div className='d-flex justify-content-between align-items-center mb-3'>
                    <div className="job_location py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {city} </div>
                    <div className="experience py-2 px-3 rounded-pill text-white" style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {experience_level} </div>
                </div>
                <div className="description mb-3 text-break text-wrap overflow-hidden">
                    {bio}
                </div>
                <div className="skills d-flex flex-wrap gap-2 mb-3">
                    {programming_langs.map((language, index) => (
                        <div key={index} className='rounded-pill py-1 px-3 text-white' style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}> {language} </div>
                    ))}
                </div>
                <div className="actions d-flex gap-2">
                    {status == "accepted" && (
                        <button className='btn btn-success d-block w-100'> Accepted </button>
                    )}
                    {status == "rejected" && (
                        <button className='btn btn-danger d-block w-100'> Rejected </button>
                    )}
                    {status == "pending" && (
                        <>
                            <button className='btn btn-success d-block w-50' onClick={acceptApplication}> Accept </button>
                            <button className='btn btn-danger d-block w-50' onClick={rejectApplication}> Reject </button>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
}

export default ProposalCard;
