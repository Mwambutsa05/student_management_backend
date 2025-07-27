class LoginDTO {
    constructor({ identifier, password }) {
        this.identifier = identifier; // email or username
        this.password = password;
    }
}
module.exports = LoginDTO;
