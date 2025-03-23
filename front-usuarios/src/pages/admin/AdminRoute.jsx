import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p>Cargando...</p>;

  // No autenticado: redirige al login
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // Autenticado pero no es admin: redirige al dashboard
  if (!user.is_admin) {
    return <Navigate to="/category" replace />;
  }

  // Si es admin, renderiza los children
  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
