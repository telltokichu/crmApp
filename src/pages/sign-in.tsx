import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { AppDispatch } from "@/store/store";
import { useDispatch } from "react-redux";
import { signin } from "@/slices/authSlice";
import { supabase } from "../lib/supabaseClient";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const SignIn = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showReset, setShowReset] = useState(false);
    const [resetMessage, setResetMessage] = useState("");
    const formSchema = z.object({
        email: z.string().email({ message: "Enter a valid email" }),
        password: z.string().min(6, { message: "Password is required" }),
    });
    type FormValues = z.infer<typeof formSchema>;

    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    // Reset password form schema and hook
    const resetSchema = z.object({
        resetEmail: z.string().email({ message: "Enter a valid email" }),
    });
    const resetForm = useForm<{ resetEmail: string }>({
        resolver: zodResolver(resetSchema),
        defaultValues: { resetEmail: "" },
    });

    const onSubmit = async (values: FormValues) => {
        setServerError("");
        setLoading(true);

        const { data, error } = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        });

        setLoading(false);

        if (error) {
            setServerError(error.message);
        } else if (data?.user) {
            dispatch(signin(data.user));
        }
    };

    const handlePasswordReset = async () => {
        setLoading(true);
        const email = resetForm.getValues().resetEmail;
        setResetMessage("");
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: `${window.location.origin}/reset-password`,
        });
        setLoading(false);
        if (error) {
            setResetMessage(error.message);
        } else {
            form.reset();
            toast.success("Password reset email sent successfully!");
        }
    };

    useEffect(() => {
        const subscription = form.watch((_, { name }) => {
            if (serverError && (name === "email" || name === "password")) {
                setServerError("");
            }
        });

        return () => {
            subscription.unsubscribe();
        };
    }, [form, serverError]);

    return showReset ? (
        <div className="w-full max-w-md mx-auto mt-10 space-y-6 text-center">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Reset your password</h1>
                <p className="text-sm text-muted-foreground">
                    We’ll send you a password reset link.
                </p>
            </div>
            <div className="space-y-4 rounded-lg border p-6 shadow-sm bg-background text-left">
                <Form {...resetForm}>
                    <form
                        onSubmit={resetForm.handleSubmit(handlePasswordReset)}
                        className="space-y-4"
                    >
                        <FormField
                            control={resetForm.control}
                            name="resetEmail"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Email</FormLabel>
                                    <FormControl>
                                        <Input placeholder="Enter your email" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="w-full">
                            {loading ? "Sending..." : "Send Reset Email"}
                        </Button>
                    </form>
                </Form>
                {resetMessage && <p className="text-sm text-red-600">{resetMessage}</p>}
                <div className="text-center text-sm mt-4">
                    <a
                        href="#"
                        className="underline underline-offset-4"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowReset(false);
                        }}
                    >
                        Back to sign in
                    </a>
                </div>
            </div>
        </div>
    ) : (
        <div className="w-full max-w-md mx-auto mt-10 space-y-6 text-center">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Sign In for an account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details to sign in to your account
                </p>
            </div>
            <div className="space-y-4 rounded-lg border p-6 shadow-sm bg-background text-left">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                        <div className="grid gap-6">
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Enter email" {...field} />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="grid gap-3">
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input
                                                    type="password"
                                                    placeholder="Enter password"
                                                    {...field}
                                                />
                                            </FormControl>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                {serverError && (
                                    <p className="text-sm text-red-600">{serverError}</p>
                                )}
                                <a
                                    href="#"
                                    className="mt-2 ml-auto inline-block text-sm underline-offset-4 hover:underline"
                                    onClick={(e) => {
                                        e.preventDefault();
                                        setShowReset(true);
                                        form.reset();
                                    }}
                                >
                                    Forgot your password?
                                </a>
                            </div>
                            <Button type="submit" className="w-full" disabled={loading}>
                                {loading ? "Signing in..." : "Sign In"}
                            </Button>
                        </div>
                    </form>
                </Form>
                <div className="text-center text-sm">
                    Don&apos;t have an account?{" "}
                    <a
                        href="#"
                        className="underline underline-offset-4"
                        onClick={() => navigate("/signup")}
                    >
                        Sign up
                    </a>
                </div>
            </div>
        </div>
    );
};
export default SignIn;
