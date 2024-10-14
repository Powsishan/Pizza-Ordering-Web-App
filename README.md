# 🍕Pizza Ordering Web App

## 📝 Overview

The Pizza Ordering Web App is a full-stack application that allows users to browse a menu, customize their pizza orders, and make reservations. The application features an admin dashboard for managing the pizza menu and reservations, built with a modern tech stack.

## 📑 Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Installation](#installation)
- [Usage](#usage)
- [Admin Dashboard](#admin-dashboard)
- [API Endpoints](#api-endpoints)
- [License](#license)

## 🎉 Features

- **User Authentication**: Secure login using JWT tokens.
- **Menu Management**: Admins can add, edit, and delete pizza items effortlessly.
- **Reservation Management**: Admins can view and manage customer reservations in real-time.
- **Search Functionality**: The admin dashboard includes a search feature that allows searching for pizzas or reservations.
- **Responsive Design**: Enjoy a seamless experience on both desktop and mobile devices.

## 💻 Tech Stack

- **Frontend**: 
  - React.js
  - Tailwind CSS
- **Backend**: 
  - Node.js
  - Express.js
- **Database**: MongoDB
- **Version Control**: Git, GitHub

## ⚙️ Installation

To get a local copy of the project up and running, follow these steps:

1. Clone the repository:

   ```bash
   git clone https://github.com/Powsishan/Pizza-Ordering-Web-App.git

2. Navigate to the project directory:

```bash 
cd Pizza-Ordering-Web-App
```


3. Install backend dependencies:

```bash
cd backend
npm install
```

4. Install frontend dependencies:

```bash
cd ../frontend
npm install
```
5. **Configure environment variables:**
Create a .env file in the backend directory and configure your environment variables, including the **MongoDB** connection string.



## ▶️Usage

To start both the frontend and backend servers simultaneously, run the following command from the root directory of the project:

```bash
npm start
```

This command utilizes concurrently to start both servers. Open your web browser and go to http://localhost:3000 to view the application.




## 🔐**Admin Dashboard**
Tech Stack
- **Frontend**: 
  - React.js
  - Tailwind CSS
- **Backend**: 
  - Node.js
  - Express.js
**Authentication** 
## Admin User Name and Password
```bash
Username: Admin@gmail.com
Password: admin
```


Admin login utilizes JWT-based authentication for secure access.
Admin Features
Login Page:

Admin logs in using JWT-based authentication.

## Dashboard:

Manage the pizza menu and view customer reservations.

**Menu Management:**

Admin can add, edit, and delete pizza items, providing:
- Name 
- Description
- Price
- Image URL

**Reservation Management:**

View reservations made by users, displaying:

- Customer's name
- Contact information
- Reservation date and time
- Number of people

**Updating reservation status**

Admin can update the reservation status 
- default pending
- Accepted 
- Rejected 

**Admin UI Design**

- Use Tailwind CSS to create an intuitive and user-friendly interface.
## 📡API Endpoints
**Authentication**

- POST /login: Admin login with JWT token generation.


**Menu API**

- GET /menu: Retrieve the list of pizzas.
- POST /menu: Add a new pizza (admin only).
- PUT /menu/: Edit a pizza (admin only).
- DELETE /menu/: Delete a pizza (admin only).

**Reservation API**
- POST /reservation: Submit a reservation request.
- GET /reservations: Admin can view the reservation list.

## 🎉 Bonus Features

- **Search Functionality**: The admin dashboard includes a search feature that allows searching for pizzas or reservations.




License
Distributed under the MIT License.

give me all of these in read me file make to attractive 
