import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./pages/Login"
import Home from "./pages/Home";
import Funcionarios from "./pages/Funcionarios";
import Funcionario from "./pages/Funcionarios/Funcionario";
import Ordens from "./pages/Ordens";
import Clientes from "./pages/Clientes";
import Cliente from "./pages/Clientes/Cliente"


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> }></Route>
                <Route path="/home" element={ <Home/> }></Route>
                <Route path="/funcionarios" element={ <Funcionarios/> }></Route>
                <Route path="/funcionario" element={ <Funcionario/> }></Route>
                <Route path="/ordens" element={ <Ordens/> }></Route>
                <Route path="/clientes" element={ <Clientes/> }></Route>
                <Route path="/cliente" element={ <Cliente/> }></Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes