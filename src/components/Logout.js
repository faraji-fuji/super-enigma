import "./Logout.css"

export default function Logout({ handleLogoutClick }) {
    return (
        <button
            className="logout-button"
            onClick={handleLogoutClick}
        >
            Logout
        </button>
    )
}