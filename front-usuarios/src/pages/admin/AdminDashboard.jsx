import { useAuth } from "../../context/AuthContext";
import AdminMenu from "../../components/AdminMenu";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import api from "../../api/axios";

export default function Admin() {
  const { user, token } = useAuth();
  const [hasOpenTickets, setHasOpenTickets] = useState(false);

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await api.get("/tickets", {
          headers: { Authorization: `Bearer ${token}` }
        });

        const hasOpen = res.data.some(ticket => ticket.status === "open");
        setHasOpenTickets(hasOpen);
      } catch (err) {
        console.error("❌ Error fetching tickets:", err);
      }
    };

    if (user?.is_admin) {
      fetchTickets();
    }
  }, [token, user]);

  return user && user.is_admin ? (
    <>
      <AdminMenu />
      <div className="admin__main-wrapper admin__home">
        <Link to="/countries" className="admin__regular-btn">COUNTRY OPTIONS</Link>
        <Link to="/add-admin" className="admin__regular-btn">ADD ADMIN</Link>
        <Link to="/tickets" className="admin__regular-btn --mod-ticket-btn-relative">
          TICKETS {hasOpenTickets && <span className="admin__new-tickets">!</span>}
        </Link>
      </div>
    </>
  ) : (
    <p className="loading-text --mod-admin">Loading...</p>
  );
}


