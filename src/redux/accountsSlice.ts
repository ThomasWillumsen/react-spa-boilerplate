import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { createBoilerplateApiClient } from '../api/ApiClientFactory';
import { AccountResponse, ApiError, ApiErrorResponse, CreateAccountRequest, UpdateAccountRequest } from '../api/generated';
import { handleRejected, handlePending, StatusSliceBase, genericApiErrorMessage, initialStateBase } from './sliceHelper';
import { RootState } from './store';
import { useAppSelector, useAppDispatch } from "../hooks/hooks";

export interface AccountsState {
  Accounts: AccountResponse[];
  
  GetAccountsRequest: StatusSliceBase;
  UpdateAccountRequest: StatusSliceBase;
  CreateAccountRequest: StatusSliceBase;
  DeleteAccountRequest: StatusSliceBase;
}
const initialState: AccountsState = {
  Accounts: [],
  GetAccountsRequest: { ...initialStateBase },
  UpdateAccountRequest: { ...initialStateBase },
  CreateAccountRequest: { ...initialStateBase },
  DeleteAccountRequest: { ...initialStateBase },
};

export const GetAccountsAsync = createAsyncThunk(
  'accounts/getAccounts',
  async (_, { rejectWithValue }) => {
    try {
      return await createBoilerplateApiClient().accounts.getAccounts()
    } catch (err) {
      return rejectWithValue(genericApiErrorMessage);
    }
  },
  { condition: (_, { getState }) => (getState() as RootState).accounts.GetAccountsRequest.status !== "loading" }
);

export const CreateAccountAsync = createAsyncThunk(
  'accounts/createAccount',
  async (obj: CreateAccountRequest, { rejectWithValue }) => {
    try {
      return await createBoilerplateApiClient().accounts.createAccount(obj)
    } catch (err) {
      var error = (err as ApiError).body as ApiErrorResponse
      var errorTranslations: any = {
        10301: "The provided email address is already in use."
      }

      return rejectWithValue(errorTranslations[error.errorCode] || genericApiErrorMessage);
    }
  },
  { condition: (_, { getState }) => (getState() as RootState).accounts.CreateAccountRequest.status !== "loading" }
);

export const UpdateAccountAsync = createAsyncThunk(
  'accounts/updateAccount',
  async (obj: { id: number, body: UpdateAccountRequest}, { rejectWithValue }) => {
    try {
      return await createBoilerplateApiClient().accounts.updateAccount(obj.id, obj.body)
    } catch (err) {
      var error = (err as ApiError).body as ApiErrorResponse
      var errorTranslations: any = {
        10301: "The provided email address is already in use."
      }

      return rejectWithValue(errorTranslations[error.errorCode] || genericApiErrorMessage);
    }
  },
  { condition: (_, { getState }) => (getState() as RootState).accounts.UpdateAccountRequest.status !== "loading" }
);

export const DeleteAccountAsync = createAsyncThunk(
  'accounts/deleteAccount',
  async (id: number, { rejectWithValue }) => {
    try {
      await createBoilerplateApiClient().accounts.deleteAccount(id)
      return id
    } catch (err) {
      return rejectWithValue(genericApiErrorMessage);
    }
  },
  { condition: (_, { getState }) => (getState() as RootState).accounts.DeleteAccountRequest.status !== "loading" }
);

export const AccountsSlice = createSlice({
  name: 'Accounts',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(GetAccountsAsync.pending, (state) => handlePending(state.GetAccountsRequest));
    builder.addCase(GetAccountsAsync.rejected, (state, { payload }) => handleRejected(state.GetAccountsRequest, payload as string));
    builder.addCase(GetAccountsAsync.fulfilled, (state, action) => {
      state.GetAccountsRequest.status = 'idle';
      state.Accounts = action.payload;
    });

    builder.addCase(CreateAccountAsync.pending, (state) => handlePending(state.CreateAccountRequest));
    builder.addCase(CreateAccountAsync.rejected, (state, { payload }) => handleRejected(state.CreateAccountRequest, payload as string));
    builder.addCase(CreateAccountAsync.fulfilled, (state, action) => {
      state.CreateAccountRequest.status = 'idle';
      state.Accounts.push(action.payload);
    });

    builder.addCase(UpdateAccountAsync.pending, (state) => handlePending(state.UpdateAccountRequest));
    builder.addCase(UpdateAccountAsync.rejected, (state, { payload }) => handleRejected(state.UpdateAccountRequest, payload as string));
    builder.addCase(UpdateAccountAsync.fulfilled, (state, action) => {
      state.UpdateAccountRequest.status = 'idle';
      state.Accounts = state.Accounts.map(a => a.id === action.payload.id ? action.payload : a);
    });

    builder.addCase(DeleteAccountAsync.pending, (state) => handlePending(state.DeleteAccountRequest));
    builder.addCase(DeleteAccountAsync.rejected, (state, { payload }) => handleRejected(state.DeleteAccountRequest, payload as string));
    builder.addCase(DeleteAccountAsync.fulfilled, (state, action) => {
      state.DeleteAccountRequest.status = 'idle';
      state.Accounts = state.Accounts.filter(a => a.id !== action.payload);
    });
  },
});

export const selectAccountById = (id: number | null) => (state: RootState) => {
  if(id === null)
    return null;
  return state.accounts.Accounts.find(a => a.id === id) || null;
};

export const selectAccountsState = (state: RootState) => {
  return {
    accounts: state.accounts.Accounts,
    status: state.accounts.GetAccountsRequest.status,
    errorMessage: state.accounts.GetAccountsRequest.errorMessage
  }
};
export const selectUpdateAccountState = (state: RootState) => {
  return {
    status: state.accounts.UpdateAccountRequest.status,
    errorMessage: state.accounts.UpdateAccountRequest.errorMessage
  }
};
export const selectCreateAccountState = (state: RootState) => {
  return {
    status: state.accounts.CreateAccountRequest.status,
    errorMessage: state.accounts.CreateAccountRequest.errorMessage
  }
};

export const selectDeleteAccountState = (state: RootState) => {
  return {
    status: state.accounts.DeleteAccountRequest.status,
    errorMessage: state.accounts.DeleteAccountRequest.errorMessage
  }
};

export const useAccounts = () => {
  var accountsState = useAppSelector(selectAccountsState);
	var dispatch = useAppDispatch();

	if(accountsState.status === "idle" && accountsState.accounts.length === 0)
		dispatch(GetAccountsAsync());

	return accountsState
}


export default AccountsSlice.reducer;