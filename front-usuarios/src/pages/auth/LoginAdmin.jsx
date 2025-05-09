import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const LoginAdmin = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();

  useEffect(() => {
    if (user && user.is_admin) {
      navigate("/admin");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.access_token;

      const userRes = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userRes.data;

      if (!userData.is_admin) {
        setError("You are not allowed to access this page.");
        return;
      }

      login(token, userData);
      navigate("/admin");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error_type === "email_not_verified") {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("INVALID CREDENTIALS");
      }
    }
  };
  return (
    <form action="/" id="login" className="login admin__main-wrapper" onSubmit={handleLogin}>
        {error && <div className="error-message">{error}</div>}
        <h2 className="admin__title">ADMIN LOGIN</h2>
        <div className="login__input-wrapper">
            <label htmlFor="email" className="login__label">Email:</label>
            <input type="email" name="email" id="email" onChange={handleChange} required className="login__input"/>
        </div>
        <div className="login__input-wrapper">
            <label htmlFor="password" className="login__label">Password:</label>
            <input type="password" name="password" id="password" onChange={handleChange} required className="login__input"/>
        </div>   
        <button className="admin__regular-btn">LOGIN</button> 
    </form>
)
}

export default LoginAdmin