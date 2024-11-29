import { ConfigProvider } from "antd";
import AuthProvider from "./provider/authProvider";
import AppRoutes from "./router/routes";
import { PreferenciasProvider } from './context/PreferenciasContext';

function App() {
    return (
        <AuthProvider>
            <PreferenciasProvider>
                <AppRoutes />
            </PreferenciasProvider>
        </AuthProvider>
    );
}

export default App;
