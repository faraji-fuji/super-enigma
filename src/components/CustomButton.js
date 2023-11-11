export default function CustomButton({ value, handleButtonClick }) {
    return (
        <button onClick={handleButtonClick}>{value}</button>
    )
}