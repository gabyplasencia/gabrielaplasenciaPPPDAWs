import { useLocation } from "react-router-dom";
import Menu from "../../components/Menu";
import FinalResultsInfinity from "../../components/FinalResultsInfinity";
import FinalResultsTurbo from "../../components/FinalResultsTurbo";

const Results = () => {
  const location = useLocation();
  const { gameMode, correctAnswers, incorrectAnswers, category } = location.state || {};

  return (
    <>  
      <Menu />
      {gameMode === 'turbo' ? (
        <FinalResultsTurbo 
          correct={correctAnswers} 
          incorrect={incorrectAnswers} 
          gameMode={gameMode}
          category={category}
        />
      ) : (
        <FinalResultsInfinity 
          correct={correctAnswers} 
          incorrect={incorrectAnswers} 
          gameMode={gameMode}
          category={category}
        />
      )}
    </>
  );
};

export default Results;