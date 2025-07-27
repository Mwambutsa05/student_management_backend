class RegistrationResponseDTO {
    constructor(user) {
        this.fullName = user.fullName;
        this.email = user.email;
        this.username = user.username || null;
        this.phoneNumber = user.phoneNumber;
        this.dateOfBirth = user.dateOfBirth;
        this.status = user.status;
        this.profileImage = user.profileImage || null;
        this.createdAt = user.createdAt;
    }
}
module.exports = RegistrationResponseDTO;
