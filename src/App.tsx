import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageSearch from "./ImageSearch";

const EditTemp = () => {
  return <div>Edit View</div>;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageSearch />} />
        <Route path=":imageId/edit" element={<EditTemp />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
