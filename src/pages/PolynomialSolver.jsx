import { useState } from "react";
import { Link } from "react-router-dom";

//solves the polynomial

// Complex numbers are stored as a real part and an imaginary part.
const add = (left, right) => ({ re: left.re + right.re, im: left.im + right.im });
const subtract = (left, right) => ({ re: left.re - right.re, im: left.im - right.im });
const multiply = (left, right) => ({ re: left.re * right.re - left.im * right.im, im: left.re * right.im + left.im * right.re });
const size = (value) => Math.hypot(value.re, value.im);

function evaluate(coefficients, value) {
    // Plug a complex value into the polynomial.
    return coefficients.slice(1).reduce((total, coefficient) => add(multiply(total, value), { re: coefficient, im: 0 }), { re: coefficients[0], im: 0 });
}

function findRoots(coefficients) {
    const degree = coefficients.length - 1;
    const scaled = coefficients.map((coefficient) => coefficient / coefficients[0]);
    const radius = 1 + Math.max(...scaled.slice(1).map(Math.abs));
    // Start with guesses around a circle, then keep improving them.
    let roots = Array.from({ length: degree }, (_, index) => {
        const angle = (2 * Math.PI * index) / degree + 0.2;
        return { re: radius * Math.cos(angle), im: radius * Math.sin(angle) };
    });
    for (let round = 0; round < 200; round += 1) {
        // Each loop nudges every guess closer to a root.
        roots = roots.map((root, index, previous) => {
            const denominator = previous.reduce((product, other, otherIndex) => index === otherIndex ? product : multiply(product, subtract(root, other)), { re: 1, im: 0 });
            const value = evaluate(scaled, root);
            const bottom = size(denominator) ** 2 || 1e-12;
            return subtract(root, { re: (value.re * denominator.re + value.im * denominator.im) / bottom, im: (value.im * denominator.re - value.re * denominator.im) / bottom });
        });
    }
    return roots.sort((left, right) => left.re - right.re || left.im - right.im);
}

function formatRoot(root) {
    const real = Math.abs(root.re) < 1e-7 ? 0 : Number(root.re.toFixed(6));
    const imaginary = Math.abs(root.im) < 1e-7 ? 0 : Number(root.im.toFixed(6));
    if (imaginary === 0) return real;
    if (real === 0) return `${imaginary}i`;
    return `${real} ${imaginary < 0 ? "−" : "+"} ${Math.abs(imaginary)}i`;
}

function PolynomialSolver({ degree }) {
    const letters = degree === 3 ? ["a", "b", "c", "d"] : ["a", "b", "c", "d", "e"];
    const [values, setValues] = useState(Object.fromEntries(letters.map((letter) => [letter, ""])));
    const [answers, setAnswers] = useState([]);
    const equation = degree === 3 ? "ax³ + bx² + cx + d = 0" : "ax⁴ + bx³ + cx² + dx + e = 0";

    function solve(event) {
        event.preventDefault();
        if (Object.values(values).some((value) => value === "")) return setAnswers(["Enter every coefficient first."]);
        const coefficients = letters.map((letter) => Number(values[letter]));
        if (coefficients[0] === 0) return setAnswers(["a cannot be 0 for this equation."]);
        setAnswers(findRoots(coefficients).map((root, index) => `x${index + 1} = ${formatRoot(root)}`));
    }

    return (
        <main className="solverPage"><section className="solverCard">
            <Link className="backLink" to="/polynomial">← Choose another polynomial</Link>
            <h1>{degree === 3 ? "Cubic" : "Quartic"} Equations</h1><p className="equation">{equation}</p>
            <form onSubmit={solve}><div className="coefficientGrid">{letters.map((letter) => (
                <label key={letter}>{letter}<input type="number" step="any" value={values[letter]} onChange={(event) => setValues({ ...values, [letter]: event.target.value })} /></label>
            ))}</div><button type="submit">Solve</button></form>
            {answers.length > 0 && <div className="result">{answers.map((answer) => <p key={answer}>{answer}</p>)}</div>}
        </section></main>
    );
}

export default PolynomialSolver;
