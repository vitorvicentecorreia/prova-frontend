import TreeItem from "./components/TreeItem";

import { treeWithChildren } from './mocks/tree'

function App() {
  return (
    <div className="App">
      <TreeItem node={treeWithChildren} />
    </div>
  );
}

export default App;
