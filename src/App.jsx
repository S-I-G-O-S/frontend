import AuthProvider from "./provider/authProvider";
import AppRoutes from './router/routes'

function App() {
  return (
    <AuthProvider>
      <AppRoutes/>
    </AuthProvider>
  )
}

export default App
