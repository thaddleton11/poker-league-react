import {Validator} from "./Validator";


export class AddUserValidation extends Validator{
    constructor(first, last) {
        super();
        return {
            first: this.isString(first),
            last: this.isString(last),
        }
    }


}