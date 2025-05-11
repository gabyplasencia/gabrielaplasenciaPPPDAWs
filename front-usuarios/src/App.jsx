import { Suspense, useEffect } from "react";
import { Routes, Route} from "react-router-dom";
import { useLocation } from "react-router-dom";
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
import AdminCountries from "./pages/admin/AdminCountries";
import Results from "./pages/users/Results";
import AddAdmin from "./pages/auth/AddAdmin";
import AdminTickets from "./pages/admin/AdminTickets";

function App() {
  const { user, setUser } = useAuth();
  const location = useLocation();

  const isAdmin = user?.is_admin || location.pathname === "/login-admin";

  useEffect(() => {
    if (location.pathname === "/") {
      setUser(null);
      localStorage.removeItem("user");
    }
  }, [location.pathname, setUser]);

  return (
      <div className={`container ${isAdmin ? "admin" : "user"}`}> 
        {!isAdmin && (
          <>
            <img src="/assets/logo.svg" alt="logo mundiquiz" aria-hidden="true" className="logo"/>
            <img src="/assets/background/world-bg.svg" alt="a world draw" aria-hidden="true" className="world-bg"/>
          </>
        )}
        {isAdmin && (
          <>
            <h1 className="logo admin__logo">MUNDIQUIZ DATABASE ACCESS</h1>
          </>
        )}
        <Suspense fallback="loading">
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
                  path="/results"
                  element={
                    <PrivateRoute>
                      <Results />
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
                <Route
                  path="/countries"
                  element={
                    <AdminRoute>
                      <AdminCountries/>
                    </AdminRoute>
                  }
                />
                <Route
                  path="/add-admin"
                  element={
                    <AdminRoute>
                      <AddAdmin />
                    </AdminRoute>
                  }
                />
                <Route
                  path="/tickets"
                  element={
                    <AdminRoute>
                      <AdminTickets />
                    </AdminRoute>
                  }
                />
                <Route path="/logout" element={<Logout />} />      
              </Routes>
          </main>
        </Suspense>
      </div>
      )
}

export default App
