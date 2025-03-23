import { Suspense } from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import Login from "./pages/auth/Login";
import LoginAdmin from "./pages/auth/LoginAdmin";
import Register from "./pages/auth/Register";
import Category from "./pages/users/Category";
import Flags from "./pages/users/Flags";
import Capitals from "./pages/users/Capitals";
import PrivateRoute from "./pages/users/PrivateRoute";
import AdminDashboard from "./pages/admin/AdminDashboard";
import AdminRoute from "./pages/admin/AdminRoute";
import Logout from "./components/Logout";
import { useAuth } from "./context/AuthContext";

function App() {
  const {user} = useAuth();
  return (
    <div className={`container ${user?.is_admin ? "admin" : "user"}`}> 
      {!user?.is_admin && (
        <>
          <img src="/assets/logo.svg" alt="logo mundiquiz" aria-hidden="true" className="logo"/>
          <img src="/assets/backgroung/world-bg.svg" alt="a world draw" aria-hidden="true" className="world-bg"/>
        </>
      )}
      <Suspense fallback="loading">
        <BrowserRouter>
            <main>
            <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login-admin" element={<LoginAdmin />} />
                <Route path="/register" element={<Register />} />
                <Route
                  path="/category"
                  element={
                    <PrivateRoute>
                      <Category />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/flags"
                  element={
                    <PrivateRoute>
                      <Flags />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/capitals"
                  element={
                    <PrivateRoute>
                      <Capitals />
                    </PrivateRoute>
                  }
                />
                <Route
                  path="/admin"
                  element={
                    <AdminRoute>
                      <AdminDashboard />
                    </AdminRoute>
                  }
                />
                <Route path="/logout" element={<Logout />} />      
              </Routes>
            </main>
        </BrowserRouter>
      </Suspense>
    </div>
  )
}

export default App
