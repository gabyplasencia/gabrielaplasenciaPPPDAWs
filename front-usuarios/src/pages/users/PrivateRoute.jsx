import PropTypes from 'prop-types';
import { useAuth } from "../../context/AuthContext";
import { Navigate } from "react-router-dom";

export default function PrivateRoute({ children }) {
  const { user, loading } = useAuth();

  if (loading) return <p className="loading-text">Loading...</p>;

  if (!user) {
    return <Navigate to="/" replace />;
  }

  return children;
}

PrivateRoute.propTypes = {
  children: PropTypes.node.isRequired,
};
