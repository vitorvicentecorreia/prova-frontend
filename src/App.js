import React from "react";

import TreeItem from "./components/TreeItem";

import data from './data.json'

function App() {
  return (
    <div className="App">
      {Object.values(data).map(node => (
          <TreeItem node={node} key={node.id} />
      ))}
    </div>
  );
}

export default App;
