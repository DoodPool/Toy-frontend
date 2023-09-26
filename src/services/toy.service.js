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
    getPricesPerLabel,
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
    // console.log('toy test', toy);
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



function getPricesPerLabel() {
    const filterBy = getDefaultFilter()
    const sortBy = getDefaultSort()

    let labels = {
        'On wheels': 0,
        'Box game': 0,
        'Art': 0,
        'Baby': 0,
        'Doll': 0,
        'Puzzle': 0,
        'Outdoor': 0,
        'Battery Powered': 0
    };
    
    return new Promise((resolve, reject) => {
        const toysPromise = query(filterBy, sortBy);
    
        toysPromise.then(toys => {
            const promises = toys.map(toy =>
                Promise.all(
                    toy.labels.map(label => {
                        labels[label] += toy.price;
                    })
                )
            );
    
            Promise.all(promises)
                .then(() => resolve(labels))
                .catch(err => reject(err));
        });
    });
    }
