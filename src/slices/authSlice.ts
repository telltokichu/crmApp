import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { supabase } from "../lib/supabaseClient";

interface AuthState {
    user: any | null;
    isAuthenticated: boolean;
    loading: boolean;
}

const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    loading: true, // important!
};

// Load user from Supabase Session
export const loadUserFromSession = createAsyncThunk("auth/loadUserFromSession", async () => {
    const { data, error } = await supabase.auth.getUser();
    if (error) throw new Error(error.message);
    return data.user;
});

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        signin(state, action: PayloadAction<any>) {
            state.user = action.payload;
            state.isAuthenticated = true;
            state.loading = false;
        },
        signout(state) {
            state.user = null;
            state.isAuthenticated = false;
            state.loading = false;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(loadUserFromSession.pending, (state) => {
                state.loading = true;
            })
            .addCase(loadUserFromSession.fulfilled, (state, action) => {
                state.user = action.payload;
                state.isAuthenticated = !!action.payload;
                state.loading = false;
            })
            .addCase(loadUserFromSession.rejected, (state) => {
                state.loading = false;
            });
    },
});

export const { signin, signout } = authSlice.actions;
export default authSlice.reducer;
