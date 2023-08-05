# rentalCarSystemSpringReact
README - Car Rental System with Spring Boot, Spring Security, and React

***Introduction
  This repository contains the source code for a Car Rental System, a web application built using Spring Boot and Spring Security for the backend and React for the frontend. The system allows users to rent cars and provides administrative capabilities for managing the car inventory and user accounts. Two user roles, "User" and "Admin," are implemented to provide differentiated access to the system functionalities.

***Features
  User Registration and Authentication:

  Users can create accounts and log in securely using Spring Security.
  Passwords are hashed and stored securely.
***Role-based Access Control:

The system supports two roles: "User" and "Admin."
"User" role can rent cars, view their rental history, and update their profile.
"Admin" role can manage car inventory, view user activity, and update user roles.
***Car Listing and Rental:

Users can browse available cars and view their details.
They can rent a car by selecting the rental duration and confirming the booking.
***Admin Dashboard:

Admins have access to a dashboard where they can view and manage the car inventory and user accounts.
***Responsive Frontend:

The frontend is built using React, ensuring a seamless user experience across devices.
***Technologies Used
Backend: Spring Boot, Spring Security, Spring Data JPA, Hibernate, MySQL.
Frontend: React, Axios for API calls, Bootstrap for styling.
***Installation and Setup
Clone the repository to your local machine:
git clone https://github.com/hajarST/rentalCarSystemSpringReact.git

README - Car Rental System with Spring Boot, Spring Security, and React


***Backend Setup:
Create a MySQL database and configure the connection properties in application.properties.
Build and run the Spring Boot application using your preferred IDE or with the following command:
bash
Copy code
./mvnw spring-boot:run
***Frontend Setup:
Navigate to the frontend directory
***Install dependencies:
npm install
***Run the React application:
npm start
--Admin Role:

Username: admin
Password: admin
and finally this is a small demonstration :
https://clipchamp.com/watch/dbBHi5iyo7X
