import Heros from "./components/Heros";
import Demo from "./components/Demo";

import "./App.css";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Heros />
        <Demo />
      </div>
    </main>
  );
};

export default App;
