import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminCountries() {
  const { token } = useAuth();
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ name: "", capital: "", iso2: "" });
  const [page, setPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const fetchCountries = async (currentPage = 1) => {
    try {
      const res = await api.get(`/countries?page=${currentPage}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCountries(res.data.data);
      setLastPage(res.data.last_page);
      setPage(currentPage);
    } catch (err) {
      console.error("Error al obtener países", err);
    }
  };

  useEffect(() => {
    fetchCountries();
  }, []);

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este país?")) {
      await api.delete(`/countries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      fetchCountries(page);
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      await api.post("/countries", form, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setForm({ name: "", capital: "", iso2: "" });
      fetchCountries(page);
    } catch (err) {
      alert("Error al agregar país.");
      console.error(err);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= lastPage) {
      fetchCountries(newPage);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.heading}>Admin - Países</h2>

      <form onSubmit={handleAdd} style={styles.form}>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} style={styles.input} />
        <input name="capital" placeholder="Capital" value={form.capital} onChange={handleChange} style={styles.input} />
        <input name="iso2" placeholder="ISO2 (ej. AR)" value={form.iso2} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Agregar país</button>
      </form>

      <ul style={styles.list}>
        {countries.map((c) => (
          <li key={c.id} style={styles.listItem}>
            <img src={c.flag} alt={c.name} width="24" style={styles.flag} />
            <span>{c.name} ({c.iso2}) - {c.capital}</span>
            <button onClick={() => handleDelete(c.id)} style={styles.deleteButton}>Eliminar</button>
          </li>
        ))}
      </ul>

      <div style={styles.pagination}>
        <button onClick={() => handlePageChange(page - 1)} disabled={page === 1}>← Anterior</button>
        <span>Página {page} de {lastPage}</span>
        <button onClick={() => handlePageChange(page + 1)} disabled={page === lastPage}>Siguiente →</button>
      </div>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: "700px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "sans-serif"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  form: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px",
    flexWrap: "wrap"
  },
  input: {
    padding: "8px",
    flex: "1 1 150px"
  },
  button: {
    padding: "8px 16px",
    backgroundColor: "#4CAF50",
    color: "white",
    border: "none",
    cursor: "pointer"
  },
  list: {
    listStyle: "none",
    padding: 0
  },
  listItem: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "8px 0",
    borderBottom: "1px solid #ccc"
  },
  flag: {
    marginRight: "10px"
  },
  deleteButton: {
    backgroundColor: "#e74c3c",
    color: "white",
    border: "none",
    padding: "6px 12px",
    cursor: "pointer"
  },
  pagination: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "20px"
  }
};
