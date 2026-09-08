import { useState } from "react";
import { Link } from "react-router-dom";

function Quadratic() {
    const [values, setValues] = useState({ a: "", b: "", c: "" });
    const [answers, setAnswers] = useState([]);
    const format = (number) => Number(number.toFixed(6));

    function solve(event) {   //solves the quadratic
        event.preventDefault();
        if (Object.values(values).some((value) => value === "")) return setAnswers(["Enter all three numbers first."]);
        const { a, b, c } = Object.fromEntries(Object.entries(values).map(([key, value]) => [key, Number(value)]));
        if (a === 0) return setAnswers(["a cannot be 0 in a quadratic equation."]);
        // This tells us whether the answers are real, repeated, or complex.
        const discriminant = b ** 2 - 4 * a * c;
        if (discriminant > 0) setAnswers([`x₁ = ${format((-b + Math.sqrt(discriminant)) / (2 * a))}`, `x₂ = ${format((-b - Math.sqrt(discriminant)) / (2 * a))}`]);
        else if (discriminant === 0) setAnswers([`x = ${format(-b / (2 * a))} (repeated root)`]);
        else {
            const real = format(-b / (2 * a));
            const imaginary = format(Math.sqrt(-discriminant) / Math.abs(2 * a));
            setAnswers([`x₁ = ${real} + ${imaginary}i`, `x₂ = ${real} − ${imaginary}i`]);
        }
    }

    return (
        <main className="solverPage"><section className="solverCard">
            <Link className="backLink" to="/">← Back to home</Link>
            <h1>Quadratic Equations</h1><p className="equation">ax² + bx + c = 0</p>
            <form onSubmit={solve}><div className="coefficientGrid">{Object.keys(values).map((key) => (
                <label key={key}>{key}<input type="number" step="any" value={values[key]} onChange={(event) => setValues({ ...values, [key]: event.target.value })} /></label>
            ))}</div><button type="submit">Solve</button></form>
            {answers.length > 0 && <div className="result">{answers.map((answer) => <p key={answer}>{answer}</p>)}</div>}
        </section></main>
    );
}

export default Quadratic;
