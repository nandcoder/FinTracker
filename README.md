# FinTracker
FinTracker is a bill splitting application made using React and Firebase. It allows you to easily split bills with your friends, roommates, or coworkers. You can create groups, add expenses, and see who owes who what. You can also settle your debts with PayPal or RazorPay directly from the app.

Features
Create and join groups with unique codes
Add expenses and choose how to split them (equally, by percentage, by amount, etc.)
See your balance and transactions history in each group
Settle your debts with PayPal or Razorpay
Sync your data across devices with Firebase
Get notifications when someone adds or settles an expense
Installation
To run this app locally, you need to have Node.js and npm installed on your machine. You also need to create a Firebase project and enable authentication, Firestore, and Cloud Functions.

Clone this repository: git clone https://github.com/nandcoder/fintracker.git
Install the dependencies: npm install
Create a .env file in the root directory and add your Firebase configuration variables (see .env.example for reference)
Start the development server: npm start
Open http://localhost:3000 in your browser
Deployment
To deploy this app to Firebase Hosting, you need to have the Firebase CLI installed and logged in.

Build the app for production: npm run build
Initialize Firebase Hosting: firebase init hosting
Choose the Firebase project you created earlier
Specify build as the public directory
Deploy the app: firebase deploy
License
This project is licensed under the MIT License - see the LICENSE file for details.