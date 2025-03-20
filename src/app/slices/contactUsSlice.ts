import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

const URL = "https://quill-server-fksr.onrender.com/api/email/contact-us";
export interface IContactUs {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const sendContactUsRequest = createAsyncThunk<
	IContactUs,
	IContactUs,
	{ rejectValue: string }
>("contactUs/sendContactUsRequest", async (value, { rejectWithValue }) => {
	try {
		const response = await axios.post(URL, value);
		return response.data;
	} catch (error) {
		if (axios.isAxiosError(error) && error.response) {
			return rejectWithValue(
				error.response.data.message || "Failed to contact us"
			);
		}
		return rejectWithValue("An unexpected error occurred");
	}
});

const contactUsSlice = createSlice({
	name: "contactUs",
	initialState: {
		contactUs: null as IContactUs | null,
		loading: false,
		error: null as string | null,
	},
	reducers: {
		clearContactUs: (state) => {
			state.contactUs = null;
			state.error = null;
		},
	},

	extraReducers: (builder) => {
		builder
			.addCase(sendContactUsRequest.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(
				sendContactUsRequest.fulfilled,
				(state, action: PayloadAction<IContactUs>) => {
					state.loading = false;
					state.contactUs = action.payload;
					state.error = null;
				}
			)
			.addCase(sendContactUsRequest.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Oops something went wrong";
			});
	},
});

export const { clearContactUs } = contactUsSlice.actions;

export default contactUsSlice.reducer;
