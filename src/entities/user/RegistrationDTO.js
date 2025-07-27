class RegistrationDTO {
    constructor({ fullName, email, username, phoneNumber, dateOfBirth, status, password, confirmPassword }) {
        this.fullName = fullName;
        this.email = email;
        this.username = username || null;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
        this.status = status || 'pending';
        this.password = password;
        this.confirmPassword = confirmPassword;
    }
}
module.exports = RegistrationDTO;
