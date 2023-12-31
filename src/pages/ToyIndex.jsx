import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'

import { addToy, loadToys, removeToy, setFilterBy } from '../store/actions/toy.actions.js'
import { showSuccessMsg, showErrorMsg } from '../services/event-bus.service.js'
import { toyService } from '../services/toy.service.js'
import { ToyFilter } from '../cmps/ToyFilter.jsx'
import { ToySort } from '../cmps/ToySort.jsx'
import { ToyList } from '../cmps/ToyList.jsx'
import { Filter } from '../cmps/Filter.jsx'

export function ToyIndex() {

    const toys = useSelector(storeState => storeState.toyModule.toys)
    const filterBy = useSelector(storeState => storeState.toyModule.filterBy)
    const [sortBy, setSortBy] = useState({ type: '', desc: -1 })

    const [toyToAdd, setToyToAdd] = useState(toyService.getEmptyToy())
    const loggedinUser = useSelector(storeState => storeState.userModule.loggedinUser)
    const isLoading = useSelector(storeState => storeState.toyModule.isLoading)

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadToys(filterBy, sortBy)
            } catch (err) {
                console.log('err:', err)
                showErrorMsg('Cannot load toys')
            }
        }
        fetchData()
    }, [filterBy, sortBy])

    function onSetFilterBy(filterBy) {
        setFilterBy(filterBy)
    }

    async function onRemoveToy(toyId) {
        try {
            await removeToy(toyId)
            showSuccessMsg('Toy removed')
        } catch (err) {
            console.log('Cannot remove toy', err)
            showErrorMsg('Cannot remove toy')
        }
    }

    function handleChange({ target }) {
        const value = target.value
        setToyToAdd(prevToy => ({ ...prevToy, name: value }))
    }

    async function onAddToy(ev) {
        ev.preventDefault()
        try {
            await addToy(toyToAdd, loggedinUser)
            showSuccessMsg('Toy added')
            setToyToAdd(toyService.getEmptyToy())
        } catch (err) {
            console.log('Cannot add toy', err)
            showErrorMsg('Cannot add toy')
        }
    }

    if (!toys) return <div>Loading...</div>
    return (
        <section className='toy-index'>

            <main>
                {/* <ToyFilter filterBy={filterBy} onSetFilterBy={onSetFilterBy} /> */}
                <Filter filterBy={filterBy} onSetFilterBy={onSetFilterBy} />


                <form onSubmit={onAddToy}>
                    <input
                        type="text"
                        placeholder="Toy name"
                        onChange={handleChange}
                        value={toyToAdd.toy}
                    />
                    <button>Add</button>
                </form>

                <ToySort sortBy={sortBy} setSortBy={setSortBy} />

                {!isLoading && <ToyList toys={toys} onRemoveToy={onRemoveToy} />}
                {isLoading && <div>Loading...</div>}

            </main>

        </section>
    )
}