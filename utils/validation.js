function isValidEmail(email) {
    return email.includes("@")
  }
  
  function isValidPhone(phone) {
    return /^\d{3}-\d{3}-\d{4}$/.test(phone)
  }
  
  module.exports = { isValidEmail, isValidPhone }
  