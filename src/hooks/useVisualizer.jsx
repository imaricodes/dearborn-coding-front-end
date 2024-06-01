import {useState} from "react";

export function useVisualizer() {
  const [showVisualizer, setShowVisualizer] = useState(false);

const toggleVisualizer = () => {
  setShowVisualizer(true);
}

  return { showVisualizer, toggleVisualizer };
}
