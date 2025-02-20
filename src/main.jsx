import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from '@context/authContext';
import AppRoutes from "./router/routes";
import { PreferenciasProvider } from '@context/PreferenciasContext';
import './index.css'
import { UsuarioProvider } from './context/UsuarioContext';

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
salmao1