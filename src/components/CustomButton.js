import "./CustomButton.css"

export default function CustomButton({ value, handleButtonClick }) {
    return (
        <button className="btn" onClick={handleButtonClick}>{value}</button>
    )
}