import { userService } from './user.service.js'
import { httpService } from './http.service'

const labels = ['On wheels', 'Box game', 'Art', 'Baby', 'Doll', 'Puzzle', 'Outdoor', 'Battery Powered']

export const toyService = {
    query,
    getById,
    save,
    remove,
    getEmptyToy,
    getDefaultFilter,
    getDefaultSort,
    getLabels,
}

function query(filterBy = {}, sortBy) {
    return httpService.get('toy', { params: { filterBy, sortBy } })
}

function getById(toyId) {
    return httpService.get(`toy/${toyId}`)
}

function remove(toyId) {
    return httpService.delete(`toy/${toyId}`)
}

function save(toy) {
    console.log('toy test', toy);
    if (toy._id) {
        return httpService.put(`toy/${toy._id}`, toy)
    } else {
        return httpService.post('toy', toy)
    }
}

function getDefaultFilter() {
    return {
        name: '',
        inStock: '',
        pageIdx: 0,
        labels: []
    }
}

function getDefaultSort() {
    return { type: '', desc: -1 }
}



function getLabels() {
    return [...labels]
}

function getEmptyToy() {
    return {
        _id: '',
        name: '',
        price: 123,
        labels: ['Doll', 'Battery Powered', 'Baby'],
        createdAt: Date.now(),
        inStock: true,
        owner: userService.getLoggedinUser(),
    }
}