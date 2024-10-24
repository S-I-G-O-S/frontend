import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./components/Login"
import Home from "./components/Home";
import Funcionarios from "./components/Funcionarios";
import Funcionario from "./components/Funcionarios/Funcionario";
import Especialidades from "./components/Especialidades";
import Ordens from "./components/Ordens";
import Clientes from "./components/Clientes";
import Cliente from "./components/Clientes/Cliente"
import UserConfig from "./components/UserConfig";


function AppRoutes() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={ <Login/> }></Route>
                <Route path="/home" element={ <Home/> }></Route>
                <Route path="/usuario" element={ <UserConfig/> }></Route>
                <Route path="/funcionarios" element={ <Funcionarios/> }></Route>
                <Route path="/funcionario" element={ <Funcionario/> }></Route>
                <Route path="/especialidades" element={ <Especialidades/> }></Route>
                <Route path="/ordens" element={ <Ordens/> }></Route>
                <Route path="/clientes" element={ <Clientes/> }></Route>
                <Route path="/cliente" element={ <Cliente/> }></Route>
                
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoutes