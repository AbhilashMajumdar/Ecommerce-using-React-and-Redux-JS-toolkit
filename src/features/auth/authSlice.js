import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkUser, createUser, logOut } from './authAPI';

const initialState = {
  loggedInUser: null,
  status: 'idle',
  error: null
};

export const createUserAsync = createAsyncThunk(
  'user/createUser',
  async (userData) => {
    const response = await createUser(userData);
    return response.data;
  }
);

export const checkUserAsync = createAsyncThunk(
  'user/checkUser',
  async (userData) => {
    const response = await checkUser(userData);
    return response.data;
  }
);

export const logOutAsync = createAsyncThunk(
  'user/logOut',
  async (userId) => {
    const response = await logOut(userId);
    return response.data;
  }
);


export const authSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    // incrementByAmount: (state, action) => {
    //   state.value += action.payload;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
      })
      .addCase(checkUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(checkUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = action.payload;
        state.error = null
      })
      .addCase(checkUserAsync.rejected, (state, action) => {
        state.status = 'idle';
        state.error = action.error;
      })
      .addCase(logOutAsync.pending, (state, action) => {
        state.status = 'loading';
      })
      .addCase(logOutAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.loggedInUser = null;
      });
  },
});

// export const {  } = authSlice.actions;
export const selectLoggedInUser = (state) => state.auth.loggedInUser;
export const selectError = (state) => state.auth.error;
export default authSlice.reducer;
