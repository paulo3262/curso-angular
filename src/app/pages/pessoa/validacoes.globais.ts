import { FormControl } from '@angular/forms';

export function customValidation(a: FormControl) {
    if (a.value == "paulo@paulo.com") {
        return null;
    } else {
        return {
            validacao: "validação Errada"
        }
    }

}