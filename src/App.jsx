import { ConfigProvider } from "antd";
import AuthProvider from "./provider/authProvider";
import AppRoutes from "./router/routes";

function App() {
    return (
        <AuthProvider>
            <ConfigProvider
                theme={{
                    components: {
                        /*Pagination: {
                            itemActiveBg: "#26110D",
                            itemActiveColorDisabled: "#fcd8b9",
                            itemBg: "#F2AE72",
                            // itemInputBg: "#fcd8b9",
                            // itemLinkBg: "#fcd8b9",
                        },*/
                    },
                    /*
                    token: {
                        colorBorder: "#26110D",
                        colorPrimary: "#F2AE72",
                        colorPrimaryBorder: "#D96704",
                        colorText: "#26110D"
                    },*/
                }}
            >
                <AppRoutes />
            </ConfigProvider>
        </AuthProvider>
    );
}

export default App;
