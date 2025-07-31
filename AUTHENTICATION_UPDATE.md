# Authentication System Update

## Overview
The authentication system has been updated to separate admin and user authentication with proper JWT token handling and Swagger integration.

## Changes Made

### 1. Admin Authentication (`/auth` routes)
- **Default Admin Credentials**: `mwambutsadaryce@gmail.com` / `Ineza2005`
- **Routes**:
  - `POST /api/auth/admin/login` - Admin login
  - `POST /api/auth/admin/register` - Register new admin
  - `GET /api/auth/admin/profile` - Get admin profile
  - `POST /api/auth/admin/logout` - Admin logout

### 2. User Authentication (`/users` routes)
- **Routes**:
  - `POST /api/users/register` - User registration
  - `POST /api/users/login` - User login
  - `GET /api/users/me` - Get user profile
  - `PUT /api/users/me` - Update user profile
  - `PATCH /api/users/me/avatar` - Update user avatar
  - `POST /api/users/logout` - User logout

### 3. JWT Token Integration
- All authentication responses include JWT tokens
- Tokens are used for authorization in protected routes
- Swagger UI includes "Authorize" button for token input

### 4. Database Updates
- User model supports `admin` and `user` roles
- Status field supports `active`, `inactive`, `suspended`
- Default admin is seeded automatically

### 5. Middleware Updates
- Auth middleware handles both default admin and database users
- Role-based access control implemented
- Proper error handling for invalid tokens

### 6. Swagger Documentation
- Updated to include admin and user authentication schemas
- JWT token authorization support
- Clear examples for all endpoints

## How to Use

### 1. Start the Server
```bash
npm start
```

### 2. Access Swagger Documentation
- Visit: `http://localhost:5000/api-docs`
- Click "Authorize" button to add JWT token
- Test endpoints directly from Swagger UI

### 3. Admin Authentication
```bash
# Login with default admin
curl -X POST http://localhost:5000/api/auth/admin/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "mwambutsadaryce@gmail.com",
    "password": "Ineza2005"
  }'
```

### 4. User Authentication
```bash
# Register new user
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "fullName": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login user
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

### 5. Using JWT Tokens
```bash
# Use token in Authorization header
curl -X GET http://localhost:5000/api/users/me \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

## Testing
Run the test script to verify everything works:
```bash
node test_auth.js
```

## Key Features
- ✅ Separate admin and user authentication
- ✅ Default admin credentials
- ✅ JWT token-based authorization
- ✅ Swagger documentation with authorization
- ✅ Role-based access control
- ✅ Proper error handling
- ✅ Database seeding with default admin

## Security Notes
- JWT tokens expire after 1 day
- Passwords are hashed using bcrypt
- Admin routes require admin role
- User routes require user role
- All sensitive routes require authentication 