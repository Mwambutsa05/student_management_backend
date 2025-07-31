class ProfileDTO {
    constructor(user) {
        this.id = user.id;
        this.fullName = user.full_name; // Database field is full_name
        this.email = user.email;
        this.username = user.username;
        this.phoneNumber = user.phoneNumber;
        this.dateOfBirth = user.dateOfBirth;
        this.profileImage = user.profileImage;
        this.status = user.status;
        this.role = user.role;
        this.createdAt = user.created_at; // Database field is created_at
        this.updatedAt = user.updated_at; // Database field is updated_at
    }
}

module.exports = ProfileDTO; 