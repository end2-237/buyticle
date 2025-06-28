import { Metronome } from "ldrs/react";
import "ldrs/react/Metronome.css";

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-screen bg-base-100 transition-colors duration-500">
      <div className="flex flex-col justify-center items-center gap-6">
        <Metronome size="40" speed="1.6" color="#22c55e" />
        <span className="text-sm text-base-content font-medium animate-fade-in-out">
          Chargement en cours...
        </span>
      </div>
    </div>
  );
}
