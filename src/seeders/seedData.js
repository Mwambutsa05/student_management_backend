const { sequelize } = require('../config/database');
const User = require('../entities/user/User');
const bcrypt = require('bcryptjs');

module.exports = async () => {
    try {
        // Create default admin if not exists
        const [admin, created] = await User.findOrCreate({
            where: { email: 'mwambutsadaryce@gmail.com' },
            defaults: {
                full_name: 'System Admin',
                password: await bcrypt.hash('Ineza2005', 10),
                role: 'admin',
                status: 'active'
            }
        });

        if (created) {
            console.log('Default admin created:', admin.email);
        } else {
            console.log('Admin already exists:', admin.email);
        }

        // Add other seed data as needed...
    } catch (error) {
        console.error('Seeding failed:', error);
        process.exit(1);
    }
};