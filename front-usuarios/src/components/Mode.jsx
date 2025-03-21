const Mode = () => {
    return (
        <main className="mode">
            <div className="mode__btn-wrapper">
                <a href="/flags/infinity" className="game-btn mode__btn mode__btn-infinity">INFINITY</a>
                <img src="/assets/icons/infinity-icon.svg" alt="button icon" aria-hidden="true" className="mode__icon"/>
            </div>
            <div className="mode__btn-wrapper">
                <a href="/capitals/turbo" className="game-btn mode__btn mode__btn-turbo">TURBO</a>       
                <img src="/assets/icons/clock-icon.svg" alt="button icon" aria-hidden="true" className="mode__icon"/>    
            </div>
        </main>
    )
}

export default Mode