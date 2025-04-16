import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu";
import FinalResultsInfinity from "../../FinalResultsInfinity";
import FinalResultsTurbo from "../../FinalResultsTurbo";

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