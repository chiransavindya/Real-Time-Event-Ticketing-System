Real-Time Event Ticketing System
Introduction

The Real-Time Event Ticketing System helps users easily find and book tickets for events. It provides real-time updates, a user-friendly interface, and tools for organizers to manage events and monitor sales.
Setup Instructions
Prerequisites

Before starting, make sure you have the following installed:

    Java: Version 11 or newer
    Node.js: Version 16.x or newer
    MySQL: Version 8.x or newer
    Maven: Version 3.x or newer

How to Build and Run the Application

 Backend Setup
    
Go to the backend folder.
Update application.properties with your MySQL details.
Build the backend with Maven:

    mvn clean install

Run the backend:

    java -jar target/ticketing-backend.jar

Frontend Setup

Go to the frontend folder.
Install the required packages:

    npm install

Start the frontend:

        npm start

 Database Setup
 
Import the database schema and sample data into your MySQL server.

Usage Instructions
Starting the System

Ensure both backend and frontend servers are running.
Open http://localhost:3000 in your browser.

Using the Interface

Explore Events
        View events on the home page.
        Use filters to find specific events.

Book Tickets
        Click an event for details.
        Choose tickets and complete the booking process.

Manage Events (Admin)
        Log in as an admin to add or update events.
        Check ticket sales and generate reports.

View Bookings
        Check your profile for your booked tickets.
        Cancel bookings if needed.
