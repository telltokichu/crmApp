import { supabase } from "@/lib/supabaseClient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
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
import { useDispatch } from "react-redux";
import { signout } from "@/slices/authSlice";

const resetSchema = z
    .object({
        password: z.string().min(6, "Password must be at least 6 characters"),
        confirm: z.string(),
    })
    .refine((data) => data.password === data.confirm, {
        message: "Passwords do not match",
        path: ["confirm"],
    });

type ResetFormValues = z.infer<typeof resetSchema>;

const ResetPassword = () => {
    const dispatch = useDispatch();
    // const navigate = useNavigate();
    // const [searchParams] = useSearchParams();
    const form = useForm<ResetFormValues>({
        resolver: zodResolver(resetSchema),
        defaultValues: {
            password: "",
            confirm: "",
        },
    });

    const singOut = async () => {
        const { error } = await supabase.auth.signOut();
        if (error) {
            console.error("Error during logout:", error.message);
        } else {
            dispatch(signout());
        }
    };

    const handleUpdate = async (values: ResetFormValues) => {
        const { error } = await supabase.auth.updateUser({ password: values.password });

        if (error) {
            toast.error(error.message);
        } else {
            toast.success("Password updated successfully");
            singOut();
        }
    };

    return (
        <div className="max-w-sm mx-auto mt-20 space-y-4 p-4 text-center">
            <h2 className="text-xl font-bold">Reset Password</h2>
            <p className="text-sm text-muted-foreground">Enter and confirm your new password.</p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleUpdate)} className="space-y-4 text-left">
                    <FormField
                        control={form.control}
                        name="password"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>New Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Enter new password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="confirm"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Confirm Password</FormLabel>
                                <FormControl>
                                    <Input
                                        type="password"
                                        placeholder="Confirm new password"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="w-full">
                        Reset Password
                    </Button>
                </form>
            </Form>
        </div>
    );
};

export default ResetPassword;
