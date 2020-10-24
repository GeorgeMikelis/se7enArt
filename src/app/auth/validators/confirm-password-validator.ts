import { AbstractControl, FormGroup } from '@angular/forms';

export function confirmPasswordValidator(
  group: FormGroup
): { [key: string]: boolean } | null {
  if (
    group.value.password === group.value.password2
  ) {
    return { passwordsDontMatch: true };
  } else {
    return null;
  }
}
