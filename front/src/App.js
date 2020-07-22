import React from "react";
import "semantic-ui-css/semantic.min.css";
import AddText from "./components/AddText";
import ShowText from "./components/ShowText";
import "./index.css";

function App() {
  return (
    <div className="App">
      <AddText />
      <ShowText />
    </div>
  );
}

export default App;
