export const validateUsername = (username) => {
    if (typeof username !== 'string' || username.length < 6) {
      return false;
    }
    return true;
  };
  
export const validateFullName = (fullName) => {
    if (typeof fullName !== 'string' || !/\s/.test(fullName)) {
      return false;
    }
    return true;
  };
  
export const validateEmail = (email) => {
    // Regular expression for validating email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
export const validatePhoneNumber = (phoneNumber) => {
    // Regular expression for validating Nigerian phone numbers
    const phoneRegex = /^(080|090|070|091|081)\d{8}$/;
    return phoneRegex.test(phoneNumber);
  };
  export const validateformat=(phonenumber)=>{
    const phoneRegex = /^(080|090|070|091|081)\d*$/;
     return phoneRegex.test(phonenumber)
  }
  
export const validateAgree = (agree) => {
    return typeof agree === 'boolean';
  };
  
export const validatePin = (pin) => {
    // Regular expression for validating 4-digit numeric pin
    const pinRegex = /^\d{4}$/;
    return pinRegex.test(pin);
  };
  
  // Password validation function accepts any data type
export const validatePassword = (password) => {
    return true;
  };
  
  // Usage examples
  console.log(validateUsername("john")); // false
  console.log(validateFullName("John Doe")); // true
  console.log(validateEmail("john@example.com")); // true
  console.log(validatePhoneNumber("08012345678")); // true
  console.log(validateAgree(true)); // true
  console.log(validatePin("1234")); // true
  console.log(validatePassword("password123")); // true
 
  