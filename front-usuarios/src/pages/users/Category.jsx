import Menu from "../../components/Menu";

const Category = () => {
    return (
        <>
        <Menu />
        <div className="category">
            <a href="/flags" className="game-btn">FLAGS</a>
            <a href="/capitals" className="game-btn">CAPITALS</a>
        </div>
        </>
    )
}

export default Category