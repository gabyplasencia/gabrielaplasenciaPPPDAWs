import { useEffect } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";

const Menu = () => {
    const { user } = useAuth();

    useEffect(() => {
        document.documentElement.style.setProperty('--menu-bg-color', 'rgb(255, 211, 211)');
        document.documentElement.style.setProperty('--menu-border-color', 'rgb(94, 12, 12)');
    }, []);

    if (!user) return null;
    const avatarPath = "/assets/avatars/" + user.avatar;

    return (
        <>
          <section className="menu">
          <button className="menu__btn" aria-label="open menu">
            <img src={avatarPath} alt="profile photo" aria-hidden="true"/>
          </button>
          <h4>MENU</h4>
          <Link to="/logout">Cerrar sesión</Link>
        </section>
        </>

    )
}

export default Menu