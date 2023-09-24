export function ToyPreview({ toy }) {
    return (
        <article className="toy-preview">

            <span >{`name: ${toy.name}`}</span>
            <span >{`price: ${toy.price}`}</span>
            <span >{`labels: ${toy.labels}`}</span>
            <span >{`in stock?: ${toy.inStock}`}</span>

            {toy.owner && <p>Owner: {toy.owner && toy.owner.fullname}</p>}

        </article>
    )
}