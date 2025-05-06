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
import PoliciesPage from "./pages/policies";
import { SidebarInset, SidebarProvider } from "./components/ui/sidebar";
import { AppSidebar } from "./components/app-sidebar";
import { SiteHeader } from "./components/site-header";

function App() {
    const dispatch = useDispatch<AppDispatch>();
    const { isAuthenticated, loading } = useSelector((state: RootState) => state.auth);

    useEffect(() => {
        dispatch(loadUserFromSession());
    }, [dispatch]);

    if (loading) return <Spinner />;
    return (
        <>
            <Toaster position="top-right" richColors closeButton />
            {!isAuthenticated ? (
                <Routes>
                    <Route path="/signin" element={<SignIn />} />
                    <Route path="/signup" element={<SignUp />} />
                    <Route path="*" element={<Navigate to="/signin" replace />} />
                </Routes>
            ) : (
                <>
                    <SidebarProvider>
                        <AppSidebar variant="inset" />
                        <SidebarInset>
                            <SiteHeader />
                            <Routes>
                                <Route path="/dashboard" element={<Dashboard />} />
                                <Route path="/policies" element={<PoliciesPage />} />
                                <Route path="/reset-password/*" element={<ResetPassword />} />
                                <Route path="*" element={<Navigate to="/dashboard" replace />} />
                            </Routes>
                        </SidebarInset>
                    </SidebarProvider>
                </>
            )}
        </>
    );
}

export default App;
