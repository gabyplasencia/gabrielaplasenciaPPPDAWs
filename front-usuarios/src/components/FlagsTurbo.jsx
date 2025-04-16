import { useEffect, useState, useCallback } from "react";
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
        {/* <div className="scoreboard">
  <p>✅ Correct: {correctCount}</p>
  <p>❌ Incorrect: {incorrectCount}</p>
</div> */}

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