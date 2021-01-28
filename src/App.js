import TreeItem from "./components/TreeItem";

import data from './data.json'

function App() {
  return (
    <div className="App">
      <TreeItem node={data} />
    </div>
  );
}

export default App;
