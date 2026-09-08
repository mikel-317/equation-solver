import { Link } from "react-router-dom";

function Polynomial() {
    return (
        <main className="solverPage"><section className="solverCard">
            <Link className="backLink" to="/">← Back to home</Link>
            <h1>Polynomial Equations</h1>
            <p className="equation">Choose the highest power of x in your equation.</p>
            <div className="choiceButtons"><Link to="/polynomial/cubic">Cubic: x³</Link><Link to="/polynomial/quartic">Quartic: x⁴</Link></div>
        </section></main>
    );
}

export default Polynomial;
