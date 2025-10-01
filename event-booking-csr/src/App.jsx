import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import RouteElements from "./routes/RouteElements.jsx";

function App() {
  return (
    <BrowserRouter>
      <RouteElements />
    </BrowserRouter>
  );
}

export default App;
