import { AbstractControl } from '@angular/forms';

export function bothUpperCaseLowerCaseValidator(
  control: AbstractControl
): { [key: string]: boolean } | null {
  if (
    control.value === control.value.toUpperCase() ||
    control.value === control.value.toLowerCase()
  ) {
    return { hasNotBothUpperCaseLowerCase: true };
  } else {
    return null;
  }
}
