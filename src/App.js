import { useEffect } from "react";
import "./App.css";
import LandingPage from "./LandingPage";

function App() {
  useEffect(() => {
    document.title = 'EatFit';
  }, []);

  return (
    <div className="App">
      <LandingPage />
    </div>
  );
}

export default App;
