import PropTypes from 'prop-types';

const FinalResultsTurbo = ({ correct, incorrect }) => {
    return (
      <div className="results-container">
        <h2>Turbo Mode Results</h2>
        <div className="stats">
          <div className="correct-stat">
            ✅ Correct: {correct}
          </div>
          <div className="incorrect-stat">
            ❌ Incorrect: {incorrect}
          </div>
        </div>
      </div>
    );
  };

FinalResultsTurbo.propTypes = {
  correct: PropTypes.number.isRequired,
  incorrect: PropTypes.number.isRequired,
};
  
  export default FinalResultsTurbo;