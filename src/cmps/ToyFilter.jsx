
import { toyService } from "../services/toy.service.js"
import { utilService } from "../services/util.service.js"
import { Filter } from './Filter.jsx'
import { useState, useEffect, useRef } from 'react'

const toyLabel = toyService.getLabels()

export function ToyFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    onSetFilterBy = useRef(utilService.debounce(onSetFilterBy))

    useEffect(() => {
        onSetFilterBy.current(filterByToEdit)
    }, [filterByToEdit])

    function handleChange({ target }) {
        console.log('target', target);
        const field = target.name
        let value = target.value
        if (target.type === 'select-multiple') value = Array.from(target.selectedOptions, (option) => option.value)
        setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    }

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    const { name, inStock, pageIdx, labels } = filterByToEdit

    return (
        <section className="toy-filter">
            <form onSubmit={onSubmitFilter}>
                <div className="filter-input-wrapper">
                    <input
                        onChange={handleChange}
                        value={name}
                        type="text"
                        placeholder="Search"
                        name="name"
                    />
                    <div className="fa search"></div>
                </div>
            </form>
            <select name="inStock" value={inStock} onChange={handleChange}>
                <option value="">All</option>
                <option value="true">In stock</option>
                <option value="false">Out of stock</option>
            </select>
            <label >
                Page:
                <input type="number"
                    name="pageIdx"
                    value={pageIdx}
                    onChange={handleChange}
                />
            </label>

        </section>
    )
}