import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from '@context/authContext';
import AppRoutes from "./router/routes";
import { PreferenciasProvider } from '@context/PreferenciasContext';
import './index.css'

function App() {
    return (
        <AuthProvider>
            <PreferenciasProvider>
                <AppRoutes />
            </PreferenciasProvider>
        </AuthProvider>
    );
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
