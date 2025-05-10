import { useAuth } from "../../context/AuthContext";
import AdminMenu from "../../components/AdminMenu";
import { Link } from "react-router-dom";

export default function Admin() {
    const { user } = useAuth();
    return user && user.is_admin ? (
      <>
      <AdminMenu />
      <div className="admin__main-wrapper admin__home">
        <Link to="/countries" className="admin__regular-btn">COUNTRY OPTIONS</Link>
        <Link to="/add-admin" className="admin__regular-btn">ADD ADMIN</Link>
        <Link to="/countries" className="admin__regular-btn">TICKETS <span className="admin__new-tickets"></span></Link>
      </div>
      </>
    ) : (
      <p>Loading...</p>
    );
  }

