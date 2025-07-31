// Simple test script to verify authentication
const axios = require('axios');

const BASE_URL = 'http://localhost:5000/api';

async function testAuth() {
    console.log('🧪 Testing Authentication System...\n');

    try {
        // Test 1: Admin Login with default credentials
        console.log('1️⃣ Testing Admin Login...');
        const adminLoginResponse = await axios.post(`${BASE_URL}/auth/admin/login`, {
            email: 'mwambutsadaryce@gmail.com',
            password: 'Ineza2005'
        });
        
        console.log('✅ Admin login successful');
        console.log('Token:', adminLoginResponse.data.data.token.substring(0, 50) + '...');
        
        const adminToken = adminLoginResponse.data.data.token;

        // Test 2: Admin Profile with token
        console.log('\n2️⃣ Testing Admin Profile...');
        const adminProfileResponse = await axios.get(`${BASE_URL}/auth/admin/profile`, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        
        console.log('✅ Admin profile retrieved');
        console.log('Admin:', adminProfileResponse.data.data);

        // Test 3: User Registration
        console.log('\n3️⃣ Testing User Registration...');
        const userRegisterResponse = await axios.post(`${BASE_URL}/users/register`, {
            fullName: 'Test User',
            email: 'testuser@example.com',
            password: 'password123',
            phoneNumber: '+250788123456'
        });
        
        console.log('✅ User registration successful');
        console.log('User ID:', userRegisterResponse.data.data.id);

        // Test 4: User Login
        console.log('\n4️⃣ Testing User Login...');
        const userLoginResponse = await axios.post(`${BASE_URL}/users/login`, {
            email: 'testuser@example.com',
            password: 'password123'
        });
        
        console.log('✅ User login successful');
        console.log('Token:', userLoginResponse.data.data.token.substring(0, 50) + '...');
        
        const userToken = userLoginResponse.data.data.token;

        // Test 5: User Profile with token
        console.log('\n5️⃣ Testing User Profile...');
        const userProfileResponse = await axios.get(`${BASE_URL}/users/me`, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        
        console.log('✅ User profile retrieved');
        console.log('User:', userProfileResponse.data.data);

        // Test 6: User Logout
        console.log('\n6️⃣ Testing User Logout...');
        const userLogoutResponse = await axios.post(`${BASE_URL}/users/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${userToken}`
            }
        });
        
        console.log('✅ User logout successful');

        // Test 7: Admin Logout
        console.log('\n7️⃣ Testing Admin Logout...');
        const adminLogoutResponse = await axios.post(`${BASE_URL}/auth/admin/logout`, {}, {
            headers: {
                'Authorization': `Bearer ${adminToken}`
            }
        });
        
        console.log('✅ Admin logout successful');

        console.log('\n🎉 All tests passed! Authentication system is working correctly.');

    } catch (error) {
        console.error('❌ Test failed:', error.response?.data || error.message);
    }
}

// Run the test if this file is executed directly
if (require.main === module) {
    testAuth();
}

module.exports = testAuth; 