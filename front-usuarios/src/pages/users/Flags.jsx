import FlagsGame from "../../components/FlagsGame";
import { useState } from "react";
import FlagsGame2 from "../../components/FlagsGame2";

const Flags = () => {
    const [game, setGame] = useState(0); // Default to 0, meaning no game is rendered

    return (
        <>
            <button onClick={() => setGame(1)}>Show FlagsGame</button>
            <button onClick={() => setGame(2)}>Show FlagsGame2</button>
            {game === 1 && <FlagsGame />}
            {game === 2 && <FlagsGame2 />}
        </>
    );
}

export default Flags