import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import ImageSearch from "./ImageSearch";
import ImageEdit from "./ImageEdit";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<ImageSearch />} />
        <Route path=":imageId/edit" element={<ImageEdit />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
