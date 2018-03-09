import { AbstractControl } from '@angular/forms';

export class UserLoginValidators {
    static validUserName(control: AbstractControl) {
        const regexp = /(?:[1-9]{10}|(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,}))/i;
        const valid = regexp.test(control.value);
        return valid ? null : { invalidUserName: true };
    }
    static validPassword(control: AbstractControl) {
        const regexp = /^.{4,}$/i;
        const valid = regexp.test(control.value);
        return valid ? null : { invalidPassword: true };
    }
}