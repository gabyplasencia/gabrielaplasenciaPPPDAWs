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

    const avatarStyles = {
        "chiken.png": {
            bgColor: "rgb(203, 255, 212)",
            borderColor: "rgb(255, 166, 0)"
        },
        "dog.png": {
            bgColor: "rgb(242, 211, 255)",
            borderColor: "rgb(255, 255, 0)"
        },
        "elephan.png": {
            bgColor: "rgb(225, 255, 173)",
            borderColor: "rgb(231, 102, 231)"
        },
        "panda.png": {
            bgColor: "rgb(200, 232, 255)",
            borderColor: "rgb(43, 214, 43)"
        },
        "frog.png": {
            bgColor: "rgb(173, 212, 255)",
            borderColor: "rgb(255, 234, 0)"
        },
        "kitty.png": {
            bgColor: "rgb(255, 214, 214)",
            borderColor: "rgb(255, 98, 0)"
        },
        "lion.png": {
            bgColor: "rgb(172, 199, 172)",
            borderColor: "rgb(192, 0, 150)"
        },
        "mouse.png": {
            bgColor: "rgb(254, 247, 173)",
            borderColor: "rgb(23, 213, 48)"
        }
    };

    useEffect(() => {
        if (selectedAvatar && avatarStyles[selectedAvatar]) {
            const { bgColor, borderColor } = avatarStyles[selectedAvatar];
            document.documentElement.style.setProperty('--avatar-bg-color', bgColor);
            document.documentElement.style.setProperty('--avatar-border-color', borderColor);
        }
    }, [selectedAvatar]);

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
          <button 
                className="menu__btn"
                aria-label="open menu"
                onClick={toggleMenu}
                aria-expanded={isMenuOpen}
            >
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
              {avatars.map((avatar) => {
                  const avatarName = avatar.split('.')[0];
                  return (
                      <div 
                          key={avatar}
                          className={`avatar__option avatar__option-${avatarName} ${
                              selectedAvatar === avatar ? 'selected' : ''
                          }`}
                          onClick={() => setSelectedAvatar(avatar)}
                          role="button"
                          tabIndex="0"
                          aria-label={`Select ${avatarName} avatar`}
                          style={{
                              backgroundColor: avatarStyles[avatar]?.bgColor || 'white'
                          }}
                      >
                          <img 
                              src={`/assets/avatars/${avatar}`} 
                              alt={avatarName} 
                              aria-hidden="true"
                          />
                      </div>
                  );
              })}
          </div>
                    <button 
                        className="avatar__change-btn regular-btn"
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