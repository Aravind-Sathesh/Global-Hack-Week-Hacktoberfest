"use client";
import { useState } from "react";

export default function Home() {
  const [squares, setSquares] = useState(Array(9).fill(null));
  const xIsNext = squares.filter(Boolean).length % 2 === 0;

  function play(i) {
    if (squares[i]) return;
    const next = squares.slice();
    next[i] = xIsNext ? "X" : "O";
    setSquares(next);
  }

  return (
    <main>
      <p>Next: {xIsNext ? "X" : "O"}</p>
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
