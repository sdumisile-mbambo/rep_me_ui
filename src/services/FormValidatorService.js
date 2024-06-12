/* eslint-disable no-useless-escape */
const FormValidatorService = {
  /*
   * Tests validity of entered password.
   */
  verifyPassword(password) {
    const regularExpression = /[ !@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/;
    console.log('validating password');
    let isValid = false;
    if (password.length >= 8) {
      if (/[A-Z]/.test(password)) {
        if (/[a-z]/.test(password)) {
          if (/\d/.test(password)) {
            if (regularExpression.test(password)) {
              isValid = true;
            }
          }
        }
      }
    }
    return isValid;
  },

  /*
   * Tests if the string in the confirm password text field
   * is equal to the password text.
   */
  verifyConfirmPassword(confrimPassword, password) {
    return confrimPassword === password;
  },

  /*
   * Tests validity of entered email adddress.
   */
  verifyEmail(email) {
    const regularExpression = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return regularExpression.test(email);
  },

  /*
   * Tests validity of entered phone number.
   */
  verifyPhoneNumber(phoneNumber) {
    const regularExpression = /^[+]*[(]{0,1}[0-9]{1,4}[)]{0,1}[-\s\./0-9]*$/;
    return regularExpression.test(phoneNumber);
  },
};

export default FormValidatorService;
