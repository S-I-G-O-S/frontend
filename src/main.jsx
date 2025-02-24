import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from '@context/authContext.jsx';
import AppRoutes from "./router/routes.jsx";
import { PreferenciasProvider } from '@context/PreferenciasContext.jsx';
import './index.css'
import { UsuarioProvider } from './context/UsuarioContext.jsx';

function App() {
    return (
        <AuthProvider>
            <UsuarioProvider>
              <PreferenciasProvider>
                  <AppRoutes />
              </PreferenciasProvider>
            </UsuarioProvider>
        </AuthProvider>
    );
}
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)