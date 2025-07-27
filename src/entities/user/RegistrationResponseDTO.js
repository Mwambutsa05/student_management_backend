class RegistrationResponseDTO {
    constructor(user) {
        this.id = user.id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.username = user.username;
        this.phoneNumber = user.phoneNumber;
        this.dateOfBirth = user.dateOfBirth;
        this.status = user.status;
        this.createdAt = user.createdAt;
    }
}
module.exports = RegistrationResponseDTO;