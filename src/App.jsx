import AuthProvider from '@context/authContext';
import AppRoutes from "./router/routes";
import { PreferenciasProvider } from '@context/PreferenciasContext';

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
