import { FormControl } from "@angular/forms";

// Validations : Allow  Numeric char 
export class NumericFieldValidator {
    static validNumericField(fc:FormControl){
        if(fc.value != undefined && fc.value != "" && fc.value != null){
            const regex = /[0-9 ]+/ ;
            if(regex.test(fc.value)){
                    return null;
            }else{
                    return {validNumericField: true}
            }
        }else{
            return null;
        }

    }

}