import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "./store/store";
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

    useEffect(() => {
        dispatch(loadUserFromSession());
    }, [dispatch]);

    const isRecovery =
        typeof window !== "undefined" && window.location.hash.includes("type=recovery");
    console.log("isRecovery: ", isRecovery);
    console.log("window.location.hash: ", window.location.hash);

    if (loading) return <Spinner />;

    return (
        <>
            <Toaster position="top-right" richColors closeButton />
            <Routes>
                {isRecovery ? (
                    <>
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="*" element={<Navigate to="/reset-password" replace />} />
                    </>
                ) : isAuthenticated ? (
                    <>
                        <Route path="/dashboard" element={<Dashboard />} />
                        <Route path="/reset-password" element={<ResetPassword />} />
                        <Route path="*" element={<Navigate to="/dashboard" replace />} />
                    </>
                ) : (
                    <>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="*" element={<Navigate to="/signin" replace />} />
                    </>
                )}
            </Routes>
        </>
    );
}

export default App;
