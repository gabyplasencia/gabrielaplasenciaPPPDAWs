import { useEffect, useState, useCallback, useRef } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const FlagsTurbo = () => {
  const { token } = useAuth();
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [usedCountries, setUsedCountries] = useState([]);
  const [timeLeft, setTimeLeft] = useState(45); // 45 seconds initial time
  const progressRef = useRef(null);
  const [showBonus, setShowBonus] = useState(false);
  const [randomStyle, setRandomStyle] = useState({});
  const bonusRef = useRef(null);
  const navigate = useNavigate();
    
    useEffect(() => {
        const fetchCountries = async () => {
          try {
            const res = await api.get("/countries/all", {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            console.log("📦 Datos recibidos:", res.data); // <- esto nos dice si realmente llega
            setCountries(res.data);
          } catch (err) {
            console.error("❌ Error al cargar países:", err);
          }
        };
      
        fetchCountries();
      }, [token]);

            // Game end handler
      const endGame = useCallback(() => {
        navigate('/results', {
          state: {
            gameMode: 'turbo',
            correctAnswers: correctCount,
            incorrectAnswers: incorrectCount
          }
        });
      }, [correctCount, incorrectCount, navigate]);
      
          // Generate new round of questions
      const generateRound = useCallback(() => {
          if (countries.length === 0) return;
          
          // Filter out already used countries
          const availableCountries = countries.filter(
              country => !usedCountries.includes(country.id)
          );
          
          if (availableCountries.length === 0) {
              // Reset if all countries have been used
              setUsedCountries([]);
              generateRound();
              return;
          }
          
          // Select random correct country
          const correctCountry = availableCountries[
              Math.floor(Math.random() * availableCountries.length)
          ];
          
          // Select 3 random incorrect countries
          const incorrectCountries = countries
              .filter(country => country.id !== correctCountry.id)
              .sort(() => 0.5 - Math.random())
              .slice(0, 3);
          
          // Combine and shuffle options
          const allOptions = [correctCountry, ...incorrectCountries]
              .sort(() => 0.5 - Math.random());
          
          setCurrentCountry(correctCountry);
          setOptions(allOptions);
          setUsedCountries(prev => [...prev, correctCountry.id]);
      }, [countries, usedCountries]);

    // Start new round when countries load or when needed
    useEffect(() => {
        if (countries.length > 0 && (usedCountries.length === 0 || !currentCountry)) {
            generateRound();
        }
    }, [countries, generateRound, currentCountry, usedCountries]);

    useEffect(() => {
      if (timeLeft <= 0) {
        // Game over logic
        endGame();
        return;
      }
  
      const timer = setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
  
      return () => clearInterval(timer);
    }, [timeLeft, endGame]);
  
    // Update progress bar
    useEffect(() => {
      if (progressRef.current) {
        const percentage = (timeLeft / 45) * 100;
        progressRef.current.style.backgroundPosition = `${percentage}%`;
      }
    }, [timeLeft]);

    // Handle answer selection
    const handleAnswer = (selectedCountry) => {
      setSelectedAnswer(selectedCountry.id);
      
      if (selectedCountry.id === currentCountry.id) {
        setIsCorrect(true);
        setCorrectCount(prev => prev + 1);
        setTimeLeft(prev => Math.min(45, prev + 1)); // Add 1 second, max 45

            // Generate random position and rotation
        setRandomStyle({
          right: `${4 + Math.random() * 4}rem`,  // Random between 4-8rem
          top: `${0.5 + Math.random() * 1}rem`,   // Random between 0.5-1.5rem
          transform: `rotate(${-15 + Math.random() * 30}deg)`, // Random between -15 to +15 degrees
          opacity: 0 // Start invisible
        });
        
        setShowBonus(true);
        setTimeout(() => setShowBonus(false), 2000);

        setTimeout(() => {
          setIsCorrect(null);
          setSelectedAnswer(null);
          generateRound();
        }, 1000);
      } else {
        setIsCorrect(false);
        setIncorrectCount(prev => prev + 1);
        setTimeout(() => {
          setIsCorrect(null);
          setSelectedAnswer(null);
          generateRound();
        }, 2000);
      }
    };

    return (
        <div className="main-wrapper game" id="flags-infinity">
            <div 
              ref={progressRef}
              className="timebar" 
              style={{ '--time-left': `${(timeLeft / 45) * 100}%` }}>
                {showBonus && (
                  <span 
                    ref={bonusRef}
                    className={`plus-second ${showBonus ? 'animation' : ''}`}
                    style={randomStyle}
                  >
                    +1 sec
                  </span>
                )}
            </div>
            {currentCountry && (
                <>
                    <h1 className="game__country">{currentCountry.name}</h1>
                    <div className="game__answer-wrapper">
                        {options.map((country, index) => (
                            <div 
                                key={index}
                                className={`game__answer ${
                                selectedAnswer === country.id
                                  ? isCorrect 
                                    ? 'correct' 
                                    : 'wrong'
                                  : selectedAnswer && currentCountry.id === country.id 
                                    ? 'correct' 
                                    : ''
                              }`}
                              onClick={() => !selectedAnswer && handleAnswer(country)}
                                style={{ height: 'fit-content', width: 'fit-content'}}
                            >
                               <img 
                                src={country.flag} 
                                alt={`Flag of ${country.name}`} 
                                className="game__answer-flag"
                              />
                            </div>
                        ))}
                    </div>
                </>
            )}
            <img src="/assets/icons/clock-icon.svg" alt="button icon" aria-hidden="true" className="mode__icon mode__icon-turbo"/>  
        </div>
    )
}

export default FlagsTurbo