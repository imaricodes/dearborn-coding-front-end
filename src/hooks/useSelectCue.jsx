import {useState} from "react";
import { useApplicationContext } from "@/context/ApplicationContext";
import processCue from "@/scripts/processCue";


//TODO: store cues in a database
const CUE_LIST = [
  "The quick brown fox jumps.",
  "The lazy dog sleeps.",
  "The old man walks.",
  "The young boy runs.",
  "The pretty cow moos.",
  "The big bear roars.",
  "The small cat purrs.",
  "The tall tree sways.",
  "The short bush burns.",
  "The fast car speeds.",
];

export function useSelectCue() {
  const { cueObjectSetter } = useApplicationContext();
  const [cue, setCue] = useState("");

  const cueSelector = () => {
    const randomCue = CUE_LIST[Math.floor(Math.random() * CUE_LIST.length)];

    let processedCue = processCue(randomCue);
    setCue(randomCue);

    cueObjectSetter(processedCue);

    return randomCue;
  };

  return { cueSelector, cue };
}
