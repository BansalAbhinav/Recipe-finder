import Sidebar from "./components/Sidebar";
import HomePage from "./components/HomePage";
import { Route, Routes } from "react-router-dom";
import Favorites from "./components/Favorites";
function App() {
  return (
    <div className="flex">
      <Sidebar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/favorites" element={<Favorites />} />
      </Routes>
    </div>
  );
}

export default App;
