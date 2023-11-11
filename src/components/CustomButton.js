import "./CustomButton.css"

export default function CustomButton({ value, handleButtonClick }) {
    return (
        <button className="" onClick={handleButtonClick}>{value}</button>
    )
}