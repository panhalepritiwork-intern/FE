# Task Tracker Frontend

This is the frontend part of the Task Tracker project.  
It is made with React + TypeScript + Firebase.  
This project shows login, signup, mobile OTP, and task list UI.


# How to Run

Follow these steps:

1. Clone this repo  
   ```bash
   git clone https://github.com/panhalepritiwork-intern/FE
   cd FE
2. Install packages

       npm install

4. Add Firebase config
  In src/firebase.ts,
  put your Firebase project config.

  Example:
      
      const firebaseConfig = {
          apiKey: "your_api_key",
          authDomain: "your_project.firebaseapp.com",
          projectId: "your_project_id",
          storageBucket: "your_project.appspot.com",
          messagingSenderId: "your_sender_id",
          appId: "your_app_id",
      };
  
4. Start project

         npm run dev
         Open browser at http://localhost:5173

# Features
      -Login and Sign Up with Email + Password
      -Email verification after sign up
      -Sign in with Mobile OTP (Firebase Phone Auth)
      -Toast notification for messages
      -Dark mode / Light mode switch
      -Home page to manage tasks

# Folder Info
      -src/components ---  Login, SignUp, PhoneAuth, AuthPage
      -src/pages ---  HomePage (task list UI)
      -src/assets ---  CSS and images
      -src/firebase.ts ---  Firebase config

# Flow 
  When the app is opened, first the AuthPage is shown. Here the user can sign up by entering name, email, and password. After sign up, a verification email is sent. Later, the user can log in by entering the    same email and password, and it will work only if the email is verified. Another option is Phone OTP. In this case, the user enters a phone number, receives an OTP, and after entering the OTP, login becomes   successful. Once the user is logged in, the HomePage is displayed, where the tasks are shown.
