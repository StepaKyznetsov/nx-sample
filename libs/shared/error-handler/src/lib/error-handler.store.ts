import { signalStore, withState, withMethods, patchState } from '@ngrx/signals';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { ErrorHandlerState } from './error-handler.model';
import { HttpErrorResponse } from '@angular/common/http';

const errorHandlerInitialState: ErrorHandlerState = {
  code: -1,
  message: undefined,
};

export const ErrorHandlerStore = signalStore(
  { providedIn: 'root' },
  withState<ErrorHandlerState>(errorHandlerInitialState),
  withMethods((store, router = inject(Router)) => ({
    handleError401: ({ status, message }: HttpErrorResponse) => {
      patchState(store, {
        code: status,
        message,
      });
      router.navigate(['/login']);
    },
    handleError404: ({ status, message }: HttpErrorResponse) => {
      patchState(store, {
        code: status,
        message,
      });
      router.navigate(['/']);
    },
  }))
);
