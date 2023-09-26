import { Link } from "react-router-dom"
import { ToyPreview } from "./ToyPreview.jsx"


export function ToyList({ toys, onRemoveToy }) {

    return (
        <section >
            <ul className="toy-list">
                {toys.length
                    ? toys.map(toy =>
                        <li className="toy-preview" key={toy._id}>
                            <ToyPreview toy={toy} />
                            <div>
                                <button className="btn-edit"><Link to={`/toy/edit/${toy._id}`}>Edit</Link></button>
                                <button className="btn-details"><Link to={`/toy/${toy._id}`}>Details</Link></button>
                                <button className="btn-remove" onClick={() => onRemoveToy(toy._id)}>Remove</button>
                            </div>
                        </li>)

                    : <p>No toys to show..</p>}

            </ul>
        </section>
    )
}