import { useState, useEffect } from 'react'

import { toyService } from "../services/toy.service.js"
import { useNavigate, useParams } from 'react-router-dom'

export function ToyDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [currToy, setCurrToy] = useState(null)

    useEffect(() => {
        toyService.getById(params.toyId)
            .then(toy => {
                if (!toy) return navigate('/toy')
                setCurrToy(toy)
            })
            .catch(err => {
                console.log('Had issues loading toy', err);
            })
    }, [])

    if (!currToy) return <h4>loading</h4>
    const { _id, txt, isDone } = currToy
    return (
        <section className="toy-details">
            <div className="toy-data-container">
                <h1>Id: {_id}</h1>
                <h1>To Do: {txt}</h1>
                <h1>Is done?: {isDone ? 'yes' : 'no'}</h1>
                <button className="back-btn" onClick={() => navigate('/toy')}>
                    Back to toys
                </button>
            </div>
        </section>
    )
}