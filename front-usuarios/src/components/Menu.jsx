import { useEffect, useState, useContext } from "react";
import { useAuth } from "../context/AuthContext";
import { Link } from "react-router-dom";
import { AudioContext } from "../context/AudioContext";
import api from "../api/axios";

const Menu = () => {
    const { user, setUser, token } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isPlaying, toggleMusic } = useContext(AudioContext);
    const [activeModal, setActiveModal] = useState(null);
    const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || ""); // Track selected avatar

    const avatars = [
        "chiken.png",
        "dog.png", 
        "elephan.png",
        "panda.png",
        "frog.png",
        "kitty.png",
        "lion.png",
        "mouse.png"
    ];

    useEffect(() => {
      document.documentElement.style.setProperty('--menu-bg-color', 'rgb(255, 211, 211)');
      document.documentElement.style.setProperty('--menu-border-color', 'rgb(94, 12, 12)');
    }, []);

    // Update selectedAvatar when user changes or modal opens
    useEffect(() => {
        if (activeModal === 'avatar') {
            setSelectedAvatar(user?.avatar || "");
        }
    }, [activeModal, user?.avatar]);

    if (!user) return null;
    const avatarPath = "/assets/avatars/" + user.avatar;

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveModal(isMenuOpen ? null : 'main');
    };

    const openAvatarModal = () => {
        setActiveModal('avatar');
    };

    const selectAvatar = async () => {
        if (!selectedAvatar || selectedAvatar === user.avatar) {
            setActiveModal('main');
            return;
        }
        
        try {
            await api.post(
                "/modify-avatar",
                { avatar: selectedAvatar },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedUser = { ...user, avatar: selectedAvatar };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setActiveModal('main');
        } catch (err) {
            console.error("Error updating avatar:", err);
        }
    };

    return (
        <>
          {isMenuOpen && (
              <div className="overlay" onClick={toggleMenu} aria-hidden="true" />
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
                    aria-hidden={!isMenuOpen}>
              {activeModal === 'main' && (
                <div className="modal main-wrapper">
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
                    <button className="regular-btn" onClick={openAvatarModal}>
                        AVATAR
                    </button>
                    <button className="regular-btn">HELP</button>
                    <Link className="modal__log-out regular-btn" to="/logout">LOG OUT</Link>
                    <img className="modal__close mode__icon" 
                         src="/assets/icons/close-icon.png" 
                         alt="close icon" 
                         aria-label="close menu" 
                         onClick={toggleMenu}/>
                </div>
              )}

              {activeModal === 'avatar' && (
                <div className="modal main-wrapper avatar">
                    <h2 className="modal__title">AVATAR</h2>
                    <div className="avatar__wrapper">
                        {avatars.map((avatar) => (
                            <div 
                                key={avatar}
                                className={`avatar__option ${selectedAvatar === avatar ? 'selected' : ''}`}
                                onClick={() => setSelectedAvatar(avatar)}
                                role="button"
                                tabIndex="0"
                                aria-label={`Select ${avatar.split('.')[0]} avatar`}
                            >
                                <img 
                                    src={`/assets/avatars/${avatar}`} 
                                    alt={avatar.split('.')[0]} 
                                    aria-hidden="true"
                                />
                            </div>
                        ))}
                    </div>
                    <button 
                        className="avatar__change-btn"
                        onClick={selectAvatar}
                        disabled={selectedAvatar === user.avatar}
                    >
                        CHANGE AVATAR
                    </button>
                    <img className="modal__close mode__icon" 
                         src="/assets/icons/close-icon.png" 
                         alt="close icon" 
                         aria-label="close menu" 
                         onClick={() => setActiveModal('main')}/>
                </div>
              )}
          </section>
        </>
    )
}

export default Menu;