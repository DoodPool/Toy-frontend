export function ToyPreview({ toy }) {

    function getInStockTxt(inStock) {
        if (inStock) return 'In stock'
        return 'Out of stock'
    }
    return (
        <article className="toy-preview">

            <span >{`name: ${toy.name}`}</span>
            <span >{`price: ${toy.price}`}</span>
            <ul className="labels-list clean-list">
                {toy.labels.map(label =>
                    <li className={label} key={toy._id + label}>
                        {label}
                    </li>
                )}
            </ul>
            <span >{getInStockTxt(toy.inStock)}</span>

            {toy.owner && <p>Owner: {toy.owner && toy.owner.fullname}</p>}

        </article>
    )
}