import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Login = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login, user } = useAuth();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user && !user.is_admin) {
      navigate("/category");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const res = await api.post("/auth/login", form);
      const token = res.data.access_token;

      const userRes = await api.get("/auth/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const userData = userRes.data;
      login(token, userData);
      navigate("/category");
    } catch (err) {
      console.error(err);
      if (err.response?.data?.error_type === "email_not_verified") {
        setError(err.response.data.message);
      } else if (err.response?.data?.error) {
        setError(err.response.data.error);
      } else {
        setError("Ups there was an error trying to login.");
      } 
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }
  
  return (
      <div className="main-wrapper">
          {error && <div className="error-message">{error}</div>}
          <form action="/" className="form" id="login" onSubmit={handleLogin}>
              <h1 className="form__title">LOGIN</h1>
              <div className="form__field-wrapper">
                  <label htmlFor="email" className="form__label">Email:</label>
                  <input type="email" name="email" id="email" className="form__input" onChange={handleChange} required/>
              </div>
              <div className="form__field-wrapper">
                  <label htmlFor="password" className="form__label">Password:</label>
                  <input type="password" name="password" id="password" className="form__input" onChange={handleChange} required/>
              </div>   
              <button className="regular-btn">LOGIN</button> 
              <div className="login-register__wrapper">
                  <p className="login-register__text">Not register yet?</p>
                  <a className="login-register__link" href="/register">REGISTER</a>
              </div>
          </form>
      </div>
  )
}

export default Login