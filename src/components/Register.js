import "./Register.css"

export default function Register({ registerEntries }) {
    // calculate total
    let total = 0;

    for (const entry of registerEntries) {
        total += parseFloat(entry.value)
    }

    return (
        <div className="register-container">
            <ListEntries
                className="list-entries"
                registerEntries={registerEntries} />
            <hr />
            <div className="total-section">Total: KES {total}</div>
        </div>
    )
}

function ListEntries({ registerEntries }) {
    const listItems = registerEntries.map((entry) =>
        <li className="list-item" key={entry.id}>{entry.value}</li>)
    return <ul >{listItems}</ul>
}
