import Menu from "../components/Menu";

const Mode = () => {
    return (
        <>
        <Menu />
        <main className="mode-wrapper">
            <a href="/flags" className="game-btn">FLAGS</a>
            <a href="/capitals" className="game-btn">CAPITALS</a>
        </main>
        </>
    )
}

export default Mode