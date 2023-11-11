export default function Register({ registerEntries }) {
    // calculate total
    let total = 0;

    for (const entry of registerEntries) {
        total += parseFloat(entry.value)
    }

    return (
        <div>
            <ListEntries registerEntries={registerEntries} />
            <hr />
            <div>Total: KES {total}</div>
        </div>
    )
}

function ListEntries({ registerEntries }) {
    const listItems = registerEntries.map((entry) => <li key={entry.id}>{entry.value}</li>)
    return <ul >{listItems}</ul>
}
