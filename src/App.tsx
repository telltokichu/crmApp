import { useSelector } from "react-redux";
import { RootState } from "./store/store";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";

function App() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    return <>{isAuthenticated ? <Dashboard /> : <LoginPage />} </>;
}

export default App;
