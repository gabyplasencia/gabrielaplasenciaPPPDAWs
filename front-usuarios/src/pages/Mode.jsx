import { useEffect } from "react";

const Mode = () => {
    
    useEffect(() => {
        document.documentElement.style.setProperty('--menu-bg-color', 'rgb(255, 211, 211)');
        document.documentElement.style.setProperty('--menu-border-color', 'rgb(94, 12, 12)');
    }, []);

    return (
        <>
        <section className="menu">
            <button className="menu__btn" aria-label="open menu">
            {/* cambiar el src a uno que coincida con el avatar del ususario */}
                <img src="/avatars/kitty.png" alt="profile photo" aria-hidden="true"/>
            </button>
            <h4>MENU</h4>
        </section>

        <main className="mode-wrapper">
            <a href="/flags" className="game-btn">FLAGS</a>
            <a href="/capitals" className="game-btn">CAPITALS</a>
        </main>
        </>
    )
}

export default Mode