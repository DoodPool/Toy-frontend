
import { useSelector } from 'react-redux'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { logout } from '../store/actions/user.actions.js'
import { LoginSignup } from './LoginSignUp.jsx'
import { NavLink } from 'react-router-dom'

export function AppHeader() {
    // const toyCount = useSelector(storeState => storeState.toyModule.toyCount)
    // const stokeCount = useSelector(storeState => storeState.toyModule.stokeCount)
    const user = useSelector(storeState => storeState.userModule.loggedinUser)

    async function onLogout() {
        try {
            await logout()
            showSuccessMsg('Logout successfully')
        } catch (err) {
            console.log('err:', err)
            showErrorMsg('Cannot logout')
        }
    }

    return (
        <header className="app-header">
            <h1 className="logo">Solaris</h1>
            <nav className="main-nav">
                <NavLink to="/">Home</NavLink> |
                <NavLink to="/toy">Toys</NavLink> |
                <NavLink to="/about">About</NavLink> |
                <NavLink to="/dashboard">Dashboard</NavLink>
            </nav>
            {user && (
                <section className="user-info">
                    <h3>
                        <span>Welcome, </span>{user.fullname}
                    </h3>
                    <button onClick={onLogout}>Logout</button>
                </section>
            )}
            {!user && (
                <section className="user-info">
                    <LoginSignup />
                </section>
            )}
        </header>
    );
}