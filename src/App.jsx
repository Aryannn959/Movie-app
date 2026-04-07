import "./App.css";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import Favourites from "./pages/Favourites.jsx";

function App() {
  return (
    <>
      <Routes>
        <Route
          path="/favourites"
          element={
            <>
              <Favourites />
            </>
          }
        />
        <Route
          path="/"
          element={
            <>
              <Home />
            </>
          }
        />
      </Routes>
    </>
  );
}

export default App;
