import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: "" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();

  // Si ya está logueado, redirigir
  useEffect(() => {
    if (user) {
      navigate(user.is_admin ? "/admin" : "/dashboard");
    }
  }, [user, navigate]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError(""); 
    try {
      await api.post("/auth/register", form);
      alert("Register successful. Please log in.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Ups there was an error trying to register.");
    }
  };

  return (
      <main className="main-wrapper">
        {error && <div className="error-message">{error}</div>}
        <form action="/" className="form" id="register" onSubmit={handleRegister}>
            <h1 className="form__title">REGISTER</h1>
            <div className="form__field-wrapper">
                <label htmlFor="email" className="form__label">Email:</label>
                <input type="email" name="email" id="email" className="form__input" required onChange={handleChange}/>
            </div>
            <div className="form__field-wrapper">
                <label htmlFor="name" className="form__label">Username:</label>
                <input type="name" name="name" id="name" className="form__input" required onChange={handleChange}/>
            </div>
            <div className="form__field-wrapper">
                <label htmlFor="password" className="form__label">Password:</label>
                <input type="password" name="password" id="password" className="form__input" required onChange={handleChange}/>
            </div>   
            <button className="regular-bnt">REGISTER</button> 
        </form>
      </main>
  )
}

export default Register
