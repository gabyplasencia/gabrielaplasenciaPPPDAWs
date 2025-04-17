import PropTypes from "prop-types";

const FinalResultsInfinity = ({ correct, incorrect }) => {
    return (
      <div className="main-wrapper results">
            <h2 className='results__title'>RESULTS</h2>
            <div className="results__stats">
                <p className='results__text results__text-infinity'>{correct} CORRECT ANSWERS OUT OF {correct+incorrect}</p>
                <span className='results__stats-correct'>{Math.round(correct / (correct + incorrect) * 100)}%</span> 
            </div>
            <div className="results__buttons-wrapper">
                <button className='regular-bnt results__buttons' onClick={() => window.location.href = '/category'}>HOME</button>
                <button className='regular-bnt results__buttons results__buttons-retry'>
                    <span>PLAY<br></br> AGAIN</span>
                    <img className='results__retry-icon' src="/assets/icons/retry-icon.svg" alt="retry icon" aria-hidden="true"/>
                </button>
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