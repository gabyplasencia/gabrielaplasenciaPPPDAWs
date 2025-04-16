import { useEffect, useState, useCallback } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const FlagsInfinity = () => {
  const { token } = useAuth();
  const [countries, setCountries] = useState([]);
  const [currentCountry, setCurrentCountry] = useState(null);
  const [options, setOptions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [isCorrect, setIsCorrect] = useState(null);
  const [correctCount, setCorrectCount] = useState(0);
  const [incorrectCount, setIncorrectCount] = useState(0);
  const [usedCountries, setUsedCountries] = useState([]);
    
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

    // Handle answer selection
    const handleAnswer = (selectedCountry) => {
      setSelectedAnswer(selectedCountry.id);
      
      if (selectedCountry.id === currentCountry.id) {
        setIsCorrect(true);
        setCorrectCount(prev => prev + 1); // increment correct answers
      } else {
        setIsCorrect(false);
        setIncorrectCount(prev => prev + 1); // increment incorrect answers
      }
      
      setTimeout(() => {
        setIsCorrect(null);
        setSelectedAnswer(null);
        generateRound();
      }, 1000);
      
    };

    return (
        <div className="main-wrapper game" id="flags-infinity">
        <div className="scoreboard">
          <p>✅ Correct: {correctCount}</p>
          <p>❌ Incorrect: {incorrectCount}</p>
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
            <svg width="148" height="74" viewBox="0 0 148 74" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="mode__icon mode__icon-infinity">
                <path fillRule="evenodd" clipRule="evenodd" d="M71.8847 26.9777C71.8847 26.9777 92.6777 1.64271 111.215 3.53582C130.496 5.50482 145.425 19.564 144.151 36.6031C142.946 52.7026 128.571 63.0351 110.415 64.9916C92.4827 66.924 72.4241 47.4989 72.4241 47.4989C72.4241 47.4989 58.1283 67.4837 43.3077 70.1148C22.2094 73.8604 3.12515 55.3125 3.1362 36.298C3.14657 18.4589 18.2971 2.79766 38.5314 3.2863C55.1651 3.68798 71.8847 26.9777 71.8847 26.9777ZM107.686 17.4704C94.0127 15.9154 81.567 38.0847 81.567 38.0847C81.567 38.0847 99.0145 53.2672 111.08 50.0754C120.439 47.5995 127.937 42.3809 127.801 33.7395C127.653 24.394 118.215 18.6676 107.686 17.4704ZM21.9424 38.4171C20.4832 28.4359 30.2839 19.2501 41.6792 19.6535C51.7221 20.0089 64.1358 37.7351 64.1358 37.7351C64.1358 37.7351 54.0769 51.7825 44.0673 53.0677C33.4491 54.4311 23.3183 47.8276 21.9424 38.4171Z" fill="#FFDD00"/>
                <path d="M71.8846 26.9777C71.8846 26.9777 92.6777 1.64271 111.215 3.53582C130.496 5.50482 145.425 19.564 144.151 36.6031C142.946 52.7026 128.571 63.0351 110.415 64.9916C92.4827 66.924 72.4241 47.4989 72.4241 47.4989M71.8846 26.9777L81.567 38.0847M71.8846 26.9777C71.8846 26.9777 55.1651 3.68798 38.5314 3.2863C18.2971 2.79766 3.14657 18.4589 3.1362 36.298C3.12515 55.3125 22.2094 73.8604 43.3077 70.1148C58.1283 67.4837 72.4241 47.4989 72.4241 47.4989M72.4241 47.4989L64.1358 37.7351M81.567 38.0847C81.567 38.0847 94.0127 15.9154 107.686 17.4704C118.215 18.6676 127.653 24.394 127.801 33.7395C127.937 42.3809 120.439 47.5995 111.08 50.0754C99.0145 53.2672 81.567 38.0847 81.567 38.0847ZM64.1358 37.7351C64.1358 37.7351 54.0769 51.7825 44.0673 53.0677C33.4491 54.4311 23.3183 47.8276 21.9424 38.4171C20.4832 28.4359 30.2839 19.2501 41.6792 19.6535C51.7221 20.0089 64.1358 37.7351 64.1358 37.7351Z" stroke="black" strokeWidth="6"/>
            </svg>
        </div>
    )
}

export default FlagsInfinity