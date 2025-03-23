import { useEffect, useState } from "react";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

export default function FlagsGame() {
  const { token } = useAuth();
  const [countries, setCountries] = useState([]);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [options, setOptions] = useState([]);
  const [selected, setSelected] = useState(null);
  const [round, setRound] = useState(1);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await api.get("/countries/all", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setCountries(res.data);
      } catch (err) {
        console.error("No autorizado o error al cargar países", err);
      }
    };

    fetchCountries();
  }, [token]);

  useEffect(() => {
    if (countries.length) {
      const correct = countries[Math.floor(Math.random() * countries.length)];
      const incorrect = countries
        .filter((c) => c.id !== correct.id)
        .sort(() => 0.5 - Math.random())
        .slice(0, 3);

      const allOptions = [...incorrect, correct].sort(() => 0.5 - Math.random());

      setOptions(allOptions);
      setSelected(null);
    }
  }, [countries, round]);

  const handleOption = (option) => {
    if (selected) return;

    setSelected(option);
    if (option.id === options.find((o) => o.name === option.name).id) {
      setScore(score + 1);
    }

    setTimeout(() => {
      if (round < 5) {
        setRound(round + 1);
      } else {
        alert(`Juego terminado. Tu puntaje fue ${score}/5`);
        setRound(1);
        setScore(0);
      }
    }, 1000);
  };

  if (!options.length) return <p>Cargando juego...</p>;

  const correct = options.find((o) => countries.find((c) => c.id === o.id));

  return (
    <div>
    FLAG1
      <h2>Ronda {round} de 5</h2>
      <img src={correct.flag} alt="Bandera" width={200} height={120} />
      <ul>
        {options.map((opt) => (
          <li key={opt.id}>
            <button
              onClick={() => handleOption(opt)}
              style={{
                background:
                  selected && opt.id === correct.id
                    ? "lightgreen"
                    : selected === opt
                    ? "salmon"
                    : "white",
              }}
            >
              {opt.name}
            </button>
          </li>
        ))}
      </ul>
      <p>Puntaje: {score}</p>
    </div>
  );
}
