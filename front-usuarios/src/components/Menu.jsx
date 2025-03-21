import { useEffect } from "react";

const Menu = () => {
    
    useEffect(() => {
        document.documentElement.style.setProperty('--menu-bg-color', 'rgb(255, 211, 211)');
        document.documentElement.style.setProperty('--menu-border-color', 'rgb(94, 12, 12)');
    }, []);

    return (
        <section className="menu">
            <button className="menu__btn" aria-label="open menu">
            {/* cambiar el src a uno que coincida con el avatar del ususario */}
                <img src="/assets/avatars/kitty.png" alt="profile photo" aria-hidden="true"/>
            </button>
            <h4>MENU</h4>
        </section>
    )
}

export default Menu
