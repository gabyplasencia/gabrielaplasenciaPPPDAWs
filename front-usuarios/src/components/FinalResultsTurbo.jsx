import PropTypes from 'prop-types';

const FinalResultsTurbo = ({ correct, incorrect }) => {
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
                <button className='regular-bnt results__buttons' onClick={() => window.location.href = '/category'}>HOME</button>
                <button className='regular-bnt results__buttons results__buttons-retry'>
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
};
  
  export default FinalResultsTurbo;