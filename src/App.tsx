import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";

const ListTemp = () => {
  return <div>List View</div>;
};

const EditTemp = () => {
  return <div>Edit View</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ListTemp />} />
        <Route path=":imageId/edit" element={<EditTemp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
