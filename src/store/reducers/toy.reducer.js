import { toyService } from "../../services/toy.service.js"

export const SET_TOYS = 'SET_TOYS'
export const REMOVE_TOY = 'REMOVE_TOY'
export const ADD_TOY = 'ADD_TOY'
export const UPDATE_TOY = 'UPDATE_TOY'

export const SET_FILTER_BY = 'SET_FILTER_BY'
export const SET_IS_LOADING = 'SET_IS_LOADING'

const initialState = {
    toys: [],
    toyCount: 0,
    stockCount: 0,
    filterBy: toyService.getDefaultFilter(),
    isLoading: false
}

export function toyReducer(state = initialState, action = {}) {
    let toys
    let stockCount

    // Toys
    switch (action.type) {
        case SET_TOYS:
            return { ...state, toys: action.toys, toyCount: action.toyCount, stockCount: action.stockCount }

        case REMOVE_TOY:
            toys = state.toys.filter(toy => toy._id !== action.toyId)
            return { ...state, toys }

        case ADD_TOY:
            toys = [...state.toys, action.toy]
            return { ...state, toys }

        case UPDATE_TOY:
            toys = state.toys.map(toy => toy._id === action.toy._id ? action.toy : toy)
            stockCount = toys.filter(toy => toy.isDone).length
            return { ...state, toys, stockCount }

        // Filter
        case SET_FILTER_BY:
            return { ...state, filterBy: { ...action.filterBy } }

        // Is Loading
        case SET_IS_LOADING:
            return { ...state, isLoading: action.isLoading }

        default:
            return state
    }
}