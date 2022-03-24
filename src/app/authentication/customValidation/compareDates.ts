import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";

export function compareStartEndDates(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const start = control.get('startDate')?.value
    const end = control.get('endDate')?.value

    if (start && end) {
      const isRangeValid = end - start > 0
      return isRangeValid ? null : {compareDate: true}
    }
    return null
  }
}

