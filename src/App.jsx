import { BrowserRouter, Route, Routes } from "react-router-dom";
import Card from "./card.jsx";
import math3 from "./assets/math3.jpg";
import math1 from "./assets/math1.jpg";
import math2 from "./assets/math2.jpg";
import Header from "./header.jsx";
import Footer from "./footer.jsx";
import Linear from "./pages/Linear.jsx";
import Quadratic from "./pages/Quadratic.jsx";
import Polynomial from "./pages/Polynomial.jsx";
import PolynomialSolver from "./pages/PolynomialSolver.jsx";

function Home() {
    return (
        <main className="homePage">
            <div className="header">
                <Header />
            </div>

            <div className="cards">
                <Card
                    name="Linear"
                    image={math3}
                    description="Solve Linear equations"
                    link="/linear"
                />

                <Card
                    name="Quadratic"
                    image={math1}
                    description="Solve Quadratic equations"
                    link="/quadratic"
                />

                <Card
                    name="Polynomials"
                    image={math2}
                    link="/polynomial"
                />
            </div>

            <div className="footer">
                <Footer />
            </div>
        </main>
    );
}

function App() {
    return (
        <BrowserRouter>
            <Routes>
                {/* The homepage is shown when the app first opens. */}
                <Route path="/" element={<Home />} />
                <Route path="/linear" element={<Linear />} />
                <Route path="/quadratic" element={<Quadratic />} />
                <Route path="/polynomial" element={<Polynomial />} />
                {/* The same solver is reused; only the degree changes. */}
                <Route path="/polynomial/cubic" element={<PolynomialSolver degree={3} />} />
                <Route path="/polynomial/quartic" element={<PolynomialSolver degree={4} />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
