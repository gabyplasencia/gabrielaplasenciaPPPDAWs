import PropTypes from "prop-types";

const FinalResultsInfinity = ({ correct, incorrect }) => {
    return (
      <div className="results-container">
        <h2>Infinity Mode Results</h2>
        <div className="stats">
          <div className="correct-stat">
            ✅ Correct: {correct}
          </div>
          <div className="incorrect-stat">
            ❌ Incorrect: {incorrect}
          </div>
          <div className="accuracy">
            🎯 Accuracy: {Math.round(correct / (correct + incorrect) * 100)}%
          </div>
        </div>
      </div>
    );
};

// Add prop-types validation
FinalResultsInfinity.propTypes = {
    correct: PropTypes.number.isRequired, // 'correct' must be a number and is required
    incorrect: PropTypes.number.isRequired, // 'incorrect' must be a number and is required
};

export default FinalResultsInfinity;