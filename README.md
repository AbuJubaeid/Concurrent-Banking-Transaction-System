# Concurrent Banking Transaction System:

Concurrent Banking Transaction System is a MERN-based application that
supports deposit, withdraw, and transfer operations while ensuring safe
concurrent transaction handling. The system uses optimistic concurrency
control and MongoDB transactions to prevent race conditions and maintain
consistent account balances.

# Frontend Setup:

1. Install dependencies
   => npm install

2. Start frontend
   => npm run dev

# Backend Setup:

1. Clone the repository
   => git clone <repo-link>

2. Install dependencies
   => npm install

3. Create .env file
   USER_DB = your_mongodb_user
   USER_PASS= your_mongodb_password
   SITE_DOMAIN = http://localhost:5173

4. Start the backend server
   => npm run dev

# Architecture Explanation:

FrontEnd=> The frontend of the Concurrent Banking Transaction System is built with React and uses Tailwind CSS for styling. It interacts with the backend via REST API calls and receives real-time updates using Socket.IO. The key architectural components are as follows.
(React, React Router / React Router DOM, Axios, Socket.IO Client, TailwindCSS / @tailwindcss/vite, SweetAlert2)

BackEnd=> The backend of the Concurrent Banking Transaction System is built using Node.js and Express.js, with MongoDB as the database and Socket.IO for real-time communication. It is designed to safely handle high-concurrency financial transactions.
(Express, MongoDB Driver, Socket.IO, dotenv, CORS)

1. User performs a transaction.
2. Frontend sends request to API.
3. Backend processes transaction.
4. MongoDB transaction ensures atomic updates.
5. Socket.IO emits real-time events.

# Concurrency Control Strategy:

The system prevents race conditions using a combination of:

1. MongoDB ACID Transactions
   Transfer operations use MongoDB sessions and transactions to ensure
   both account updates happen atomically.

2. Balance Validation
   Withdrawals and transfers check that the account balance is sufficient
   before updating.

3. Version Field (Optimistic Concurrency)
   Each account contains a version number that increments after every
   update, allowing the system to track concurrent modifications.

4. Atomic Updates
   MongoDB $inc operations ensure balance updates happen safely even
   under high concurrency.
