import { Link } from "react-router-dom";

const AdminMenu = () => {
    return (
      <nav className="admin__menu">
        <li className="admin__menu-li"><Link to="/admin" className="admin__menu-item --mod-home">HOME</Link></li>
        <li className="admin__menu-li"><Link to="/logout" className="admin__menu-item --mod-log-out">LOG OUT</Link></li>
      </nav>
    ) 
}
export default AdminMenu;