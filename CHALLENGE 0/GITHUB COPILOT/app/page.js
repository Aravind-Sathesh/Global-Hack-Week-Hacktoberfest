"use client";
import { useState } from "react";
import { winner } from "./winner";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const xIsNext = squares.filter(Boolean).length % 2 === 0;
  const won = winner(squares);
  const turn = xIsNext ? "X" : "O";

  function play(i) {
    if (squares[i] || won) return;
    const next = squares.slice();
    next[i] = turn;
    setSquares(next);
  }

  return (
    <main>
      <p className="status">
        {won ? (
          <>Winner: <span className={won}>{won}</span></>
        ) : squares.every(Boolean) ? (
          "Draw"
        ) : (
          <>Next: <span className={turn}>{turn}</span></>
        )}
      </p>
      <div className="board">
        {squares.map((s, i) => (
          <button
            key={i}
            className={`cell ${s ?? ""}`}
            onClick={() => play(i)}
            disabled={Boolean(s || won)}
            aria-label={`Square ${i + 1}${s ? `, ${s}` : ""}`}
          >
            {s}
          </button>
        ))}
      </div>
      <button className="restart" onClick={() => setSquares(Array(9).fill(null))}>
        Restart
      </button>
    </main>
  );
}
