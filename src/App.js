import { BrowserRouter, Routes, Route } from "react-router-dom";
import './index.css';
import Home from "./Pages/Home/Home";
import EmployeeList from "./Pages/EmployeeList/EmployeeList";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Home />}></Route>
        <Route exact path="/employee-list" element={<EmployeeList />}></Route>
      </Routes>
    </BrowserRouter >
  );
}

export default App;
