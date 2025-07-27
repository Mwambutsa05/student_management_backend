class LoginResponseDTO {
    constructor(user, token) {
        this.id = user.id;
        this.fullName = user.fullName;
        this.email = user.email;
        this.username = user.username;
        this.phoneNumber = user.phoneNumber;
        this.profileImage = user.profileImage;
        this.token = token;
    }
}
module.exports = LoginResponseDTO;