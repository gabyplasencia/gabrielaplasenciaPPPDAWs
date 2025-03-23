import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function Logout() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const doLogout = async () => {
      const token = localStorage.getItem("token");

      try {
        await api.post(
          "/auth/logout",
          {},
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (error) {
        console.warn("Token inválido o ya expirado. Continuando logout...");
      }

      logout(); // limpiamos contexto y localStorage
      navigate("/");
    };

    doLogout();
  }, [navigate, logout]);

  return <p>Cerrando sesión...</p>;
}
