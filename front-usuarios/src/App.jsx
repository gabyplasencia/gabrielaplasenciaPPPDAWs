import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <div className="container">
      <img src="/logo.svg" alt="logo mundiquiz" aria-hidden="true" className="logo"/>
      <Suspense fallback="loading">
        <BrowserRouter>
            <main>
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>         
            </main>
        </BrowserRouter>
      </Suspense>
      <img src="/backgroung/world-bg.svg" alt="a world draw" aria-hidden="true" className="world-bg"/>
    </div>
  )
}

export default App
