import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from "../provider/authProvider";
import { ProtectedRoute } from "./ProtectedRoute";
// GERAL
import Login from "../components/Login"
import Home from "../components/Home";
import UserConfig from "../components/UserConfig";
import PaginaIncorreta from "../components/PaginaIncorreta";
// CLIENTE
import Clientes from "../components/Clientes";
import Cliente from "../components/Clientes/Cliente"
// FUNCIONARIO
import Funcionarios from "../components/Funcionarios";
import Funcionario from "../components/Funcionarios/Funcionario";
// ESPECIALIDADE & SERVIÇOS
import Especialidades from "../components/Especialidades";
// ORDEM
import Ordens from "../components/Ordens";
import NovaOrdem from "../components/Ordens/NovaOrdem";
import TesteLayout from "../components/TesteLayout";
import Ordem from "../components/Ordens/Ordem";
import HistoricoOrdens from "../components/Ordens/HistoricoOrdens";
import PrimeiroAcesso from "../components/Login/PrimeiroAcesso";

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
                {
                    path: "/historico-ordens",
                    element: <HistoricoOrdens/> ,
                },
                {
                    path: "/clientes",
                    element: <Clientes/> ,
                },
                {
                    path: "/cliente",
                    element: <Cliente/>,
                },
                {
                    path: "/teste",
                    element: <TesteLayout/>
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
