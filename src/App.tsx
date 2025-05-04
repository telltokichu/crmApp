import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "./store/store";
import SignIn from "./pages/sign-in";
import Dashboard from "./pages/dashboard";
import { loadUserFromSession } from "./slices/authSlice";
import { useEffect } from "react";
import Spinner from "./components/spinner";
import { Routes, Route, Navigate } from "react-router-dom";
import SignUp from "./pages/sign-up";
import { Toaster } from "@/components/ui/sonner";
import ResetPassword from "./pages/reset-password";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);
    console.log("app - isAuthenticated: ", isAuthenticated);

    useEffect(() => {
        dispatch(loadUserFromSession());
    }, [dispatch]);

    if (loading) return <Spinner />;
    const renderRoutes = () => {
        return (
            <>
                {!isAuthenticated ? (
                    <>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="*" element={<Navigate to="/signin" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/reset-password/*" element={<ResetPassword />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </>
                )}
            </>
        );
    };

    return (
        <>
            <Toaster position="top-right" richColors closeButton />
            <Routes>{renderRoutes()}</Routes>
        </>
    );
}

export default App;
