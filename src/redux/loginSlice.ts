import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoilerplateApiClient } from '../api/ApiClientFactory';
import { ApiError, ApiErrorResponse } from '../api/generated';
import { genericApiErrorMessage, handlePending, handleRejected, initialStateBase, StatusSliceBase } from './sliceHelper';
import { AppThunk, RootState } from './store';

export const localStorageAuthUserKey = "token";

export interface LoginState {
  updateLoginPasswordRequest: StatusSliceBase
  loginRequest: StatusSliceBase
  jwt: string | null;
}
const initialState: LoginState = {
  jwt: localStorage.getItem(localStorageAuthUserKey),
  loginRequest: { ...initialStateBase },
  updateLoginPasswordRequest: { ...initialStateBase },
};

export const loginAsync = createAsyncThunk(
  'login/authenticate',
  async (request: { email: string; password: string; }, { rejectWithValue }) => {
    try {
      const response = await createBoilerplateApiClient().accounts.loginAccount({ email: request.email, password: request.password })
      localStorage.setItem(localStorageAuthUserKey, response.jwt);
      return response;
    } catch (err) {
      var error = (err as ApiError).body as ApiErrorResponse
      var errorTranslations: any = {
        10101: "The provided email address or password is incorrect.",
      }

      return rejectWithValue(errorTranslations[error.errorCode] || genericApiErrorMessage);
    }
  },
  { condition: (_, { getState }) => (getState() as RootState).login.loginRequest.status !== "loading" }
);

export const updateLoginPasswordAsync = createAsyncThunk(
  'login/updatePassword',
  async (request: { resetPasswordToken: string; password: string; }, { rejectWithValue }) => {
    try {
      await createBoilerplateApiClient().accounts.updateAccountPassword({ resetPasswordToken: request.resetPasswordToken, password: request.password })
      return true;
    } catch (err) {
      var error = (err as ApiError).body as ApiErrorResponse
      var errorTranslations: any = {
        10201: "Linket er udløbet."
      }

      return rejectWithValue(errorTranslations[error.errorCode] || genericApiErrorMessage);
    }
  },
  { condition: (_, { getState }) => (getState() as RootState).login.updateLoginPasswordRequest.status !== "loading" }
);

export const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    logout: state => {
      state.jwt = null;
    }
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => handlePending(state.loginRequest));
    builder.addCase(loginAsync.rejected, (state, { payload }) => handleRejected(state.loginRequest, payload as string));
    builder.addCase(loginAsync.fulfilled, (state, action) => {
      state.loginRequest.status = 'idle';
      state.jwt = action.payload.jwt;
    });

    builder.addCase(updateLoginPasswordAsync.pending, (state) => handlePending(state.updateLoginPasswordRequest));
    builder.addCase(updateLoginPasswordAsync.rejected, (state, { payload }) => handleRejected(state.updateLoginPasswordRequest, payload as string));
    builder.addCase(updateLoginPasswordAsync.fulfilled, (state, action) => {
      state.updateLoginPasswordRequest.status = 'idle';
      state.updateLoginPasswordRequest.successMessage = "Your password has been updated. Please login again.";
    });
  },
});

export const selectLoginState = (state: RootState) => state.login.loginRequest;
export const selectIsLoggedIn = (state: RootState) => state.login.jwt != null;
export const selectLoginFullname = (state: RootState) => state.login.jwt != null ?
  JSON.parse(atob(state.login.jwt.split('.')[1])).fullName : "";
export const selectUpdateLoginPasswordState = (state: RootState) => state.login.updateLoginPasswordRequest;


export const logout = (): AppThunk => (dispatch, getState) => {
  localStorage.removeItem(localStorageAuthUserKey);
  dispatch(loginSlice.actions.logout());
};


export default loginSlice.reducer;


