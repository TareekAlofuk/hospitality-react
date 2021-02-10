import React from 'react';
import ItemTypeContainer from "./Inventory/ItemType/ShowItemType/ItemTypeContainer";
import AddItemTypeForm from "./Inventory/ItemType/AddItemType/AddItemTypeForm";

function App() {
  return (
    <div className="App">
        <AddItemTypeForm/>
        <ItemTypeContainer/>
    </div>
  );
}

export default App;
