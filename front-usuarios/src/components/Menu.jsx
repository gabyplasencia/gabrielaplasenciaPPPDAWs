import { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { AudioContext } from "../context/AudioContext";

const Menu = () => {
    const { user } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isPlaying, toggleMusic } = useContext(AudioContext);

    useEffect(() => {
      document.documentElement.style.setProperty('--menu-bg-color', 'rgb(255, 211, 211)');
      document.documentElement.style.setProperty('--menu-border-color', 'rgb(94, 12, 12)');
  }, []);

    if (!user) return null;
    const avatarPath = "/assets/avatars/" + user.avatar;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    return (
        <>
          {isMenuOpen && (
              <div 
                className="overlay"
                onClick={toggleMenu}
                aria-hidden="true"
              />
          )}
          <section className="menu">
              <button className="menu__btn"
                      aria-label="open menu"
                      onClick={toggleMenu}
                      aria-expanded={isMenuOpen}>
                  <img src={avatarPath} alt="profile photo" aria-hidden="true"/>
              </button>
              <h4>MENU</h4>
          </section>
          <section className={`modal__container ${isMenuOpen ? 'isOpen' : ''}`}
                    aria-hidden={!isMenuOpen}
          > 
              <div className="modal main-wrapper ">
                  <h2 className="modal__title">MENU</h2>
                  <div className="modal__music-wrapper">
                      <p className="modal__music-text">MUSIC</p>
                      <button className="regular-btn modal__music-btn"                         
                        onClick={toggleMusic}
                        aria-label={isPlaying ? "Turn off music" : "Turn on music"}>
                        {isPlaying ? 'OFF' : 'ON'}
                        </button>
                  </div>
                  <button className="regular-btn">SCORES</button>
                  <button className="regular-btn">AVATAR</button>
                  <button className="regular-btn">HELP</button>
                  <Link className="modal__log-out regular-btn" to="/logout">LOG OUT</Link>
                  <img className="modal__close mode__icon" src="/assets/icons/close-icon.png" alt="close icon" aria-label="close menu" onClick={toggleMenu}/>
              </div>
              
          </section>
        </>

    )
}

export default Menu