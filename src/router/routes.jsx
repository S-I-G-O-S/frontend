import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { useAuth } from '@context/authContext'
import { ProtectedRoute } from "./ProtectedRoute";
import { Login, Home, UserConfig, PaginaIncorreta, Clientes, Cliente, Funcionarios, Funcionario, ServicosEspecialidades, Ordens, NovaOrdem, Ordem, PrimeiroAcesso, Teste, MeusAtendimentos, Analise } from '@pages'

const AppRoutes = () => {
    const { token } = useAuth();
    const rotasPublicas = [
        {
            path: "/",
            element: <Login />,
        }
    ]
    const rotasProtegidas = [
        {
            path: "/",
            element: <ProtectedRoute />,
            children: [
                {
                    path: "/",
                    element: <Login />,
                },
                {
                    path: "/novo-usuario",
                    element: <PrimeiroAcesso />,
                },
                {
                    path: "/home",
                    element: <Home />,
                },
                {
                    path: "/configuracoes",
                    element: <UserConfig />,
                },
                {
                    path: "/funcionarios",
                    element: <Funcionarios />,
                },
                {
                    path: "/funcionario",
                    element: <Funcionario />,
                },
                {
                    path: "/servicos",
                    element: <ServicosEspecialidades />,
                },
                {
                    path: "/ordens",
                    element: <Ordens />,
                },
                {
                    path: "/ordem",
                    element: <Ordem />,
                },
                {
                    path: "/atendimentos",
                    element: <MeusAtendimentos/>,
                },
                {
                    path: "/nova-ordem",
                    element: <NovaOrdem />,
                },
                // {
                //     path: "/historico-ordens",
                //     element: <HistoricoOrdens/> ,
                // },
                {
                    path: "/clientes",
                    element: <Clientes />,
                },
                {
                    path: "/cliente",
                    element: <Cliente />,
                },
                {
                    path: "/analise",
                    element: <Analise />,
                },
                {
                    path: "/teste",
                    element: <Teste />,
                },
                {
                    path: "*",
                    element: <PaginaIncorreta />,
                },
            ]
        }
    ]
    const rotasParaNaoAutenticados = [
        {
            path: "/",
            element: <Login />,
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
