import { toyService } from "../../services/toy.service.js"
import { userService } from "../../services/user.service.js"
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_TOYS } from "../reducers/toy.reducer.js"
import { store } from '../store.js'

// _id: '',
// name: '',
// price: 123,
// labels: ['Doll', 'Battery Powered', 'Baby'],
// isDone: false,
// inStock: Date.now()

export function loadToys(sortBy) {
    const { filterBy } = store.getState().toyModule
    store.dispatch({ type: SET_IS_LOADING, isLoading: true })

    return toyService.query(filterBy, sortBy)
        .then(toys => {
            console.log('test toys', toys);
            // store.dispatch({ type: SET_TOYS, toys: toys.toysToDisplay, toyCount: toys.toysCount, stockCount: toys.stockCount })
            store.dispatch({ type: SET_TOYS, toys })
        })
        .catch(err => {
            console.log('toy action -> Cannot load toys', err)
            throw err
        })
        .finally(() => {
            store.dispatch({ type: SET_IS_LOADING, isLoading: false })
        })
}

export function removeToy(toyId) {

    return toyService.remove(toyId)
        .then(() => {
            store.dispatch({ type: REMOVE_TOY, toyId })
        })
        .catch(err => {
            console.log('toy action -> Cannot remove toy', err)
            throw err
        })
}

export function addToy(toyToAdd, loggedinUser) {

    // console.log('toyToAdd', toyToAdd)
    // console.log('loggedinUser', loggedinUser)

    return toyService.save(toyToAdd)
        .then(savedToy => {
            store.dispatch({ type: ADD_TOY, toy: savedToy })
            // if (loggedinUser) {
            //     userService.addActivity(loggedinUser._id, toyToAdd)
            //         .catch(err => {
            //             console.error('Error adding activity:', err)
            //         })
            // }
        })
        .catch(err => {
            console.log('Cannot add toy', err)
            throw err
        })
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}