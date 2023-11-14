import Headers from "./components/Headers";
import Content from "./components/Content";

import "./App.css";

const App = () => {
  return (
    <main>
      <div className="main">
        <div className="gradient" />
      </div>
      <div className="app">
        <Headers />
        <Content />
      </div>
    </main>
  );
};

export default App;
