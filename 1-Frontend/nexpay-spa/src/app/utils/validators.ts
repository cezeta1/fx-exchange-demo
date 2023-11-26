import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const CEZ_Validators = {
  notEqualValidator:
    (ctrl2: AbstractControl | null): ValidatorFn =>
    (ctrl: AbstractControl): ValidationErrors | null => {
      const value = ctrl.value;
      const value2 = ctrl2?.value;

      if (!value || !value2) return null;

      return value === value2 ? { repeatedValue: true } : null;
    },
};
