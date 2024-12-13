import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from '@context/authContext'
import { ProtectedRoute } from "./ProtectedRoute";
// GERAL
import Login from "@pages/Login"
import Home from "@pages/Home";
import UserConfig from "@pages/UserConfig";
import PaginaIncorreta from "@pages/PaginaIncorreta";
// CLIENTE
import Clientes from "@pages/Clientes";
import Cliente from "@pages/Cliente"
// FUNCIONARIO
import Funcionarios from "@pages/Funcionarios";
import Funcionario from "@pages/Funcionario";
// ESPECIALIDADE & SERVIÇOS
import Especialidades from "@pages/Especialidades";
// ORDEM
import Ordens from "@pages/Ordens";
import NovaOrdem from "@pages/NovaOrdem";
import Ordem from "@pages/Ordem";
import PrimeiroAcesso from "@pages/PrimeiroAcesso";

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
                    path: "/novo-usuario",
                    element: <PrimeiroAcesso/>,
                },
                {
                    path: "/home",
                    element: <Home/> ,
                },
                {
                    path: "/configuracoes",
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
                    path: "/ordem",
                    element: <Ordem/> ,
                },
                {
                    path: "/nova-ordem",
                    element: <NovaOrdem/> ,
                },
                // {
                //     path: "/historico-ordens",
                //     element: <HistoricoOrdens/> ,
                // },
                {
                    path: "/clientes",
                    element: <Clientes/> ,
                },
                {
                    path: "/cliente",
                    element: <Cliente/>,
                },
                {
                    path: "*",
                    element: <PaginaIncorreta/>,
                },
            ]
        }
    ]
    const rotasParaNaoAutenticados = [
    //  TODO criar tela de acesso á pagina invalida ou pagina não encontrada
        {
            path: "/",
            element: <Login/>,
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
