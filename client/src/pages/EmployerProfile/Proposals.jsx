import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router'
import { getBestMatch, getJobProposals } from '../../rtk/features/ProposalSlice'
import ProposalCard from '../../components/proposal_card/ProposalCard'

function Proposals() {

    const { jobId } = useParams()
    const dispatch = useDispatch()
    const { proposals, acceptedProposal, rejectedProposal, filteredProposals } = useSelector(state => state.proposals)
    const [showFiltered, setShowFiltered] = useState(false)


    useEffect(() => {
        dispatch(getJobProposals(jobId))
    }, [jobId, acceptedProposal, rejectedProposal])


    const proposalsToRender = showFiltered ? filteredProposals : proposals;

    const ProposalCards = proposalsToRender && proposalsToRender.map(proposal => {
        const { employee, status, similarity } = proposal;
        return (
            <div key={proposal._id} className="col-12 col-md-6 col-lg-4">
                <ProposalCard employee={employee} status={status} similarity={similarity} />
            </div>
        )
    })

    return (
        <div className='proposal_page'>
            <div className="container">
                <button
                    className='btn btn-info mb-3 text-white'
                    onClick={() => {
                        dispatch(getBestMatch(jobId))
                        setShowFiltered(true)
                    }}
                    style={{ backgroundColor: "rgba(5, 72, 25, 0.52)" }}
                >
                    Filter by Bio
                </button>
                <div className="row">
                    {ProposalCards.length != 0 ? ProposalCards : <div className='fw-bold fs-2 text-center'> No Proposals Yet</div>}
                </div>
            </div>
        </div>
    )
}

export default Proposals
