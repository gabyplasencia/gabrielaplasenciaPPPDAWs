import CapitalsInfinity from "../../components/CapitalsInfinity";
import { useState } from "react";
import CapitalsTurbo from "../../components/CapitalsTurbo";
import Menu from "../../components/Menu";

const Capitals = () => {
    const [game, setGame] = useState(0); // Default to 0, meaning no game is rendered
    const [showMenu, setShowMenu] = useState(true); // Control visibility of the menu

    const handleStartGame = (mode) => {
        setGame(mode);
        setShowMenu(false); // Hide the menu when a game starts
        const modeWrapper = document.querySelector('.mode');
        modeWrapper.style.display = 'none';
    };

    return (
        <>  
            {showMenu && <Menu />}
            <div className="mode">
                <div className="mode__btn-wrapper">
                    <button className="game-btn mode__btn mode__btn-infinity" onClick={() => handleStartGame(1)}>INFINITY</button>
                    <img src="/assets/icons/infinity-icon.svg" alt="button icon" aria-hidden="true" className="mode__icon mode__icon-infinity"/>
                </div>
                <div className="mode__btn-wrapper">
                    <button className="game-btn mode__btn mode__btn-turbo" onClick={() => handleStartGame(2)}>TURBO</button>       
                    <img src="/assets/icons/clock-icon.svg" alt="button icon" aria-hidden="true" className="mode__icon mode__icon-turbo"/>    
                </div>
            </div>
            {game === 1 && <CapitalsInfinity />}
            {game === 2 && <CapitalsTurbo />}
        </>
    );
}

export default Capitals