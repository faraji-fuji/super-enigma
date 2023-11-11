import axios from "axios"
import "./Logout.css"

export default function Logout({ authToken, handleLogoutClick }) {
    return (
        <button
            className="logout-button"
            onClick={handleLogoutClick}
        >
            Logout
        </button>
    )
}