import { useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import AdminMenu from "../../components/AdminMenu";

const AddAdmin = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { token } = useAuth();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const res = await api.post(
        "/register-admin",
        form,
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );
      setSuccess(res.data.message);
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      if (err.response?.data?.errors) {
        const firstError = Object.values(err.response.data.errors)[0][0];
        setError(firstError);
      } else {
        setError("Error creating admin.");
      }
    }
  };

  return (
    <>
        <AdminMenu />
        <div className="login admin__main-wrapper">
            {error && <div className="error-message">{error}</div>}
            {success && <div className="success-message">{success}</div>}

            <form className="form" onSubmit={handleSubmit}>
                <h2 className="admin__title">NEW ADMIN</h2>
                <div className="login__input-wrapper">
                    <label htmlFor="email" className="admin__label">Email:</label>
                    <input
                        type="email"
                        name="email"
                        id="email"
                        required
                        className="login__input"
                        value={form.email}
                        onChange={handleChange}
                    />
                </div>
                <div className="login__input-wrapper">
                    <label htmlFor="name" className="admin__label">Username:</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        required
                        className="login__input"
                        value={form.name}
                        onChange={handleChange}
                    />
                </div>
                <div className="login__input-wrapper">
                    <label htmlFor="password" className="admin__label">Password:</label>
                    <input
                        type="password"
                        name="password"
                        id="password"
                        required
                        className="login__input"
                        value={form.password}
                        onChange={handleChange}
                    />
                </div>
                <button className="admin__regular-btn login__btn">REGISTER</button>
            </form>
        </div>
    </>
  );
};

export default AddAdmin;
