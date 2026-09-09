# Forgot Password Testing Guide

## How to Test Forgot Password Functionality

### 1. Start the Backend Server
- Make sure your Spring Boot backend is running on `http://localhost:8080`

### 2. Start the Frontend Server
- Make sure your React frontend is running on `http://localhost:5173`

### 3. Test the Flow

#### Step 1: Go to Login Page
- Navigate to `http://localhost:5173/login`
- Click on "Forgot Password?" link

#### Step 2: Enter Email
- Enter a registered patient or doctor email
- Click "Send Reset Token"
- Check the browser console or backend logs for the generated token

#### Step 3: Use Reset Token
- Copy the token from the console/logs
- Navigate to `http://localhost:5173/reset-password/YOUR_TOKEN_HERE`
- Enter new password and confirm
- Click "Reset Password"

#### Step 4: Test New Password
- Go back to login page
- Login with the email and new password

### 4. API Endpoints

#### Forgot Password
```
POST http://localhost:8080/api/auth/forgot-password
Content-Type: application/json

{
  "email": "patient@example.com"
}
```

#### Reset Password
```
POST http://localhost:8080/api/auth/reset-password
Content-Type: application/json

{
  "token": "generated-token-here",
  "newPassword": "newpassword123"
}
```

### 5. Notes
- Only works for PATIENT and DOCTOR roles (not ADMIN)
- Tokens expire after 1 hour
- Each token can only be used once
- In production, the token would be sent via email instead of displayed in console