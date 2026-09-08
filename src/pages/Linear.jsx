import { useState } from "react";
import { Link } from "react-router-dom";

function Linear() {
    const [values, setValues] = useState({ a: "", b: "", c: "" });
    const [answer, setAnswer] = useState("");

    function solve(event) {
        event.preventDefault();
        const { a, b, c } = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
        if (Object.values(values).some((value) => value === "")) setAnswer("Enter all three numbers first.");
        else if (a === 0) setAnswer("a cannot be 0 in a linear equation.");
        // Move b across first, then divide by a to get x on its own.
        else setAnswer(`x = ${Number(((c - b) / a).toFixed(6))}`);
    }

    return (
        <main className="solverPage">
            <section className="solverCard">
                <Link className="backLink" to="/">← Back to home</Link>
                <h1>Linear Equations</h1>
                <p className="equation">ax + b = c</p>
                <form onSubmit={solve}>
                    <div className="coefficientGrid">{Object.keys(values).map((key) => (
                        <label key={key}>{key}<input type="number" step="any" value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} /></label>
                    ))}</div>
                    <button type="submit">Solve</button>
                </form>
                {answer && <p className="result">{answer}</p>}
            </section>
        </main>
    );
}

export default Linear;
