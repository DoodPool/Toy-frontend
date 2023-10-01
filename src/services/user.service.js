import axios from 'axios'
import { httpService } from './http.service'

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

async function login({ username, password }) {
    const user = await httpService.post('auth/login', { username, password })
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function signup({ username, password, fullname, isAdmin }) {
    console.log('isAdmin', isAdmin);
    const user = await httpService.post('auth/signup', { username, password, fullname, isAdmin })
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function logout() {
    const user = await httpService.post('auth/logout')
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
    return user
}

function getEmptyCredentials() {
    return {
        username: '',
        password: '',
        fullname: '',
        isAdmin: false
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

