export default function Register({ registerEntries }) {
    // calculate total
    let total = 0;

    for (const entry of registerEntries) {
        total += parseFloat(entry)
    }

    return (
        <div>
            <ListEntries registerEntries={registerEntries} />
            <div>{total}</div>
        </div>
    )
}

function ListEntries({ registerEntries }) {
    const listItems = registerEntries.map(entry => <li key={entry.id}>{entry}</li>)
    return <ul >{listItems}</ul>
}
