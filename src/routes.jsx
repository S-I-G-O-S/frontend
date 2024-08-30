import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Tecnicos from "./pages/Tecnicos";
import Ordens from "./pages/Ordens";
import Clientes from "./pages/Clientes";

function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> }></Route>
                <Route path="/home" element={ <Home/> }></Route>
                <Route path="/tecnicos" element={ <Tecnicos/> }></Route>
                <Route path="/ordens" element={ <Ordens/> }></Route>
                <Route path="/clientes" element={ <Clientes/> }></Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes