import "./App.css";
import { useStore } from "./hooks/useStore";

function App() {
  const { fromLanguage, setFromLanguage } = useStore();

  console.log(fromLanguage);

  return (
    <div className="App">
      <h1>Google Translate</h1>
      <button
        onClick={() => {
          setFromLanguage("es");
        }}
      >
        Cambiar Español
      </button>
    </div>
  );
}

export default App;
