import { useAuth } from "../../context/AuthContext";
import { Link } from "react-router-dom";

export default function Admin() {
    const { user } = useAuth();
    return user && user.is_admin ? (
      <div>
        <Link to="/logout">Cerrar sesión</Link>
        <h1>👑 Bienvenido al panel, administrador {user.name}</h1>
        <Link to="/countries">Administrar paises</Link>
      </div>
    ) : (
      <p>Cargando usuario...</p>
    );
  }

