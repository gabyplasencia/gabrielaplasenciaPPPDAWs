import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu";
import FinalResultsInfinity from "../../components/FinalResultsInfinity";
import FinalResultsTurbo from "../../components/FinalResultsTurbo";

const Results = () => {
  const location = useLocation();
  const { gameMode, correctAnswers, incorrectAnswers } = location.state || {};

  return (
    <>  
      <Menu />
      {gameMode === 'turbo' ? (
        <FinalResultsTurbo 
          correct={correctAnswers} 
          incorrect={incorrectAnswers} 
        />
      ) : (
        <FinalResultsInfinity 
          correct={correctAnswers} 
          incorrect={incorrectAnswers} 
        />
      )}
    </>
  );
};

export default Results;