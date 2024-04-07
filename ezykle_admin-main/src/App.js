import "./App.css";
import Routers from "./Routers";
import { BrowserRouter } from "react-router-dom";
import Sidebar from "./pages/Sidebar/sidebar";


function App() {
  return (
    <BrowserRouter>
      <Sidebar>
        <Routers />
      </Sidebar>
    </BrowserRouter>
  );
}

export default App;
