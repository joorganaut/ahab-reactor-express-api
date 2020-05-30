const BaseProcessor = require('../BaseProcessor');
class UtilitySystem extends BaseProcessor {
    constructor(props) {
        super(props);

    }
    /*
     * JavaScript implementation of the Luhn algorithm, with calculation and validation functions
     */

    /* luhn_checksum
     * Implement the Luhn algorithm to calculate the Luhn check digit.
     * Return the check digit.
     */
    static luhn_checksum(code) {
        var len = code.length;
        var parity = len % 2;
        var sum = 0;
        for (var i = len - 1; i >= 0; i--) {
            var d = parseInt(code.charAt(i));
            if (i % 2 == parity) {
                d *= 2;
            }
            if (d > 9) {
                d -= 9;
            }
            sum += d;
        }
        return sum % 10;
    }

    /* luhn_calculate
     * Return a full code (including check digit), from the specified partial code (without check digit).
     */
    static GenerateLuhnNumber(partcode) {
        var checksum = this.luhn_checksum(partcode + "0");
        return checksum == 0 ? 0 : 10 - checksum;
    }

    /* luhn_validate
     * Return true if specified code (with check digit) is valid.
     */
    static luhn_validate(fullcode) {
        return GenerateLuhnNumber(fullcode) == 0;
    }

    static CleanStringOfNonDigits(s)
    {
        if (IsNullOrWhiteSpace(s)) return s;
        let cleaned = this.ToCharArray(s).filter(x=> !isNaN(x)).toString().replace(',', '');
        return cleaned;
    }
    static FormatPhonenumberToElevenDigit(PhoneNumber) {

        if (PhoneNumber.length > 11) {
            PhoneNumber = this.CleanStringOfNonDigits(PhoneNumber);
            if (PhoneNumber.startsWith("234")) {
                // PhoneNumber = PhoneNumber.Replace("234", string.Empty);
                PhoneNumber = PhoneNumber.substring(3);
                if (!PhoneNumber.startsWith("0")) {
                    PhoneNumber = "0" + PhoneNumber;
                }

                if (PhoneNumber.length > 11) {
                    PhoneNumber = PhoneNumber.substring(0, 11);
                }

            } else {
                if (!PhoneNumber.startsWith("0")) {
                    PhoneNumber = "0" + PhoneNumber;
                }

                if (PhoneNumber.length > 11) {
                    PhoneNumber = PhoneNumber.substring(0, 11);
                }
            }
        } else {
            PhoneNumber = this.CleanStringOfNonDigits(PhoneNumber);
            if (!this.IsNullOrWhiteSpace(PhoneNumber)) {
                if (!PhoneNumber.startsWith("0")) {
                    PhoneNumber = "0" + PhoneNumber;
                }

                if (PhoneNumber.length > 11) {
                    PhoneNumber = PhoneNumber.substring(0, 11);
                }
            } else {
                PhoneNumber = this.Empty();
            }
        }

        return PhoneNumber;
    }
    static GenerateTempPassword() {
        let result = this.Empty();
        // Make an array of the letters we will use.
        let letters = this.ToCharArray("ABCDEFGHIJKLMNOPQRSTUVWXYZ");
        // Make the words.
        // Make a word.
        let word = "";
        for (let j = 1; j <= 8; j++) {
            // Pick a random number between 0 and 25
            // to select a letter from the letters array.           
            let letter_num =  Math.floor(Math.random() * letters.length);
            // Append the letter.
            result += letters[letter_num];
        }
        return result;
    }
    static GenerateTempPin() {
        let result = this.Empty();
        // Make an array of the letters we will use.
        let letters = this.ToCharArray("0123456789");
        // Make the words.
        // Make a word.
        let word = "";
        for (let j = 1; j <= 5; j++) {
            // Pick a random number between 0 and 25
            // to select a letter from the letters array.           
            let letter_num =  Math.floor(Math.random() * letters.length);
            // Append the letter.
            result += letters[letter_num];
        }
        return result;
    }
}
module.exports = UtilitySystem;