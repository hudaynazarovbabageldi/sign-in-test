Test Project: Login & Two-Factor Authentication (2FA)
Overview

This is a React + TypeScript test project demonstrating a Login page and a Two-Factor Authentication (2FA) page. It includes:

Email & password login with validation.

Password visibility toggle (eye icon).

Mock login logic (info@mail.com / 123456).

OTP (6-digit) input for 2FA.

Countdown timer for requesting new OTP codes.

Mock OTP verification (131311).

Toast notifications for success/failure.

This project is intended for testing and demonstration purposes, not production use.

Tech Stack

React with functional components & hooks

TypeScript

React Hook Form + Zod for form validation

React Query (Tanstack) for async actions/mutations

Tailwind CSS for styling

Lucide React for icons

Custom UI Components: Button, Input, Card, OTP Input

Pages

1. Login Page

Inputs: Email & Password

Validation:

Email required, valid format

Password required, 6–100 characters

Password toggle with eye icon

Mock login logic:

Email: info@mail.com
Password: 123456

Toast notifications for login success/failure

Button active only when inputs are filled

2. Two-Factor Authentication (2FA) Page

OTP Input: 6-digit code

Validation: Must be exactly 6 numbers

Countdown Timer: 60 seconds before requesting a new code

Mock OTP logic:

Valid OTP: 131311

Toast notifications for verification success/failure

“Continue” button enabled as soon as OTP is filled

Installation

Clone the repository:

git clone <https://github.com/hudaynazarovbabageldi/sign-in-test>
cd <sign-in-test>

Install dependencies:

pnpm install

# or

npm install

# or

yarn install

Start the development server:

pnpm run dev

# or

npm run dev

# or

yarn dev

The app will run at http://localhost:8080.

Testing the Project
Login Test

Navigate to /login.

Enter email: info@mail.com

Enter password: 123456

Click Log in → should see success toast.

2FA Test

After login, navigate to /2fa.

Enter OTP: 131311

Click Continue → should see success toast.

Enter any other OTP → should see error toast.

Try requesting a new OTP → button disabled for 60 seconds.

Notes

The login and 2FA logic is mocked for testing purposes.

Toasts are used to simulate backend responses.

Countdown timers and input validations mimic real-world behavior.

Optional Improvements

Connect to a real backend for login & 2FA verification.

Add routing & protected pages after login.

Enhance UI/UX with animations or accessibility improvements.

This README gives a complete overview for a work test project.

If you want, I can also write a very short “Quick Test Guide” version for your manager or reviewer so they can test it in 1–2 minutes. Do you want me to do that?
