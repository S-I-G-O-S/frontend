import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
import Login from "../components/Login"
import Home from "../components/Home";
import Funcionarios from "../components/Funcionarios";
import Funcionario from "../components/Funcionarios/Funcionario";
import Especialidades from "../components/Especialidades";
import Ordens from "../components/Ordens";
import Clientes from "../components/Clientes";
import Cliente from "../components/Clientes/Cliente"
import UserConfig from "../components/UserConfig";
import PaginaIncorreta from "../components/PaginaIncorreta";


function AppRoutes() {
    const { token } = useAuth();

    const rotasPublicas = [
        {
            path: "/",
            element: <Login/>,
        }
    ]
    const rotasProtegidas = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <Login/>,
                },
                {
                    path: "/home",
                    element: <Home/> ,
                },
                {
                    path: "/usuario",
                    element: <UserConfig/> ,
                },
                {
                    path: "/funcionarios",
                    element: <Funcionarios/> ,
                },
                {
                    path: "/funcionario",
                    element: <Funcionario/> ,
                },
                {
                    path: "/especialidades",
                    element: <Especialidades/> ,
                },
                {
                    path: "/ordens",
                    element: <Ordens/> ,
                },
                {
                    path: "/clientes",
                    element: <Clientes/> ,
                },
                {
                    path: "/cliente",
                    element: <Cliente/> ,
                }
            ]
        }
    ]
    const rotasParaNaoAutenticados = [
    //  TODO criar tela de acesso á pagina invalida ou pagina não encontrada
        {
            path: "/erro404",
            element: <PaginaIncorreta/>,
        }
    ]
    const router = createBrowserRouter([
        ...rotasPublicas,
        ...(!token ? rotasParaNaoAutenticados : []),
        ...rotasProtegidas,
    ])
    return <RouterProvider router={router} />
}
export default AppRoutes

{/* <BrowserRouter>
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
</BrowserRouter> */}