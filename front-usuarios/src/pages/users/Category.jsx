import Menu from "../../components/Menu";
import { Link } from "react-router-dom";

const Category = () => {
    return (
        <>
        <Menu />
        <div className="category">
            <Link to="/flags" className="game-btn category__btn">FLAGS</Link>
            <Link to="/capitals" className="game-btn category__btn">CAPITALS</Link>
        </div>
        </>
    )
}

export default Category