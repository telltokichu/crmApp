import { useState } from "react";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { supabase } from "@/lib/supabaseClient";
import {
    Form,
    FormField,
    FormItem,
    FormLabel,
    FormControl,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    Select,
    SelectTrigger,
    SelectValue,
    SelectContent,
    SelectItem,
} from "@/components/ui/select";
import { useNavigate } from "react-router-dom";

const signUpSchema = z
    .object({
        email: z.string().email(),
        password: z.string().min(6),
        confirmPassword: z.string().min(6),
        role: z.enum(["policy_holder", "agent", "admin"], {
            required_error: "Role is required",
        }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        path: ["confirmPassword"],
        message: "Passwords do not match",
    });

type SignUpFormValues = z.infer<typeof signUpSchema>;

const SignUp = () => {
    const [serverError, setServerError] = useState("");
    const [loading, setLoading] = useState(false);

    const form = useForm<SignUpFormValues>({
        resolver: zodResolver(signUpSchema),
        defaultValues: {
            email: "",
            password: "",
            confirmPassword: "",
        },
    });

    const navigate = useNavigate();

    const onSubmit = async (values: SignUpFormValues) => {
        setServerError("");
        setLoading(true);
        const { data, error } = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        });

        if (error) {
            setServerError(error.message);
            setLoading(false);
            return;
        }

        // Set role in user metadata (optional, or store separately)
        if (data.user) {
            await supabase.auth.updateUser({
                data: { role: values.role },
            });
        }

        setLoading(false);
        toast.success("Account created successfully!");
        form.reset();
        navigate("/login");
    };

    return (
        <div className="w-full max-w-md mx-auto mt-10 space-y-6 text-center">
            <div className="space-y-2">
                <h1 className="text-2xl font-bold">Sign Up for an account</h1>
                <p className="text-sm text-muted-foreground">
                    Enter your details to create your account
                </p>
            </div>
            <div className="space-y-4 rounded-lg border p-6 shadow-sm bg-background text-left">
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
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
                        <FormField
                            control={form.control}
                            name="confirmPassword"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Confirm Password</FormLabel>
                                    <FormControl>
                                        <Input
                                            type="password"
                                            placeholder="Re-enter password"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="role"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Role</FormLabel>
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value || undefined}
                                    >
                                        <FormControl>
                                            <SelectTrigger className="w-100">
                                                <SelectValue placeholder="Select a role" />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            <SelectItem value="policy_holder">
                                                Policy Holder
                                            </SelectItem>
                                            <SelectItem value="agent">Agent</SelectItem>
                                            <SelectItem value="admin">Admin</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        {serverError && <p className="text-sm text-red-600">{serverError}</p>}
                        <Button type="submit" className="w-full my-6" disabled={loading}>
                            {loading ? "Signing up..." : "Sign Up"}
                        </Button>
                    </form>
                </Form>
                <div className="text-center text-sm">
                    <a
                        href="#"
                        className="underline underline-offset-4"
                        onClick={() => navigate("/signin")}
                    >
                        Back to sign in
                    </a>
                </div>
            </div>
        </div>
    );
};

export default SignUp;
