import PropTypes from 'prop-types';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const FinalResultsTurbo = ({ correct, incorrect, gameMode, category }) => {
    const navigate = useNavigate();
    const { token } = useAuth();
    const hasSubmitted = useRef(false);

    useEffect(() => {
        const saveScore = async () => {
            try {
                const response = await api.post('/scores', {
                    mode: gameMode,
                    category,
                    score: correct,
                }, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                console.log("✅ Puntaje guardado:", response.data);
            } catch (error) {
                console.error("❌ Error al guardar el puntaje:", error);
            }
        };

        if (token && !hasSubmitted.current) {
            hasSubmitted.current = true;
            saveScore();
        }
    }, [correct, gameMode, category, token]);

  
    const handlePlayAgain = () => {
      navigate(`/${category}`, {
        state: { 
          autoStart: true,
          mode: gameMode === 'turbo' ? 2 : 1 
        }
      });
    };

    return (
        <div className="main-wrapper results">
            <h2 className='results__title'>RESULTS</h2>
            <div className="results__stats">
                <div className="stats-wrapper">
                    <p className='results__text'>CORRECT</p>
                    <span className='results__stats-correct'>{correct}</span> 
                </div>
                <div className="stats-wrapper">
                    <p className='results__text'>WRONG</p>
                    <span className='results__stats-wrong'>{incorrect}</span> 
                </div>
            </div>
            <div className="results__buttons-wrapper">
                <button className='regular-btn results__buttons' onClick={() => window.location.href = '/category'}>HOME</button>
                <button className='regular-btn results__buttons results__buttons-retry' onClick={handlePlayAgain}>
                    <span>PLAY<br></br> AGAIN</span>
                    <img className='results__retry-icon' src="/assets/icons/retry-icon.svg" alt="retry icon" aria-hidden="true"/>
                </button>
            </div>
        </div>
    );
  };

FinalResultsTurbo.propTypes = {
  correct: PropTypes.number.isRequired,
  incorrect: PropTypes.number.isRequired,
  gameMode: PropTypes.string.isRequired, 
  category: PropTypes.string.isRequired, 
};
  
  export default FinalResultsTurbo;