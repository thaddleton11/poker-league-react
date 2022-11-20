import sanitize from 'sanitize-html';

export class Validator {
    constructor() {
        this.errors = [];
    }

    isString(input) {
        if( input === "" ) {
            this.errors.push("Cannot be empty");
        }
        if( input.length > 255 ) {
            this.errors.push("Too long");
        }
        return sanitize(input);
    }
}