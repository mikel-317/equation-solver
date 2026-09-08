import { Link } from "react-router-dom";

function Card(props) {
    return (
        <Link className="cardLink" to={props.link}>
            <div className="card">
                <img className="cardImage" src={props.image} alt={props.name} />
                <h2>{props.name}</h2>
                <p>{props.description}</p>
            </div>
        </Link>
    );
}

export default Card;