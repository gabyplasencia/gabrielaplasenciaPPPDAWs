import PropTypes from "prop-types";
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function AdminRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="loading-text --mod-admin">Loading...</p>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  if (!user.is_admin) {
    return <Navigate to="/category" replace />;
  }

  return children;
}

AdminRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
