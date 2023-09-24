import axios from 'axios'

const STORAGE_KEY_LOGGEDIN_USER = 'loggedInUser'

export const userService = {
    login,
    signup,
    logout,
    getLoggedinUser,
    getEmptyCredentials
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function login({ username, password }) {
    return axios.post('/api/auth/login', { username, password })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
            return user
        })
}

function signup({ username, password, fullname }) {
    return axios.post('/api/auth/signup', { username, password, fullname })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
            return user
        })
}

function logout() {
    return axios.post('/api/auth/logout')
        .then(() => {
            sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
        })
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: ''
    }
}





// function getById(userId) {
//     return storageService.get(STORAGE_KEY, userId)
// }

// function addActivity(userId, activity) {
//     return userService.getById(userId)
//         .then(user => {
//             const newActivity = { txt: activity.txt, at: activity.createdAt }
//             user.activities.unshift(newActivity)
//             return storageService.put(STORAGE_KEY, user)
//         })
//         .catch((err) => {
//             console.log('Error addind activity:', err)
//             return Promise.reject(err)
//         })
// }

