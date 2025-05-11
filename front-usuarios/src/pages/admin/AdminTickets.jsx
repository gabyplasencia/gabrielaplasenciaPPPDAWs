import { useEffect, useState } from "react";
import api from "../../api/axios";
import { useAuth } from "../../context/AuthContext";
import AdminMenu from "../../components/AdminMenu";

export default function AdminTickets() {
    const { token, user } = useAuth();
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(false);
    const [closedTickets, setClosedTickets] = useState([]);

  const fetchTickets = async () => {
    setLoading(true);
    try {
      const res = await api.get("/tickets", {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTickets(res.data);
    } catch (err) {
      console.error("❌ Error fetching tickets:", err);
    } finally {
      setLoading(false); // TERMINA EL LOADING
    }
  };

  useEffect(() => {
    fetchTickets();
  }, [token]);

  const updateStatus = async (ticketId, newStatus) => {
    try {
      await api.patch(`/tickets/${ticketId}/status`, { status: newStatus }, {
        headers: { Authorization: `Bearer ${token}` }
      });

      // 🔁 Actualizar localmente en vez de fetch de nuevo
      setTickets((prevTickets) =>
        prevTickets.map(ticket =>
          ticket.id === ticketId ? { ...ticket, status: newStatus, taken_by: user.id } : ticket
        )
      );
    } catch (err) {
      console.error("❌ Error updating ticket:", err);
    }
  };

  useEffect(() => {
    const savedClosed = localStorage.getItem('closedTickets');
    if (savedClosed) {
      setClosedTickets(JSON.parse(savedClosed));
    }
    fetchTickets();
  }, [token]);

  const closeTicketLocally = (ticketId) => {
    setClosedTickets((prev) => {
      const updated = [...prev, ticketId];
      localStorage.setItem('closedTickets', JSON.stringify(updated));
      return updated;
    });
  };

  const getNextStatus = (status) => {
    switch (status) {
      case "open": return "taken";
      case "taken": return "ready";
      case "ready": return "complete";
      default: return null;
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case "open": return "Take";
      case "taken": return "Ready";
      case "ready": return "Complete";
      case "complete": return "Done";
      default: return "Unknown";
    }
  };

  if (loading) {
    return <div className="loading-text --mod-admin">Loading Tickets...</div>;
  }

  return (
    <>
      <AdminMenu />
      <div className="tickets__container">
        {tickets.length === 0 && !loading && (
            <p className="no-tickets">No tickets at the moment.</p>
        )}
        {tickets
        .filter(ticket => !closedTickets.includes(ticket.id))
        .map(ticket => (
          <div className="ticket" key={ticket.id}>
            <h2 className="ticket__header">
              TICKET #<span className="ticket__id">{ticket.id}</span>
            </h2>
            <p className="ticket__description">{ticket.description}</p>
            {ticket.status === "complete" ? (
              <div className="ticket__btn-wrapper">
                <span className={`admin__regular-btn --mod-ticket-btn --mod-${ticket.status}`}>
                  Completed
                </span>
                <button
                  className="admin__regular-btn --mod-ticket-btn --mod-close"
                  onClick={() => closeTicketLocally(ticket.id)}
                >
                  Close
                </button>
              </div>
            ) : ticket.status === "ready" && ticket.taken_by === user.id ? (
              <button
                className={`admin__regular-btn --mod-ticket-btn --mod-${ticket.status}`}
                onClick={() => updateStatus(ticket.id, "complete")}
              >
                Mark as complete
              </button>
            ) : (ticket.status === "taken" || ticket.status === "ready") && ticket.taken_by !== user.id ? (
              <p className={`admin__regular-btn --mod-ticket-btn --mod-${ticket.status}`}>
                Taken
              </p>
            ) : (
              <button
                className={`admin__regular-btn --mod-ticket-btn --mod-${ticket.status}`}
                onClick={() => updateStatus(ticket.id, getNextStatus(ticket.status))}
              >
                {getStatusLabel(ticket.status)}
              </button>
            )}
          </div>
        ))}
      </div>
    </>
  );
}

