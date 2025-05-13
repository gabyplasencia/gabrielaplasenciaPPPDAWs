import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

const Register = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", avatar: "kitty.png" });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      await api.post("/auth/register", form);
      alert("Register successful. Please verify your email.");
      navigate("/");
    } catch (err) {
      console.error(err);
      setError("Ups there was an error trying to register.");
    }finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading-text">Loading...</div>;
  }
  
  return (
      <div className="main-wrapper">
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
            <button className="regular-btn">REGISTER</button> 
        </form>
      </div>
  )
}

export default Register
