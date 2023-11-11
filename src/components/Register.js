export default function Register({ registerEntries }) {
    // calculate total
    let total = 0;

    for (const entry in registerEntries) {
        total += parseFloat(registerEntries)
    }

    return (
        <div>
            <ListEntries registerEntries={registerEntries} />
            <div>{total}</div>
        </div>
    )
}

function ListEntries({ registerEntries }) {
    const listItems = registerEntries.map(entry => <li>{entry}</li>)
    return <ul>{listItems}</ul>
}
