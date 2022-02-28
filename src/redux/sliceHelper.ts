export const genericApiErrorMessage = "Unknown error. Please try again later.";

export interface StatusSliceBase {
  status: 'idle' | 'loading' | 'failed';
  errorMessage: string | null;
  successMessage: string | null;
}

export const initialStateBase: StatusSliceBase = {
  status: 'idle',
  errorMessage: null,
  successMessage: null
};

export const handlePending = (state: StatusSliceBase) => {
    state.status = 'loading';
    state.errorMessage = null;
}

export const handleRejected = (state: StatusSliceBase, errorMessage: string) => {
  state.status = 'failed';
  state.errorMessage = errorMessage;
}
