import axios from "axios"

export default function Logout({ authToken, handleLogoutClick }) {
    return (
        <button onClick={handleLogoutClick}>Logout</button>
    )
}