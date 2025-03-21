import Menu from "../components/Menu";

const Category = () => {
    return (
        <>
        <Menu />
        <main className="category">
            <a href="/flags" className="game-btn">FLAGS</a>
            <a href="/capitals" className="game-btn">CAPITALS</a>
        </main>
        </>
    )
}

export default Category