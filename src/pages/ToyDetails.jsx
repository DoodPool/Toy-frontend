import { useState, useEffect } from 'react'

import { toyService } from "../services/toy.service.js"
import { useNavigate, useParams } from 'react-router-dom'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { reviewService } from '../services/review.service.js'

function getEmptyMsg() {
    return {
        txt: '',
    }
}

function getEmptyReview() {
    return {
        txt: '',
    }
}

export function ToyDetails() {
    const params = useParams()
    const navigate = useNavigate()

    const [msg, setMsg] = useState(getEmptyMsg())
    const [review, setReview] = useState(getEmptyReview())
    const [reviews, setReviews] = useState([])
    const [currToy, setCurrToy] = useState(null)

    useEffect(() => {
        loadToy()
        loadReviews()
    }, [params.toyId])

    // useEffect(() => {
    //     const fetchData = async () => {
    //         try {
    //             const toy = await toyService.getById(params.toyId)
    //             if (!toy) return navigate('/toy')
    //             setCurrToy(toy)
    //         } catch (err) {
    //             console.log('Had issues loading toy', err)
    //         }
    //     }
    //     fetchData()
    // }, [])

    async function loadToy() {
        try {
            const toy = await toyService.getById(params.toyId)
            if (!toy) return navigate('/toy')
            setCurrToy(toy)
        } catch (err) {
            console.log('Had issues loading toy', err)
        }
    }



    async function loadReviews() {
        try {
            // Create a filter object with both aboutToyId and additional filters
            const filter = { name: 'exampleFilter', sort: 'exampleSort' };

            // Fetch reviews based on aboutToyId and additional filters
            const reviews = await reviewService.query({ aboutToyId: params.toyId });
            setReviews(reviews);
            console.log('reviews', reviews);
        } catch (err) {
            console.log('Had issues loading reviews', err);
            showErrorMsg('Cannot load reviews');
        }
    }

    function handleMsgChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setMsg((msg) => ({ ...msg, [field]: value }))
    }

    function handleReviewChange(ev) {
        const field = ev.target.name
        const value = ev.target.value
        setReview((review) => ({ ...review, [field]: value }))
    }

    async function onSaveMsg(ev) {
        ev.preventDefault()
        const savedMsg = await toyService.addMsg(currToy._id, msg.txt)
        setCurrToy((prevToy) => ({
            ...prevToy,
            msgs: [...(prevToy.msgs || []), savedMsg],
        }))
        setMsg(getEmptyMsg())
        showSuccessMsg('Msg saved!')
    }

    async function onSaveReview(ev) {
        ev.preventDefault()
        // console.log('review', review);
        const savedReview = await reviewService.add({ txt: review.txt, aboutToyId: currToy._id })
        // Update the toy's reviews, not the toy's text
        setCurrToy((prevToy) => ({
            ...prevToy,
            reviews: [...(prevToy.reviews || []), savedReview],
        }))
        setReview(getEmptyReview())
        showSuccessMsg('Review saved!')
    }

    //   async function onRemoveMsg(msgId) {
    //     const removedMsgId = await toyService.removeMsg(toy._id, msgId)
    //     setCurrToy((prevToy) => ({
    //       ...prevToy,
    //       msgs: prevToy.msgs.filter((msg) => removedMsgId !== msg.id),
    //     }))
    //     showSuccessMsg('Msg removed!')
    //   }

    // async function onRemoveReview(reviewId) {
    //     const removedReviewId = await reviewService.remove(reviewId)
    //     // Update the toy's reviews, not the toy's text
    //     setToy((prevToy) => ({
    //         ...prevToy,
    //         reviews: prevToy.reviews.filter((review) => removedReviewId !== review.id),
    //     }))
    //     showSuccessMsg('Review removed!')
    // }

    const { txt } = msg
    const { txtR } = review

    if (!currToy) return <h4>loading</h4>
    const { _id, name, isDone } = currToy
    return (
        <section className="toy-details">
            <div className="toy-data-container">
                <h1>Id: {_id}</h1>
                <h1>To Do: {name}</h1>
                <h1>Is done?: {isDone ? 'yes' : 'no'}</h1>

                <ul>
                    {currToy.msgs &&
                        currToy.msgs.map((msg) => (
                            <li key={msg.id}>
                                By: {msg.by.fullname} - {msg.txt}
                                {/* <button type="button" onClick={() => onRemoveMsg(msg.id)}>
                X
              </button> */}
                            </li>
                        ))}
                </ul>
                <form className="login-form" onSubmit={onSaveMsg}>
                    <input
                        type="text"
                        name="txt"
                        value={txt}
                        placeholder="Username"
                        onChange={handleMsgChange}
                        required
                        autoFocus
                    />
                    <button>Send</button>
                </form>

                <h5 >Reviews</h5>
                <ul>
                    {reviews.map((review) => (
                        <li key={review.id}>
                            By: {review.byUser?.fullname}, {review.txt} {/* Use user.fullname here */}
                            {/* <button type="button" onClick={() => onRemoveReview(review.id)}>
                            ❌
                        </button> */}
                        </li>
                    ))}
                </ul>

                <form className="login-form" onSubmit={onSaveReview}>
                    <input
                        type="text"
                        name="txt"
                        value={txtR}
                        placeholder="Write a Review"
                        onChange={handleReviewChange}
                        required
                    />
                    <button>Submit Review</button>
                </form>


                <button className="back-btn" onClick={() => navigate('/toy')}>
                    Back to toys
                </button>
            </div>
        </section>
    )
}