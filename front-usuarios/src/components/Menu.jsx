import { useEffect, useState, useContext, useRef } from "react";
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
    const [customAvatar, setCustomAvatar] = useState(null);
    const [preview, setPreview] = useState("");
    const fileInputRef = useRef(null);
    const [scores, setScores] = useState({});
    const [ticketDescription, setTicketDescription] = useState("");
    const [ticketSent, setTicketSent] = useState(false);

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

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setCustomAvatar(file);
            setSelectedAvatar(""); // Deseleccionar avatar predeterminado
            
            // Crear vista previa
            const reader = new FileReader();
            reader.onloadend = () => {
                setPreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    const selectAvatar = async () => {
        try {
            let avatarData;
            
            if (customAvatar) {
                const formData = new FormData();
                formData.append('avatar', customAvatar);
                
                const response = await api.post(
                    "/modify-avatar",
                    formData,
                    { 
                        headers: { 
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'multipart/form-data'
                        } 
                    }
                );
                avatarData = response.data.avatar;
            } else if (selectedAvatar) {
                const response = await api.post(
                    "/modify-avatar",
                    { avatar: selectedAvatar },
                    { headers: { Authorization: `Bearer ${token}` } }
                );
                avatarData = response.data.avatar;
            } else {
                return;
            }

            const updatedUser = { ...user, avatar: avatarData };
            setUser(updatedUser);
            localStorage.setItem("user", JSON.stringify(updatedUser));
            setActiveModal('main');
            setCustomAvatar(null);
            setPreview("");
        } catch (err) {
            console.error("Error updating avatar:", err);
        }
    };

    const sendTicket = async () => {
        if (!ticketDescription.trim()) return;
        try {
            await api.post('/tickets', { description: ticketDescription }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setTicketSent(true);
            setTicketDescription("");
        } catch (err) {
            console.error("❌ Error al enviar ticket:", err);
        }
    };

    //puntajes
    useEffect(() => {
    const fetchScores = async () => {
        try {
            const res = await api.get('/scores', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            setScores(res.data);
        } catch (err) {
            console.error("❌ Error al cargar scores:", err);
        }
    };
        if (activeModal === 'scores') {
            fetchScores();
        }
    }, [activeModal, token]);


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
    const getAvatarPath = (avatar) => {
        if (!avatar) return '/assets/avatars/kitty.png'; // Avatar por defecto
        
        // Si es un avatar personalizado (viene como 'avatars/filename.ext')
        if (avatar.startsWith('avatars/')) {
            const filename = avatar.replace('avatars/', '');
            return `http://127.0.0.1:8000/storage/avatars/${filename}`;
        }
        
        // Si es un avatar predeterminado
        if (avatars.includes(avatar)) {
            return `/assets/avatars/${avatar}`;
        }
        
        return '/assets/avatars/kitty.png'; // Fallback
    };
    
    const avatarPath = user?.avatar_url || getAvatarPath(user?.avatar);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
        setActiveModal(isMenuOpen ? null : 'main');
    };

    const openAvatarModal = () => {
        setActiveModal('avatar');
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
                    <img className={user?.avatar && !avatars.includes(user.avatar) ? 'avatar__custom-avatar' : ''}  src={avatarPath} alt="profile photo" aria-hidden="true"/>
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
                    <button className="regular-btn" onClick={() => setActiveModal('scores')}>SCORES</button>
                    <button className="regular-btn" onClick={openAvatarModal}>
                        AVATAR
                    </button>
                    <button className="regular-btn" onClick={() => setActiveModal('help')}>HELP</button>
                    <Link className="modal__log-out regular-btn" to="/logout">LOG OUT</Link>
                    <img className="modal__close mode__icon" 
                         src="/assets/icons/close-icon.png" 
                         alt="close icon" 
                         aria-label="close menu" 
                         onClick={toggleMenu}/>
                </div>
              )}

              {activeModal === 'help' && (
                <div className="modal main-wrapper">
                    <h2 className="modal__title">NEED HELP?</h2>
                    <textarea
                    className="form__input --mod-help"
                    placeholder="Describe your issue here..."
                    value={ticketDescription}
                    onChange={(e) => setTicketDescription(e.target.value)}
                    />
                    <button 
                    className="regular-btn"
                    onClick={sendTicket}
                    disabled={!ticketDescription.trim()}
                    >
                    SEND
                    </button>
                    {ticketSent && <p className="success-message">✅ Your ticket has been sent!</p>}
                    <img
                    className="modal__close mode__icon"
                    src="/assets/icons/close-icon.png"
                    alt="close icon"
                    aria-label="close help modal"
                    onClick={() => {
                        setActiveModal('main');
                        setTicketDescription("");
                        setTicketSent(false);
                    }}
                    />
                </div>
                )}

              {activeModal === 'scores' && (
                <div className="modal main-wrapper">
                    <h2 className="modal__title">YOUR SCORES</h2>
                    <div className="game__groups-wrapper">
                    {Object.entries(scores).map(([group, groupScores]) => (
                        <div key={group} className="game__wrapper">
                            <h3 className="game__group">{group.toUpperCase()}</h3>
                            <ul className="game__scores">
                                {groupScores.map((s, i) => (
                                <li key={i} className="game__score">
                                    <span>{i+1}</span>
                                    <p>{group.includes('infinity') ? `${s.score}%` : s.score}</p>
                                </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                    </div>
                    <img
                        className="modal__close mode__icon"
                        src="/assets/icons/close-icon.png"
                        alt="close icon"
                        aria-label="close scores modal"
                        onClick={() => setActiveModal('main')}
                    />
                </div>
                )}

              {activeModal === 'avatar' && (
                <div className="modal main-wrapper avatar">
                    <h2 className="modal__title">AVATAR</h2>
                    <div className="avatar__default">
                    <h3 className="avatar__subtitle">CHOOSE A PET</h3>
                    <div className="avatar__wrapper">
                    {avatars.map((avatar) => {
                            const avatarName = avatar.split('.')[0];
                            return (
                                <div 
                                    key={avatar}
                                    className={`avatar__option avatar__option-${avatarName} ${
                                        selectedAvatar === avatar ? 'selected' : ''
                                    }`}
                                    onClick={() => {
                                        setSelectedAvatar(avatar);
                                        setCustomAvatar(null);
                                        setPreview("");
                                    }}
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
                    </div>
                    <div className="avatar__custom">
                        <h3 className="avatar__subtitle">OR CHOOSE YOUR OWN</h3>
                        <div className="avatar__custom-wrapper">
                            <input 
                                    type="file"
                                    ref={fileInputRef}
                                    onChange={handleFileChange}
                                    accept="image/*"
                                    style={{ display: 'none' }}
                                />
                                <button 
                                    className="regular-btn"
                                    onClick={triggerFileInput}
                                >
                                    Upload file
                                </button>
                                {preview && (
                                    <div className="avatar__option">
                                        <img 
                                            src={preview} 
                                            alt="preview" 
                                            className="avatar__custom-avatar" 
                                        />
                                    </div>
                                )}
                        </div>
                    </div>
                    <button 
                            className="avatar__change-btn regular-btn"
                            onClick={selectAvatar}
                            disabled={!selectedAvatar && !customAvatar}
                        >
                            CHANGE AVATAR
                        </button>
                    <img className="modal__close mode__icon" 
                         src="/assets/icons/close-icon.png" 
                         alt="close icon" 
                         aria-label="close menu" 
                         onClick={() => {
                            setActiveModal('main');
                            setCustomAvatar(null);
                            setPreview("");
                        }}/>
                </div>
              )}
          </section>
        </>
    )
}

export default Menu;