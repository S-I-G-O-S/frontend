import { lazy, StrictMode, Suspense } from 'react'
import { createRoot } from 'react-dom/client'
import AuthProvider from '@context/authContext.jsx';
// import AppRoutes from "./router/routes.jsx"; 
import { PreferenciasProvider } from '@context/PreferenciasContext.jsx';
import './index.css'
import "@styles/globals.css"
import { UsuarioProvider } from './context/UsuarioContext.jsx';
import Loading from '@components/public/Loading.jsx'

const AppRoutes = lazy(() => import('./router/routes.jsx'))

function App() {
	return (
		<AuthProvider>
			<UsuarioProvider>
				<PreferenciasProvider>
					{/* O Suspense exibe um fallback enquanto o componente é carregado */}
					<Suspense fallback={<Loading texto={"carregando SIGOS"} />}>
						<AppRoutes />
					</Suspense>
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