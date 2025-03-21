import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Category from "./pages/Category";
import Flags from "./pages/Flags";
import Capitals from "./pages/Capitals";

function App() {

  return (
    <div className="container">
      <img src="/assets/logo.svg" alt="logo mundiquiz" aria-hidden="true" className="logo"/>
      <Suspense fallback="loading">
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                    <Route path="/category" element={<Category />} />
                    <Route path="/flags" element={<Flags />} />
                    <Route path="/capitals" element={<Capitals />} />
                </Routes>         
            </main>
        </BrowserRouter>
      </Suspense>
      <img src="/assets/backgroung/world-bg.svg" alt="a world draw" aria-hidden="true" className="world-bg"/>
    </div>
  )
}

export default App
