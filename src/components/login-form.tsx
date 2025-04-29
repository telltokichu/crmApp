import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { login } from "@/slices/authSlice";
import { supabase } from "../lib/supabaseClient";
import { useState } from "react";

export function LoginForm({ className, ...props }: React.ComponentProps<"form">) {
    const dispatch = useDispatch<AppDispatch>();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignIn = async () => {
        const { data, error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            console.error("Sign-in error:", error.message);
        } else {
            console.log("Signed in user:", data);
            dispatch(login(data.user));
        }
    };
    const handleSignUp = async () => {
        const { data, error } = await supabase.auth.signUp({
            email,
            password,
        });

        if (error) {
            console.error("Signup Error:", error.message);
        } else {
            console.log("User signed up:", data);
        }
    };
    return (
        <form className={cn("flex flex-col gap-6", className)} {...props}>
            <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Login to your account</h1>
                <p className="text-muted-foreground text-sm text-balance">
                    Enter your email below to login to your account
                </p>
            </div>
            <div className="grid gap-6">
                <div className="grid gap-3">
                    <Label htmlFor="email">Email</Label>
                    <Input
                        id="email"
                        type="email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="grid gap-3">
                    <Input
                        id="password"
                        type="password"
                        placeholder="Enter your password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <Button type="submit" className="w-full" onClick={handleSignIn}>
                    Login
                </Button>
            </div>
            <div className="text-center text-sm">
                Don&apos;t have an account?{" "}
                <a href="#" className="underline underline-offset-4" onClick={handleSignUp}>
                    Sign up
                </a>
            </div>
        </form>
    );
}
