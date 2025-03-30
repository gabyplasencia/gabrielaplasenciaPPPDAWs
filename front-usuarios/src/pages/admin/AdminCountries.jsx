import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";

export default function AdminCountries() {
  const { token } = useAuth();
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ name: "", capital: "", iso2: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const fetchCountries = async (search = "") => {
    try {
      const res = await api.get(`/countries`, {
        params: { search },
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setCountries(res.data);
      setHasSearched(true);
    } catch (err) {
      console.error("Error al obtener países", err);
    }
  };

  const handleSearch = () => {
    if (searchTerm.trim() !== "") {
      fetchCountries(searchTerm);
    } else {
      setCountries([]);
      setHasSearched(false);
    }
  };

  useEffect(() => {
    // Add a small delay to avoid making too many requests while typing
    const timer = setTimeout(() => {
      handleSearch();
    }, 300);

    return () => clearTimeout(timer);
  }, [searchTerm]);

  const handleDelete = async (id) => {
    if (confirm("¿Seguro que deseas eliminar este país?")) {
      await api.delete(`/countries/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      handleSearch(); // Refresh with current search
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
      handleSearch(); // Refresh with current search
    } catch (err) {
      alert("Error al agregar país.");
      console.error(err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Administrar Paises</h1>

      <div style={styles.searchContainer}>
        <input
          type="text"
          placeholder="Buscar país..."
          value={searchTerm}
          onChange={handleSearchChange}
          style={styles.searchInput}
        />
        <button 
          onClick={handleSearch}
          style={styles.searchButton}
          disabled={!searchTerm.trim()}
        >
          Buscar
        </button>
      </div>

      <form onSubmit={handleAdd} style={styles.form}>
      <h2>AGREGAR PAIS</h2>
        <input name="name" placeholder="Nombre" value={form.name} onChange={handleChange} style={styles.input} />
        <input name="capital" placeholder="Capital" value={form.capital} onChange={handleChange} style={styles.input} />
        <input name="iso2" placeholder="ISO2 (ej. AR)" value={form.iso2} onChange={handleChange} style={styles.input} />
        <button type="submit" style={styles.button}>Agregar país</button>
      </form>

      {hasSearched ? (
        <ul style={styles.list}>
          {countries.length > 0 ? (
            countries.map((c) => (
              <li key={c.id} style={styles.listItem}>
                <img src={c.flag} alt={c.name} width="24" style={styles.flag} />
                <span>{c.name} ({c.iso2}) - {c.capital}</span>
                <button onClick={() => handleDelete(c.id)} style={styles.deleteButton}>Eliminar</button>
              </li>
            ))
          ) : (
            <p style={styles.noResults}>No se encontraron países</p>
          )}
        </ul>
      ) : (
        <p style={styles.initialMessage}>Ingrese un término de búsqueda para ver países</p>
      )}
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
    padding: 0,
    height: "10rem",
    overflowY: "scroll",
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
