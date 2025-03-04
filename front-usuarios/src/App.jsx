import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";

function App() {

  return (
    <>
      <h1>LOGO</h1>
      <span>AVATAR</span>
      <Suspense fallback="loading">
        <BrowserRouter>
            
            <div role="main">
                <Routes>
                    <Route path="/" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>         
            </div>
            
        </BrowserRouter>
    </Suspense>
    </>
  )
}

export default App
