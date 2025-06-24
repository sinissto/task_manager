import Header from "./components/Header.jsx";
import Home from "./pages/Home.jsx";
import { Routes, Route } from "react-router-dom";
import NewTask from "./pages/NewTask.jsx";

function App() {
  return (
    <div>
      <Header />
      <h1 style={{ textAlign: "center" }}>Manage Tasks</h1>
      <Routes>
        <Route exact path={"/"} element={<Home />} />
        <Route exact path={"/newTask"} element={<NewTask />} />
      </Routes>
    </div>
  );
}

export default App;
