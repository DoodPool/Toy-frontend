import { useState, useEffect } from 'react'

export function ToySort({ sortBy, setSortBy }) {

    const [sortByToEdit, setSortByToEdit] = useState({ ...sortBy })

    useEffect(() => {
        setSortBy(sortByToEdit)
    }, [sortByToEdit])

    function handleChange({ target }) {
        const field = target.name
        const value = target.type === 'number' ? +target.value : target.value
        if (field === 'desc') setSortByToEdit(prevSort => ({
            ...prevSort,
            desc: -(prevSort.desc)
        }))
        else setSortByToEdit((prevSort) => ({
            ...prevSort,
            [field]: value,
        }))
    }

    return (
        <form className="toy-sort">
            < select name="type" value={sortByToEdit.type} onChange={handleChange}>
                <option value="default">Sort by</option>
                <option value="name">Name</option>
                <option value="createdAt">Date</option>
                <option value="price">Price</option>
            </select >
            <label>
                <input
                    type="checkbox"
                    name="desc"
                    checked={sortByToEdit.desc > 0}
                    onChange={handleChange}
                />
                Descending
            </label>
        </form >
    )
}