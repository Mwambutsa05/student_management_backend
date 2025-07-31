// Simple test to check route loading
console.log('Testing route loading...');

try {
    console.log('1. Testing app.js...');
    const app = require('./src/app');
    console.log('✅ app.js loaded successfully');
    
    console.log('2. Testing routes index...');
    const routes = require('./src/routes');
    console.log('✅ routes index loaded successfully');
    
    console.log('3. Testing user routes...');
    const userRoutes = require('./src/entities/user/userRoutes');
    console.log('✅ user routes loaded successfully');
    
    console.log('4. Testing user controller...');
    const userController = require('./src/entities/user/UserController');
    console.log('✅ user controller loaded successfully');
    
    console.log('✅ All modules loaded successfully!');
} catch (error) {
    console.error('❌ Error loading modules:', error.message);
    console.error('Stack:', error.stack);
} 