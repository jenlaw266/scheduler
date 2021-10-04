import { useState } from "react";

export default function useVisualMode(initial) {
  const [mode, setMode] = useState(initial);
  const [history, setHistory] = useState([]);

  const transition = (newMode, replace = false) => {
    if (!replace) {
      setHistory((prev) => [...prev, mode]);
    }
    setMode(newMode);
  };
  const back = () => {
    if (history.length === 0) return;
    setMode(history[history.length - 1]);
    setHistory((prev) => prev.slice(0, prev.length - 1));
  };

  return { mode, transition, back };
}
