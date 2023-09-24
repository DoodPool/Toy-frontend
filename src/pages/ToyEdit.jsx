import { toyService } from "../services/toy.service.js"
import { showErrorMsg } from "../services/event-bus.service.js"

import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'



export function ToyEdit() {

    const [toyToEdit, setToyToEdit] = useState(toyService.getEmptyToy())
    const navigate = useNavigate()
    const params = useParams()

    useEffect(() => {
        if (params.toyId) loadToy()
    }, [])

    function loadToy() {
        toyService.getById(params.toyId)
            .then(setToyToEdit)
            .catch(err => {
                console.log('Had issued in toy edit:', err);
                navigate('/toy')
                showErrorMsg('Toy not found!')
            })
    }

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? (+target.value || '') : target.value
        setToyToEdit(prevToy => ({ ...prevToy, [field]: value }))
    }

    function onSaveToy(ev) {
        ev.preventDefault()
        toyService.save(toyToEdit)
            .then(() => navigate('/toy'))
            .catch(err => {
                showErrorMsg('Cannot save toy', err)
            })
    }

    const { name, price } = toyToEdit

    return (
        <section className="toy-edit">
            <h2>Edit Toy</h2>

            <form onSubmit={onSaveToy}>

                <label htmlFor="name">Name:</label>
                <input onChange={handleChange} value={name} type="text" name="name" id="name" />

                <label htmlFor="price">Price:</label>
                <input onChange={handleChange} value={price} type="number" name="price" id="price" />

                <button>Save</button>
                
            </form>
        </section>
    )
}