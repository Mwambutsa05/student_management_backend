class RegistrationDTO {
    constructor({ fullName, email, password, username, phoneNumber, dateOfBirth }) {
        this.fullName = fullName;
        this.email = email;
        this.password = password;
        this.username = username;
        this.phoneNumber = phoneNumber;
        this.dateOfBirth = dateOfBirth;
    }
}
module.exports = RegistrationDTO;