import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
import LoginPage from "./pages/login";
import Dashboard from "./pages/dashboard";
import { loadUserFromSession } from "./slices/authSlice";
import { useEffect } from "react";
import Spinner from "./components/spinner";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(loadUserFromSession());
    }, [dispatch]);

    if (loading) {
        return <Spinner />;
    }

    if (!isAuthenticated) {
        return <LoginPage />;
    }
    return <Dashboard />;
}

export default App;
