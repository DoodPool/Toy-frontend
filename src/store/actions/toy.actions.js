import { toyService } from "../../services/toy.service.js"
import { userService } from "../../services/user.service.js"
import { ADD_TOY, REMOVE_TOY, SET_FILTER_BY, SET_IS_LOADING, SET_TOYS } from "../reducers/toy.reducer.js"
import { store } from '../store.js'

export async function loadToys(filterBy, sortBy) {
    // const { filterBy } = store.getState().toyModule
    // store.dispatch({ type: SET_IS_LOADING, isLoading: true })
    try {
        const toys = await toyService.query(filterBy, sortBy)
        store.dispatch({ type: SET_TOYS, toys })
        // console.log('test toys', toys);
        // store.dispatch({ type: SET_TOYS, toys: toys.toysToDisplay, toyCount: toys.toysCount, stockCount: toys.stockCount })
    } catch (err) {
        console.log('toy action -> Cannot load toys', err)
        throw err
    } finally {
        store.dispatch({ type: SET_IS_LOADING, isLoading: false })
    }
}

export async function removeToy(toyId) {
    try {
        const toy = await toyService.remove(toyId)
        store.dispatch({ type: REMOVE_TOY, toyId })
        return toy
    } catch (err) {
        console.log('toy action -> Cannot remove toy', err)
        throw err
    }
}

export async function addToy(toyToAdd, loggedinUser) {
    try {
        const savedToy = await toyService.save(toyToAdd)
        store.dispatch({ type: ADD_TOY, toy: savedToy })
        return savedToy
        // if (loggedinUser) {
        //     userService.addActivity(loggedinUser._id, toyToAdd)
        //         .catch(err => {
        //             console.error('Error adding activity:', err)
        //         })
        // }
    } catch (err) {
        console.log('Cannot add toy', err)
        throw err
    }
}

export function setFilterBy(filterBy) {
    store.dispatch({ type: SET_FILTER_BY, filterBy: filterBy })
}