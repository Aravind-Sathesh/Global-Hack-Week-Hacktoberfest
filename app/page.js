"use client";
import { useState } from "react";
import { winner } from "./winner";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const xIsNext = squares.filter(Boolean).length % 2 === 0;

  const won = winner(squares);
  const status = won ? `Winner: ${won}` : squares.every(Boolean) ? "Draw" : `Next: ${xIsNext ? "X" : "O"}`;

  function play(i) {
    if (squares[i] || won) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
  }

  return (
    <main>
      <p>{status}</p>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 64px)", gap: 4 }}>
        {squares.map((s, i) => (
          <button key={i} onClick={() => play(i)} aria-label={`Square ${i + 1}`} style={{ height: 64, fontSize: 28 }}>
            {s}
          </button>
        ))}
      </div>
    </main>
  );
}
