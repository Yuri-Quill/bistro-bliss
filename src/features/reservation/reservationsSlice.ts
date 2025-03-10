import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { createReservation, IReservation } from "./ReservationAPI";

interface ReservationState {
    loading: "idle" | "pending" | "succeeded" | "failed";
    error: string | null;
}

const initialState: ReservationState = {
    loading: "idle",
    error: null,
};

export const createReservationAsync = createAsyncThunk<
    IReservation,
    IReservation,
    { rejectValue: string }
>(
    "reservation/createReservation",
    async (values, { rejectWithValue }) => {
        try {
            return await createReservation(values);
        } catch (error) {
            if (error instanceof Error) {
                return rejectWithValue(error.message);
            }
            return rejectWithValue("Error with creating reservation");
        }
    }
);

const reservationsSlice = createSlice({
    name: "reservation",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createReservationAsync.pending, (state) => {
                state.loading = "pending";
            })
            .addCase(createReservationAsync.fulfilled, (state) => {
                state.loading = "succeeded";
            })
            .addCase(createReservationAsync.rejected, (state, action) => {
                state.loading = "failed";
                state.error = action.payload as string;
            });
    },
});

export default reservationsSlice.reducer;
