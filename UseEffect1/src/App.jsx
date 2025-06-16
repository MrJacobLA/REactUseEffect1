//Importiere hier React Hooks: Diesmal aber useState und useEffect
import { useEffect, useState } from "react";
// Hauptteil
const App = () => {
  // Zustand (State)
  const [characters, setCharacters] = useState([]);
  // Zustand für die URL zur nächsten Seite
  const [nextUrl, setNextUrl] = useState(null);
  // Zustand für die URL zur vorherigen Seite
  const [prevUrl, setPrevUrl] = useState(null);
  // Zustand, ob gerade geladen wird
  const [loading, setLoading] = useState(false);
  // Zustand für eventuelle Fehlermeldungen
  const [error, setError] = useState(null);

  // Hier Funktion zum Abrufen der StarwarsCharaktere
  const fetchCharacters = async (url = "https://swapi.tech/api/people") => {
    try {
      setLoading(true); // Ladeanzeige aktivieren
      setError(null); // Fehler zurücksetzen

      // Daten von der API abrufen
      const response = await fetch(url);
      const data = await response.json();

      // Ergebnisse in den State speicher
      setCharacters(data.results); // Liste der Charaktere
      setNextUrl(data.next); // URL zur nächsten Seite
      setPrevUrl(data.previous); // URL zur vorherigen Seite
    } catch (err) {
      // Falls ein Fehler auftritt, speichere ihn
      setError("Fehler beim Laden der Daten");
    } finally {
      // Ladeanzeige wieder ausschalten
      setLoading(false);
    }
  };
  // useEffect wird einmal beim ersten Laden der Seite aufgerufen
  useEffect(() => {
    fetchCharacters(); // API-Aufruf beim Start
  }, []); // Leeres Array bedeutet: nur beim ersten Laden

  // JSX Rückgabe (UI)
  return (
    <div className="min-h-screen bg-base-200 p-4 text-center">
      {/* HIer meine h1-Überschrift */}
      <h1 className="text-3xl font-bold mb-6">Star Wars Charaktere</h1>

      {/* Zeige Ladeanzeige, wenn loading true ist */}
      {loading && <p className="text-info">Lade...</p>}

      {/* Zeige Fehlermeldung, wenn error nicht null ist */}
      {error && <p className="text-error">{error}</p>}

      {/* hier die Liste der Charaktere */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* Für jeden Charakter eine Karte anzeigen */}
        {characters.map((char) => (
          <div key={char.uid} className="card bg-base-100 shadow-xl p-4">
            <h2 className="text-lg font-semibold">{char.name}</h2>
          </div>
        ))}
      </div>

      {/* Navigation mit Weiter- und Zurück-Schaltflächen */}

      <div className="mt-6 flex justify-center gap-4">
        {/* Weiter-Button */}
        <button
          className="btn btn-primary"
          disabled={!prevUrl || loading}
          onClick={() => fetchCharacters(prevUrl)} // Holt nächste Seite
        >
          Zurück
        </button>
        <button
          className="btn btn-primary"
          disabled={!nextUrl || loading}
          onClick={() => fetchCharacters(nextUrl)}
        >
          Weiter
        </button>
      </div>
    </div>
  );
};
// Natürlich die Komponente auch xportieren, damit sie überhaupt Projekt benutzt werden kann
export default App;
