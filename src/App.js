import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./Pages/Home/Home";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
