import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import AdminMenu from "../../components/AdminMenu";

export default function AdminCountries() {
  const { token } = useAuth();
  const [countries, setCountries] = useState([]);
  const [form, setForm] = useState({ name: "", capital: "", iso2: "" });
  const [searchTerm, setSearchTerm] = useState("");
  const [hasSearched, setHasSearched] = useState(false);
  const [editingCountry, setEditingCountry] = useState(null);
  const [editForm, setEditForm] = useState({ capital: "", iso2: "" });

  const handleEditClick = (country) => {
    setEditingCountry(country);
    setEditForm({
      capital: country.capital || "",
      iso2: country.iso2
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      await api.put(`/countries/${editingCountry.id}`, editForm, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setEditingCountry(null);
      handleSearch(); // Refresh the current search
    } catch (err) {
      alert("Error modifying country");
      console.error(err);
    }
  };

  const handleCancelEdit = () => {
    setEditingCountry(null);
  };
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
      console.error("Error getting country", err);
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
    if (confirm("Are you sure you want to permanently delete this country?")) {
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
      alert("Error adding country");
      console.error(err);
    }
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <>
      <AdminMenu />
      <div className="admin__main-wrapper admin__countries">
        <div className="admin__countries-search-wrapper">
          <label htmlFor="search" className="admin__countries-label">SEARCH COUNTRY</label>
          <div className="admin__countries-input-wrapper">
            <input
              type="text"
              placeholder="Search country..."
              value={searchTerm}
              onChange={handleSearchChange} 
              className="admin__countries-input"
            />
            <button 
              onClick={handleSearch}
              disabled={!searchTerm.trim()}
              className="admin__regular-btn --mod-country-btn"
            >
              Search
            </button>
          </div>
        </div>

        <form onSubmit={handleAdd} className="admin__countries-add-wrapper">
          <h3 className="admin__countries-label">ADD COUNTRY</h3>
          <div className="admin__countries-input-wrapper">
            <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="admin__countries-input"/>
            <input name="capital" placeholder="Capital" value={form.capital} onChange={handleChange} className="admin__countries-input"/>
            <input name="iso2" placeholder="ISO2 (ex. AR)" value={form.iso2} onChange={handleChange} className="admin__countries-input"/>
            <button type="submit" className="admin__regular-btn --mod-country-btn">Add country</button>
          </div>
        </form>

        {hasSearched ? (
          <ul className="admin__countries-search-results">
            {countries.length > 0 ? (
              countries.map((c) => (
                <li key={c.id}>
                  {editingCountry?.id === c.id ? (
                    <form onSubmit={handleUpdate} className="admin__countries-search-result">
                      <div className="admin__countries-search-result-wrapper">
                        <span className="admin__countries-search-name">{c.name}</span>
                        <input
                          name="capital"
                          placeholder="Capital"
                          value={editForm.capital}
                          onChange={handleEditChange}
                          className="admin__countries-input"
                        />
                        <input
                          name="iso2"
                          placeholder="ISO2"
                          value={editForm.iso2}
                          onChange={handleEditChange}
                          className="admin__countries-input"
                        />
                      </div>
                      <div className="admin__countries-search-result__btn-wrapper">
                        <button type="submit" className="admin__regular-btn --mod-result-save --mod-country-btn">Save</button>
                        <button 
                          type="button" 
                          onClick={handleCancelEdit}
                          className="admin__regular-btn --mod-result-cancel --mod-country-btn"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  ) : (
                    <div className="admin__countries-search-result">
                      <div className="admin__countries-search-result-wrapper">
                        <img src={c.flag} alt={c.name} className="admin__countries-search-flag"/>
                        <span className="admin__countries-search-name">{c.name}</span>
                        <span>({c.iso2}) </span>
                        <span>- {c.capital}</span>
                      </div>
                      <div className="admin__countries-search-result__btn-wrapper">
                        <button 
                          onClick={() => handleEditClick(c)}
                          className="admin__regular-btn --mod-modify-country --mod-country-btn"
                        >
                          Modify
                        </button>
                        <button 
                          onClick={() => handleDelete(c.id)}
                          className="admin__regular-btn --mod-delete-country --mod-country-btn"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  )}
                </li>
              ))
            ) : (
              <p>No country matches the search</p>
            )}
          </ul>
        ) : (
          <p className="admin__countries-search-results">Enter a search term to see countries</p>
        )}
      </div>
    </>
  );
}
